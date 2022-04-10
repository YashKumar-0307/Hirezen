const express = require('express');
const bodyParser= require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const PORT=process.env.PORT || 3001;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());


app.get('/',(req,res)=>{
    res.send('Server Running');
})

app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));