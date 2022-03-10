const { GraphQLString, GraphQLList, GraphQLID } = require("graphql");
const PostModel = require("../models/PostModel");
const checkAuth = require("../util/check-auth");
const { postType } = require("./typeDef");

const addPost = {
  type: postType,
  args: {
    body: { type: GraphQLString },
  },
  resolve(parent, arg, context) {
    try {
      const user = checkAuth(context);
      const date = new Date();
      if(arg.body.trim().length===0)
       throw new Error("Body of post must not be empty");

      const newPost = new PostModel({
        userName: user.name,
        body: arg.body,
        createdAt: date.toISOString(),
        user: user._id,
      });
      return newPost.save();
    } catch (err) {
      throw new Error(err);
    }
  },
};

const posts = {
  type: new GraphQLList(postType),
  async resolve(parent, arg) {
    try {
      return await PostModel.find({}).sort({ createdAt: -1 }).exec();
    } catch (err) {
      throw new Error(err);
    }
  },
};

const getPost = {
  type: postType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent, arg) {
    try {
      return await PostModel.findById(arg.id).exec();
    } catch (err) {
      throw new Error(err);
    }
  },
};

const deletePost = {
  type: postType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent, arg, context) {
    const user = checkAuth(context);
    try {
      const post = await PostModel.findById(arg.id);
      if (user.name === post.userName) return await post.delete();
      else throw new Error("Not auth");
    } catch (err) {
      throw new Error(err);
    }
  },
};

module.exports = { posts, addPost, getPost, deletePost };
