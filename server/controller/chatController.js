const Chat = require("../models/chatModel");
const User = require("../models/userModel");

exports.accessChat = async (req, res, next) => {
    const { userId } = req.body;

    if (!userId) {
        console.log("UserId params not sent with request");
        return res.send(404)
    }

    let isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            {
                users: { $elemMatch: { $eq: req.user.userId } }
            },
            {
                users: { $elemMatch: { $eq: userId } }
            },
        ]
    }).populate("users", "-password").populate("latestMessage")

    isChat = await User.populate(isChat, {
        path: "latestMessage",
        select: "name pic email"
    })

    if (isChat.length > 0) {
        res.send(isChat[0])
    } else {
        let chatData = {
            chatname: "sender",
            isGroupChat: false,
            users:[req.user.userId, userId]
        }

        try {
            const createdChat = await Chat.create(chatData)

            const FullChat = await Chat.findOne({_id:createdChat.id}).populate("users","-password")

            res.status(200).send(FullChat)
            
        } catch (error) {
            res.status(400);
            throw new Error(error.message)
        }

    }
} 


exports.fetchChats = async (req,res,next)=>{

    try {

        Chat.find({users:{$elemMatch:{$eq:req.user.userId}}}).then(result=>res.send(result))
        
    } catch (error) {
        res.status(400);
        throw new Error(error.message)
    }

}