const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 8080;

app.get('/hii', (rep, res) =>{
    res.send('Hello Ajay!');
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})