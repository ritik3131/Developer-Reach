import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Confirm, Icon, Popup } from "semantic-ui-react";
import {
  deleteComment,
  deletePost,
  getPost,
  getPosts,
} from "../queries/queries";
import { useNavigate } from "react-router-dom";

function DeleteButton({ postId, commentId }) {
  const [confirmOpen, setComfirmOpen] = useState(false);
  const navigate = useNavigate();
  const mutation = commentId ? deleteComment : deletePost;
  const [deletePostMutation] = useMutation(mutation, {
    variables: { postId, commentId },
    update(_, result) {
      setComfirmOpen(false);
      if (!commentId) navigate("/");
    },
    refetchQueries: [{ query: commentId ? getPosts : getPost }],
  });
  const deletePostHandler = () => {
    deletePostMutation();
  };

  return (
    <>
      <Popup
        content={`Delete this ${commentId ? "comment" : "post"}`}
        inverted
        position="right center"
        trigger={
          <Button
            as="div"
            color="red"
            floated="right"
            onClick={() => setComfirmOpen(true)}
          >
            <Icon name="trash" style={{ margin: 0 }} />
          </Button>
        }
      />
      <Confirm
        open={confirmOpen}
        onCancel={() => setComfirmOpen(false)}
        onConfirm={deletePostHandler}
      />
    </>
    //   )}
  );
}

export default DeleteButton;
