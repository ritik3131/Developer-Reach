const { GraphQLID, GraphQLString } = require("graphql");
const PostModel = require("../models/PostModel");
const checkAuth = require("../util/check-auth");
const { postType } = require("./typeDef");

const createComment = {
  type: postType,
  args: {
    id: { type: GraphQLID },
    body: { type: GraphQLString },
  },
  async resolve(parent, arg, context) {
    const user = checkAuth(context);
    // const user = { userName: "ritik" };
    const comment = {
      body: arg.body,
      userName: user.name,
      createdAt: new Date().toISOString(),
    };
    try {
      return PostModel.findByIdAndUpdate(
        arg.id,
        {
          $push: { comments: comment },
        },
        { new: true }
      );
      // else throw new Error("Not auth");
    } catch (err) {
      throw new Error(err);
    }
  },
};

const deleteComment = {
  type: postType,
  args: {
    postId: { type: GraphQLID },
    commentId: { type: GraphQLID },
  },
  async resolve(parent, arg, context) {
    const user = checkAuth(context);
    // const user = { userName: "ritik" };
    try {
      const post = await PostModel.findById(arg.postId);
      if (!post) throw new Error("No post found");
      const commentIndex = post.comments.findIndex(
        (c) => c.id === arg.commentId
      );
      if (post.comments[commentIndex].userName === user.name) {
        post.comments.splice(commentIndex, 1);
        return await post.save();
      } else throw new Error("No Auth(Action not allow)");

      // else throw new Error("Not auth");
    } catch (err) {
      throw new Error(err);
    }
  },
};

const likePost = {
  type: postType,
  args: {
    postId: { type: GraphQLID },
  },
  async resolve(parent, arg, context) {
    const user = checkAuth(context);
    // const user = { userName: "ritik" };
    const like = {
      userName: user.name,
      createdAt: new Date().toISOString(),
    };
    try {
      const post = await PostModel.findById(arg.postId);
      if (!post) throw new Error("No post found");
      if (post.likes.find((l) => l.userName === user.name)) {
        post.likes = post.likes.filter((like) => like.userName !== user.name);
      } else post.likes.push(like);
      return await post.save();
    } catch (err) {
      throw new Error(err);
    }
  },
};

module.exports = { createComment, deleteComment, likePost };
