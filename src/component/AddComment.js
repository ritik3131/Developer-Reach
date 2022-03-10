import { useMutation } from "@apollo/client";
import React, { useRef } from "react";
import { Card } from "semantic-ui-react";
import { createComment, getPost } from "../queries/queries";
import { useForm } from "../util/customHook";

function AddPost({ postId }) {
  const commentInputRef = useRef();
  const { changeValuesHandler, values, submitHandler } = useForm(
    createCommentCb,
    {
      body: "",
    }
  );
  const [createCommentFunction, { error }] = useMutation(createComment, {
    variables: { body: values.body, id: postId },
    refetchQueries: [{ query: getPost }],
    update(proxy, result) {
      // const data = proxy.readQuery({ query: getPosts });
      // console.log(data,result)
      // data.posts = [result.data.addPost, ...data.posts];
      // proxy.writeQuery({ query: getPosts, data });
      values.body = "";
      commentInputRef.current.blur();
    },
  });

  function createCommentCb() {
    createCommentFunction();
  }

  return (
    <Card style={{ width: "140%" }}>
      <Card.Content>
        <form onSubmit={submitHandler}>
          <h2>Add Comment</h2>
          <div className="ui action input fluid">
            <input
              placeholder="Comment..."
              name="body"
              value={values.body}
              error={error ? error.graphQLErrors[0].message : false}
              onChange={changeValuesHandler}
              ref={commentInputRef}
            />
            <button
              type="submit"
              className="ui button teal"
              disabled={values.body.trim().length === 0}
            >
              Add Comment
            </button>
          </div>
        </form>
      </Card.Content>
    </Card>
  );
}

export default AddPost;
