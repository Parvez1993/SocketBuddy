const express = require('express');
require("express-async-errors");
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const userRouter = require('./routes/userRoute');
const chatRouter = require('./routes/chatRoute');
const messageRouter = require('./routes/messageRoutes');


const notFoundMiddleware = require("./middleware/notFoundMiddleware.js");
const errorMiddleware = require("./middleware/error-handler.js");

dotenv.config();
const DB = process.env.DATABASE_LOCAL;
const app = express();


process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! Shutting Down...');
    console.log(err.name, err.message);

    process.exit(1);
});


mongoose.connect(DB).then(() => console.log('Connected!'));
app.use(express.json());


app.get('/', (req, res) => {
    res.send("API Is Running")
})


app.use("/api/users", userRouter)
app.use("/api/chat", chatRouter)
app.use("/api/message", messageRouter)

console.log("process.env.JWT_SECRET", process.env.JWT_SECRET)
console.log("process.env.JWT_SECRET", process.env.JWT_EXPIRES_IN)

//middleware routes
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`The server is running at port: ${PORT}`);
});


const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000",
        // credentials: true,
    },
});


io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    });

    socket.on("joinchat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
    });

    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
    
    socket.on("newMessage", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;

        if (!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((user) => {
            if (user._id == newMessageRecieved.sender._id) return;

            socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
    });

    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
    });
});
process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! Shutting Down...');
    console.log(err.name, err.message);

    server.close(() => {
        process.exit(1);
    });
});