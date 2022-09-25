const express = require("express");
const friendRouter = require("./express-project/routes/friends.router");
const messageRouter = require("./express-project/routes/message.router");
const app = express();
const PORT = 3000;

app.use((req, res, next) => {
  const start = Date.now();
  next();
  const delta = Date.now() - start;
  console.log(`${req.method} & ${req.baseUrl} & ${req.url} & ${delta}ms`);
});
app.use(express.json());

app.use("/friends", friendRouter);
app.use("/message", messageRouter);

app.listen(PORT, () => console.log(`Server is running on PORT:${PORT}`));
