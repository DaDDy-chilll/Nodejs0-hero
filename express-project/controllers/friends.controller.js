const nodel = require("../models/friends.model");
function getFriends(req, res) {
  res.send(nodel);
}

function postFriend(req, res) {
  if (!req.body.name) {
    return res.status(400).json({
      error: "Missing friend name...",
    });
  }
  const newFriend = {
    name: req.body.name,
    id: nodel.length,
  };
  nodel.push(newFriend);
  res.json(newFriend);
}

function getFriend(req, res) {
  const friendId = Number(req.params.friendID);
  const friend = nodel[friendId];
  if (friend) {
    res.status(200).json(friend);
  } else {
    res.status(404).json({ error: "Friend does not exist" });
  }
}

module.exports = {
  postFriend,
  getFriends,
  getFriend,
};
