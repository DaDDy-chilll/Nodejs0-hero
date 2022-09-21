// const { send, REQUEST_TIMEOUT } = require("./internals/request");
// const { read } = require("./internals/response");
const { read, send } = require(".");
function request(url, data) {
  send(url, data);
  return read();
}
const sending = request("https://www.google.com", "hello");
console.log(sending);
