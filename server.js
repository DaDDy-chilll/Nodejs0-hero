const express = require("express");
const app = express();
const PORT = 3000;
const friends = [
  {
    id: 0,
    name: "Google",
  },
  {
    id: 1,
    name: "Microsoft",
  },
  {
    id: 2,
    name: "Linux",
  },
];

app.use((req, res, next) => {
  const start = Date.now();
  next();
  const delta = Date.now() - start;
  console.log(`${req.method} & ${req.url} % ${delta}ms`);
});

app.use(express.json());

app.get("/friends", (req, res) => {
  res.send(friends);
});

app.post("/friends", (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      error: "Missing friend name...",
    });
  }
  const newFriend = {
    name: req.body.name,
    id: friends.length,
  };
  friends.push(newFriend);
  res.json(newFriend);
});

app.get("/friends/:friendID", (req, res) => {
  const friendId = Number(req.params.friendID);
  const friend = friends[friendId];
  if (friend) {
    res.status(200).json(friend);
  } else {
    res.status(404).json({ error: "Friend does not exist" });
  }
});

app.get("/message", (req, res) => {
  res.send("<ul><li>Hello DaDDy</li></ul>");
});

app.post("/message", (req, res) => console.log("Updating message...."));

app.listen(PORT, () => console.log(`Server is running on PORT:${PORT}`));
