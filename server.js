const express = require('express');
const bodyParser= require('body-parser');
const cors = require('cors');
const app = express();
//const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());


app.get('/',(req,res)=>{
    res.send('Server Running');
})

app.listen(process.env.PORT || 3001);