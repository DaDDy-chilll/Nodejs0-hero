function getMessages(req, res) {
  res.send("<ul><li>Hello DaDDy</li></ul>");
}
function postMessage(req, res) {
  console.log("Updating message....");
}

module.exports = {
  postMessage,
  getMessages,
};
