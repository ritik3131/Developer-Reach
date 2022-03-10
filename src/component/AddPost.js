import { useMutation } from "@apollo/client";
import React from "react";
import { Button, Form } from "semantic-ui-react";
import { createPost, getPosts } from "../queries/queries";
import { useForm } from "../util/customHook";

function AddPost() {
  const { changeValuesHandler, values, submitHandler } = useForm(createPostCb, {
    body: "",
  });
  const [createPostFunction, { error }] = useMutation(createPost, {
    variables: values,
    refetchQueries: [{ query: getPosts }],
    update(proxy, result) {
      // const data = proxy.readQuery({ query: getPosts });
      // console.log(data,result)
      // data.posts = [result.data.addPost, ...data.posts];
      // proxy.writeQuery({ query: getPosts, data });
      values.body = "";
    },
  });

  function createPostCb() {
    createPostFunction();
  }

  return (
    <>
      <Form onSubmit={submitHandler}>
        <h2>Create a Post</h2>
        <Form.Field>
          <Form.Input
            placeholder="Hi Guys"
            name="body"
            value={values.body}
            error={error ?error.graphQLErrors[0].message: false}
            onChange={changeValuesHandler}
          />
          <Button type="submit" color="teal">
            Add Post
          </Button>
        </Form.Field>
      </Form>
    </>
  );
}

export default AddPost;
