const {
  buildSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
} = require("graphql");

const postType = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    id: { type: GraphQLID },
    body: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    userName: { type: GraphQLString },
    comments: { type: new GraphQLList(commentType) },
    likes:{ type: new GraphQLList(LikeType) },
  }),
});

const commentType=new GraphQLObjectType({
  name: "Comments",
  fields: () => ({
    id: { type: GraphQLID },
    body: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    userName: { type: GraphQLString },
  })
})

const LikeType=new GraphQLObjectType({
  name: "Likes",
  fields: () => ({
    id: { type: GraphQLID },
    createdAt: { type: GraphQLString },
    userName: { type: GraphQLString },
  })
})

const registerType = new GraphQLObjectType({
  name: "Register",
  fields: () => ({
    password: { type: GraphQLString },
    name: { type: GraphQLString },
    confirmPassword: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});

const userType = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    password: { type: GraphQLString },
    name: { type: GraphQLString },
    token: { type: GraphQLString },
    id: { type: GraphQLID },
    email: { type: GraphQLString },
  }),
});

module.exports = { userType, registerType, postType };
