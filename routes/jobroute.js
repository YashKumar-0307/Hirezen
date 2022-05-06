const express = require("express");
const router = express.Router();
let Jobs = require("../models/jobsSchema.js");

router.get("/getalljobs", async (req, res) => {
  try {
    const jobs = await Jobs.find();
    res.send(jobs);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/postjob", async (req, res) => {
  try {
    const newjob = new Jobs(req.body);
    await newjob.save();
    res.send("Job Posted Successfully!!");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/editjob", async (req, res) => {
  try {
    const updatedjob = await Job.findOneAndUpdate({_id : req.body._id});
    res.send(updatedjob);
  } 
  catch (error) 
  {
    return res.status(400).json({ error });
  }
});

module.exports = router;
