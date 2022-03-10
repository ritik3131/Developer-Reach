const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const connectDB = require("./config/db");
const schema = require("./schema/schema");
const cors = require("cors");

require("dotenv").config();
connectDB();

const app = express();
const PORT =  process.env.PORT||8000;
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );
app.use(
  "/graphql",
  graphqlHTTP((req) => ({
    graphiql: true,
    schema: schema,
    context: {
      req,
    },
    // context: ({ req }) => ({ req }),
  }))
);

// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   next();
// });

app.listen(PORT, () => {
  console.log("server is running at ", PORT);
});
