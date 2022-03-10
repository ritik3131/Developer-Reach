import { gql } from "@apollo/client";

const getPosts = gql`
  {
    posts {
      id
      body
      createdAt
      userName
      likes {
        userName
      }
      comments {
        id
        userName
        createdAt
        body
      }
    }
  }
`;

const getPost = gql`
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      body
      createdAt
      userName
      likes {
        userName
      }
      comments {
        id
        userName
        createdAt
        body
      }
    }
  }
`;

const createPost = gql`
  mutation CreatePost($body: String!) {
    addPost(body: $body) {
      id
      body
      createdAt
      userName
    }
  }
`;

const deletePost = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(id: $postId) {
      id
      body
      createdAt
      userName
    }
  }
`;

const userRegister = gql`
  mutation Register(
    $name: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      name: $name
      confirmPassword: $confirmPassword
      password: $password
      email: $email
    ) {
      id
      name
      email
      password
      token
    }
  }
`;

const userLogin = gql`
  mutation Login($email: String!, $password: String!) {
    login(password: $password, email: $email) {
      id
      name
      email
      password
      token
    }
  }
`;

const createComment = gql`
  mutation CreateComment($body: String!, $id: ID!) {
    createComment(body: $body, id: $id) {
      id
      body
      createdAt
      userName
      likes {
        userName
      }
      comments {
        id
        userName
        createdAt
        body
      }
    }
  }
`;

const deleteComment = gql`
  mutation DeleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      body
      createdAt
      userName
      likes {
        userName
      }
      comments {
        id
        userName
        createdAt
        body
      }
    }
  }
`;

const likePost = gql`
  mutation LikePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      body
      createdAt
      userName
      likes {
        userName
      }
      comments {
        id
        userName
        createdAt
        body
      }
    }
  }
`;

export {
  getPosts,
  getPost,
  userLogin,
  userRegister,
  createPost,
  deletePost,
  likePost,
  createComment,
  deleteComment,
};
