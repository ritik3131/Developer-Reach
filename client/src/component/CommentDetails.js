import moment from "moment";
import React, { useContext } from "react";
import { Card } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import DeleteButton from "./DeleteButton";

function CommentDetails({ comments, postId }) {
  const { user } = useContext(AuthContext);
  return (
    comments &&
    comments.map((comment) => (
      <Card fluid key={comment.id}>
        <Card.Content>
          {user && user.name === comment.userName && (
            <DeleteButton postId={postId} commentId={comment.id} />
          )}
          <Card.Header>{comment.userName}</Card.Header>
          <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
          <Card.Description>{comment.body}</Card.Description>
        </Card.Content>
      </Card>
    ))
  );
}

export default CommentDetails;
