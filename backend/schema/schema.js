const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { regsiter, login } = require("./authSchema");
const { createComment, deleteComment, likePost } = require("./commentSchema");
const { addPost, posts, getPost, deletePost } = require("./postSchema");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    posts: posts,
    getPost: getPost,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addPost: addPost,
    register: regsiter,
    login: login,
    deletePost: deletePost,
    createComment: createComment,
    deleteComment: deleteComment,
    likePost: likePost,
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
