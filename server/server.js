const express = require('express');
const dotenv = require('dotenv');


const app = express();
dotenv.config();

app.get('/', (req, res) => {
    res.send("API Is Running")
})


const PORT = process.env.PORT || 3000;

app.listen(5000,()=>{
    console.log(`listening on port successfully on ${PORT}`)
})
