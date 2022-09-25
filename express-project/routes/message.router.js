const express = require("express");
const messageController = require("../controllers/message.controller");

const messageRouter = express.Router();

messageRouter.get("/", messageController.getMessages);
messageRouter.post("/", messageController.postMessage);

module.exports = messageRouter;
