const jwt = require("jsonwebtoken");

module.exports = (context) => {
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.SCERET_KEY);
        return user;
      } catch (err) {
        throw new Error("Not Auth");
      }
    }
    throw new Error("Auth is token is not provided");
  }
  throw new Error("Auth is header is not provided");
};
