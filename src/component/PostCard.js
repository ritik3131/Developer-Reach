import React, { useContext } from "react";
import { Button, Card, Icon, Image, Label, Popup } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";

function PostCard({ post }) {
  const { body, createdAt, likes, id, userName, comments } = post;
  const likeCount = likes.length;
  const commentCount = comments.length;
  const { user } = useContext(AuthContext);

  const deletePostHandler = () => {};
  return (
    <Card fluid>
      <Card.Content>
        <Popup
          content={userName === user.name && user.email}
          key={userName}
          header={userName}
          position="top center"
          trigger={
            <Image
              floated="right"
              size="massive"
              src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
              avatar
            />
          }
        />
        <Card.Header>{userName}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${post.id}`}>
          {moment(createdAt).fromNow()}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton
          postId={id}
          likes={likes}
          userName={user ? user.name : ""}
          likeCount={likeCount}
        />
        <Popup
          content="Click here to add comment on this post"
          inverted
          position="right center"
          trigger={
            <Button
              as="div"
              labelPosition="right"
              as={Link}
              to={`/posts/${id}`}
            >
              <Button color="blue" basic>
                <Icon name="comments" />
              </Button>
              <Label basic color="blue" pointing="left">
                {commentCount}
              </Label>
            </Button>
          }
        />
        {user && user.name === userName && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
}

export default PostCard;
