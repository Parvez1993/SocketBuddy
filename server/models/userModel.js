const mongoose = require('mongoose');

const userModel = mongoose.Schema({
    name: { type: "String", trim: true },
    email: { type: "String", trim: true },
    password: { type: "String", trim: true },
    picture: { type: "String", default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg", required: true },
}, {
    timestamp: true
})

const User = mongoose.model('User', userModel)

module.exports = User