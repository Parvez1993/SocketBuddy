const express = require('express');
const dotenv = require('dotenv');
const mongoose = require("mongoose");

dotenv.config();
const DB = process.env.DATABASE_LOCAL;
const app = express();


process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! Shutting Down...');
    console.log(err.name, err.message);

    process.exit(1);
});


mongoose.connect(DB).then(() => console.log('Connected!'));



app.get('/', (req, res) => {
    res.send("API Is Running")
})



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