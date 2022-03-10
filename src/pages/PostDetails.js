import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { useParams } from "react-router";
import { getPost } from "../queries/queries";
import {
  Button,
  Label,
  Card,
  Grid,
  Icon,
  Image,
  Popup,
} from "semantic-ui-react";
import moment from "moment";
import LikeButton from "../component/LikeButton";
import { AuthContext } from "../context/auth";
import { Link } from "react-router-dom";
import DeleteButton from "../component/DeleteButton";
import CommentDetails from "../component/CommentDetails";
import AddComment from "../component/AddComment";

function PostDetails() {
  const { postId } = useParams();
  const { loading, error, data } = useQuery(getPost, {
    variables: { id: postId },
  });
  const { user } = useContext(AuthContext);

  if (loading) return "Loading Post...";
  if (error) return `Error! ${error.message}`;

  const { body, comments, likes, createdAt, userName } = data.getPost;

  const likeCount = likes.length;

  const commentHandler = () => {
    console.log("comments");
  };

  const postMarkup = (
    <Grid>
      <Grid.Row>
        <Grid.Column width={2}>
          <Popup
            content={userName === user.name && user.email}
            key={userName}
            header={userName}
            trigger={
              <Image
                src="https://pbs.twimg.com/profile_images/1366466342354751491/JyhZpbtu_400x400.jpg"
                size="big"
                floated="right"
              />
            }
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card fluid>
            <Card.Content>
              <Card.Header>{userName}</Card.Header>
              <Card.Meta as={Link} to={`/posts/${postId}`}>
                {moment(createdAt).fromNow()}
              </Card.Meta>
              <Card.Description>{body}</Card.Description>
            </Card.Content>
            <hr />
            <Card.Content extra>
              <LikeButton
                postId={postId}
                likes={likes}
                userName={user ? user.name : ""}
                likeCount={likeCount}
              />
              <Button as="div" labelPosition="right" onClick={commentHandler}>
                <Button basic color="blue">
                  <Icon name="comments" />
                </Button>
                <Label basic color="blue" pointing="left">
                  {comments.length}
                </Label>
              </Button>
              {user && user.name === userName && (
                <DeleteButton postId={postId} />
              )}
            </Card.Content>
          </Card>
          {user && <AddComment postId={postId} />}
          <CommentDetails comments={comments} postId={postId} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
  return postMarkup;
}

export default PostDetails;
