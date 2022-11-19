const express = require("express");
const path = require("path");
const { graphqlHTTP } = require("express-graphql");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const typeArray = loadFilesSync(path.join(__dirname, "**/*.graphql"));
const schema = makeExecutableSchema({
  typeDefs: typeArray,
  resolvers: {
    Query: {
      products: async (parent) => {
        console.log("Getting the products...");
        const products = await Promise.resolve(parent.products);
        return products;
      },
      orders: (parent) => {
        console.log("Getting the orders...");
        return parent.orders;
      },
    },
  },
});

const root = {
  products: require("./products/products.model"),
  orders: require("./orders/orders.model"),
};

const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(8000, () => {
  console.log("Running GraphQl server...");
});
