const path = require("path");
function getMessages(req, res) {
  res.render("messages", {
    title: "Messages to my Friends",
    friend: "Elon Musk",
  });
  // res.sendFile(path.join(__dirname, "..", "public", "img", "skimountain.jpg"));
  // res.send("<ul><li>Hello DaDDy</li></ul>");
}
function postMessage(req, res) {
  console.log("Updating message....");
}

module.exports = {
  postMessage,
  getMessages,
};
