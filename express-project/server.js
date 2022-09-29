const express = require("express");
const path = require("path");
const friendRouter = require("./routes/friends.router");
const messageRouter = require("./routes/message.router");
const app = express();
const PORT = 3000;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use((req, res, next) => {
  const start = Date.now();
  next();
  const delta = Date.now() - start;
  console.log(`${req.method} & ${req.baseUrl} & ${req.url} & ${delta}ms`);
});
app.use(express.json());
app.use("/site", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", {
    title: "DaDDy Chill",
    header: "Let's go skiing",
  });
});
app.use("/friends", friendRouter);
app.use("/message", messageRouter);

app.listen(PORT, () => console.log(`Server is running on PORT:${PORT}`));
