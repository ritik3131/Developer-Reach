import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Button, Icon, Label, Popup } from "semantic-ui-react";
import { likePost } from "../queries/queries";
import { Link } from "react-router-dom";

function LikeButton({ likeCount, postId, likes, userName }) {
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (userName && likes.find((like) => (like) => like.userName === userName))
      setLiked(true);
  }, [userName, likes]);
  const [likePostMutation, { error }] = useMutation(likePost, {
    variables: { postId: postId },
    update(_, result) {
      if (liked) setLiked(false);
      else setLiked(true);
    },
    onError(err) {
      console.log(err);
    },
  });
  const likePostHandler = () => {
    console.log(postId);
    likePostMutation();
  };

  const likedButton = userName ? (
    liked ? (
      <Button color="red">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="red" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="red" basic>
      <Icon name="heart" />
    </Button>
  );
  return (
    <Button as="div" labelPosition="right" onClick={likePostHandler}>
      <Popup
        content={`${liked ? "Dislike" : "Like"}  this post`}
        inverted
        position="left center"
        trigger={likedButton}
      />
      <Label basic color="red" pointing="left">
        {likeCount}
      </Label>
    </Button>
  );
}

export default LikeButton;
