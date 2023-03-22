//chatName
//groupChat
//users 
//latestMessages
//groupAdmin

const { default: mongoose } = require("mongoose");


const chatModel = mongoose.schema({
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{
        type: mongoose.SchemaType.Types.ObjectId,
        ref: "User"
    }],
    latestMessage: [{
        type: mongoose.SchemaType.Types.ObjectId,
        ref: "Message"
    }],
    groupAdmin: {
        type: mongoose.SchemaType.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})

const Chat = mongoose.model('Chat', chatModel)

module.exports = Chat