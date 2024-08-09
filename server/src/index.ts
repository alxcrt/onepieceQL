import { buildSchema } from "drizzle-graphql";
import pg from "pg";
import { ApolloServer } from "@apollo/server";
import express from "express";
import { expressMiddleware } from "@apollo/server/express4";

import cors from "cors";
import bodyParser from "body-parser";

// const { schema } = buildSchema(db, {
//   relationsDepthLimit: 4,
//   mutations: false,
// });

const resolvers = {
  Query: {
    test: () => "Hello, World!",
  },
};

const typeDefs = `
  type Query {
    test: String
  }
`;

const apolloServer = new ApolloServer({
  resolvers,
  typeDefs,
});
await apolloServer.start();

const app = express();

app.use(cors(), bodyParser.json());

app.use("/graphql", expressMiddleware(apolloServer));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(4001, () => {
  console.log("Server is running on http://localhost:4001");
});
