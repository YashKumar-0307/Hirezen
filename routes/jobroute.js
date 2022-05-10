const express = require("express");
const router = express.Router();
const Jobs = require("../models/jobsSchema.js");
const User = require("../models/userSchema.js");
const moment = require("moment");

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
    const updatedjob = await Jobs.findOneAndUpdate(
      { _id: req.body._id },
      req.body
    );
    res.send("Job Updated Successfully!!");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/applyjob", async (req, res) => {
  const { user, job } = req.body;
  try {
    const jobDetails = await Jobs.findOne({ _id: job._id });

    const appliedCandidate = {
      userid: user._id,
      appliedDate: moment().format("MMM DD YYYY"),
    };

    jobDetails.appliedCandidates.push(appliedCandidate);
    await jobDetails.save();

    const userDetails = await User.findOne({ _id: user._id });
    const appliedJob = {
      jobid: job._id,
      appliedDate: moment().format("MMM DD YYYY"),
    };
    userDetails.appliedJobs.push(appliedJob);

    await userDetails.save();

    res.send("Job Applied Successfully!!");
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
