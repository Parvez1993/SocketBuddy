const express = require('express');
const { accessChat, fetchChats, createGroupChat, renameGroup, removeFromGroup, addToGroup } = require('../controller/chatController');
const auth = require('../middleware/auth');

const router = express.Router();

router.route("/").post(auth, accessChat).get(auth, fetchChats)
router.route("/group").post(auth, createGroupChat)
router.route("/rename").put(auth, renameGroup)
router.route("/leave").put(auth, removeFromGroup)
router.route("/groupadd").put(auth, addToGroup);


module.exports = router;