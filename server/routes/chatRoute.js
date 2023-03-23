const express = require('express');
const { accessChat, fetchChats } = require('../controller/chatController');
const auth = require('../middleware/auth');

const router = express.Router();

router.route("/").post(auth, accessChat)
router.route("/").get(auth, fetchChats)
// router.route("/group").get(auth, createGroup)
// router.route("/rename").put(auth, renameGroup)
// router.route("/leave").put(auth, removeFromGroup)


module.exports = router;