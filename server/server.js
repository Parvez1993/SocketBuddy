const express = require('express');
require("express-async-errors");
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const userRouter = require('./routes/userRoute');
const chatRouter = require('./routes/chatRoute');

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


console.log("process.env.JWT_SECRET", process.env.JWT_SECRET)
console.log("process.env.JWT_SECRET", process.env.JWT_EXPIRES_IN)

//middleware routes
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`The server is running at port: ${PORT}`);
});


process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! Shutting Down...');
    console.log(err.name, err.message);

    server.close(() => {
        process.exit(1);
    });
});