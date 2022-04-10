const express = require("express");
const { builtinModules } = require("module");
const router = express.Router();
let Jobs = require( '../models/jobsSchema.js' );

router.get("/getalljobs",async(req,res)=>{
    try
    {
        const jobs=await Jobs.find();
        res.send(jobs);
    }
    catch(error)
    {
        return res.status(400).json({error});
    }
})

module.exports = router;