const express = require("express");
const path = require("path");
const { ApolloServer } = require("apollo-server-express");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const typeArray = loadFilesSync(path.join(__dirname, "**/*.graphql"));
const resolversArray = loadFilesSync(path.join(__dirname, "**/*.resolvers.js"));

async function startApolloServer() {
  const app = express();
  const schema = makeExecutableSchema({
    typeDefs: typeArray,
    resolvers: resolversArray,
  });
  const server = new ApolloServer({
    schema,
  });

  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });
  app.listen(3000, () => {
    console.log("Running GraphQl server...");
  });
}
startApolloServer();
