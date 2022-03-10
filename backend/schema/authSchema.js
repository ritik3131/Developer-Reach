const {
  buildSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
} = require("graphql");
const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  vaidateRegisterInput,
  validateLoginInput,
} = require("../util/validate");
const { userType } = require("./typeDef");

const generateToken = (newUser) => {
  const token = jwt.sign(
    {
      id: newUser._id,
      email: newUser.email,
      name: newUser.name,
    },
    process.env.SCERET_KEY,
    { expiresIn: "5h" }
  );
  return token;
};

const regsiter = {
  type: userType,
  args: {
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    confirmPassword: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent, { name, email, confirmPassword, password }) {
    const { valid, errors } = vaidateRegisterInput(
      email,
      confirmPassword,
      password,
      name
    );
    // console.log();
    if (!valid) throw new Error(JSON.stringify(errors));

    const user = await UserModel.findOne({ email: email });
    if (user) throw new Error(JSON.stringify({ email: "User already exits" }));

    if (password !== confirmPassword)
      throw new Error(JSON.stringify({ password: "Password doesn't match" }));

    password = await bcrypt.hash(password, 12);
    const newUser = new UserModel({
      email,
      password,
      name,
      createdAt: new Date().toISOString(),
    });
    await newUser.save();
    const token = generateToken(newUser);
    return {
      ...newUser._doc,
      id: newUser._id,
      token,
    };
  },
};

const login = {
  type: userType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent, { email, password }) {
    const { valid, errors } = validateLoginInput(email, password);
    if (!valid) throw new Error(JSON.stringify(errors));

    const user = await UserModel.findOne({ email: email });
    if (!user) throw new Error(JSON.stringify({ email: "User not found" }));
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      throw new Error(JSON.stringify({ password: "Password is wrong" }));

    const token = generateToken(user);
    return {
      ...user._doc,
      id: user._id,
      token,
    };
  },
};

module.exports = { regsiter, login };
