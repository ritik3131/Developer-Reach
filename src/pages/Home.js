import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { getPosts } from "../queries/queries";
import { Grid, Transition } from "semantic-ui-react";
import PostCard from "../component/PostCard";
import { AuthContext } from "../context/auth";
import AddPost from "../component/AddPost";

function Home() {
  const { user } = useContext(AuthContext);
  const { loading, error, data } = useQuery(getPosts);
  const posts = data ? data.posts : [];

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <AddPost />
          </Grid.Column>
        )}
        <Transition.Group>
          {" "}
          {posts &&
            posts.map((post) => (
              <Grid.Column key={post.id} style={{ marginBottom: "20px" }}>
                <PostCard post={post} key={post.id} />
              </Grid.Column>
            ))}
        </Transition.Group>
      </Grid.Row>
    </Grid>
  );
}

export default Home;
