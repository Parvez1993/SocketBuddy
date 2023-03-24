const Chat = require("../models/chatModel");
const User = require("../models/userModel");

exports.accessChat = async (req, res, next) => {
    const { userId } = req.body;

    console.log("userId", userId)

    if (!userId) {
        console.log("UserId params not sent with request");
        return res.send(404)
    }

    // if groupChat is false, enable one to one chatting
    // find all the chat of individual matching his id (using auth) and loggged in


    let isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            {
                users: { $elemMatch: { $eq: req.user.userId } }
            },
            {
                users: { $elemMatch: { $eq: userId } }
            },
        ] //return the chat model with users and passwords and latestMessages
    }).populate("users", "-password").populate("latestMessage")




    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email"
    })


    console.log("isChatttttt", isChat)

    if (isChat.length > 0) {
        res.send(isChat[0])
    } else {
        let chatData = {
            chatname: "sender",
            isGroupChat: false,
            users: [req.user.userId, userId]
        }

        console.log("chatData", chatData)

        try {
            const createdChat = await Chat.create(chatData)

            const FullChat = await Chat.findOne({ _id: createdChat.id }).populate("users", "-password")

            console.log("chatData", FullChat)

            res.status(200).send(FullChat)

        } catch (error) {
            res.status(400);
            throw new Error(error.message)
        }

    }
}


exports.fetchChats = async (req, res, next) => {

    try {
        try {
            let chats = await Chat.find({ users: { $elemMatch: { $eq: req.user.userId } } }).populate("users", "-password").populate("groupAdmin", "-password").populate("latestMessage").sort({ updatedAt: -1 })

            let results = await User.populate(chats, {
                path: "latestMessage.sender",
                select: "name pic email"
            })

            res.status(200).send(results)


        } catch (error) {

        }

    } catch (error) {
        res.status(400);
        throw new Error(error.message)
    }

}



exports.createGroupChat = async (req, res, next) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).send({ message: "Please Fill all the feilds" });
    }

    var users = JSON.parse(req.body.users);

    if (users.length < 2) {
        return res
            .status(400)
            .send("More than 2 users are required to form a group chat");
    }

    users.push(req.user.userId);

    console.log("users", users)

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user.userId,
        });

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        res.status(200).json(fullGroupChat);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
}


exports.renameGroup = async (req, res, next) => {
    const { chatId, chatName } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName: chatName,
        },
        {
            new: true,
        }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!updatedChat) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(updatedChat);
    }
}


exports.removeFromGroup = async (req, res, next) => {
    const { chatId, userId } = req.body;

    // check if the requester is admin

    const removed = await Chat.findByIdAndUpdate(
        chatId,
        {
            $pull: { users: userId },
        },
        {
            new: true,
        }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!removed) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(removed);
    }
}


exports.addToGroup = async (req, res, next) => {
    const { chatId, userId } = req.body;

    // check if the requester is admin

    const added = await Chat.findByIdAndUpdate(
        chatId,
        {
            $push: { users: userId },
        },
        {
            new: true,
        }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!added) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(added);
    }
}
