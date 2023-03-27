const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");








exports.allMessages = async (req, res, next) => {
    try {
        const messages = await Message.find({ chat: req.params.chatId }).populate("sender", "name pic email").populate("chat")
        res.json(messages);



    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
};



exports.sendMessage = async (req, res, next) => {

    const { content, chatId } = req.body;
    if (!content || !chatId) {
        console.log("Invalid data passed into request");
        return res.sendStatus(400);
    }

    let sender = req.user.userId;
    var newMessage = {
        sender: sender,
        content: content,
        chat: chatId,
    };



    try {
        var message = await Message.create(newMessage);
        message = await message.populate("sender")
        message = await message.populate("chat")
        message = await User.populate(message, {
            path: "chat.users",
            select: "name pic email",
        });

        await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

        res.json(message);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);

    }

    console.log("aaaaaaaaaaaaaaaaaaaaaaa", req.user.userId)
    //64202f4516f29835b99bc36b
};
