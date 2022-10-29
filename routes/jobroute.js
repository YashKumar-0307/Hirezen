const express = require("express");
const router = express.Router();
const Jobs = require("../models/jobsSchema.js");
const User = require("../models/userSchema.js");
const Applied = require("../models/appliedServicesSchema.js");
const moment = require("moment");

router.get("/getalljobs", async (req, res) => {
  try {
    const jobs = await Jobs.find();
    res.send(jobs);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/getappliedjobs", async (req, res) => {
  try {
    const jo = await Applied.find({ userid: req.query.id });
    // console.log(jo);
    res.send(jo);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/getpostedjobs", async (req, res) => {
  try {
    const jo = await Applied.find({ postedby: req.query.id });
    //console.log(jo);
    res.send(jo);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/postjob", async (req, res) => {
  try {
    const newjob = new Jobs(req.body);
    await newjob.save();
    res.send("Service Posted Successfully!!");
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

    const updatedApplied = await Applied.updateMany(
      { jobid: req.body._id },
      { company: req.body.company, title: req.body.title }
    );

    res.send("Service Updated Successfully!!");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/applyjob", async (req, res) => {
  const { user, job } = req.body;
  try {
    // const jobDetails = await Jobs.findOne({ _id: job._id });

    // const appliedCandidate = {
    //   userid: user._id,
    //   appliedDate: moment().format("MMM DD YYYY"),
    // };

    // jobDetails.appliedCandidates.push(appliedCandidate);
    // await jobDetails.save();
    var dat = new Date();
    // console.log(user);
    // console.log(job);

    const newapplied = new Applied({
      jobid: job._id,
      userid: user._id,
      title: job.title,
      company: job.company,
      postedby: job.postedBy,
      appliedDate: dat,
    });
    // console.log("Created");
    await newapplied.save();
    // console.log("Created");
    const userDetails = await User.findOne({ _id: user._id });
    const appliedJob = {
      jobid: job._id,
      appliedDate: dat,
    };
    userDetails.appliedJobs.push(appliedJob);

    await userDetails.save();

    res.send("Service Booked Successfully!!");
  } catch (error) {
    res.send(error);
  }
});

router.post("/deletejob", async (req, res) => {
  try {
    var jo = req.body._id;
    const delApplied = await Applied.deleteMany({ jobid: jo });
    const delJob = await Jobs.deleteMany({ _id: jo });
    //console.log(jo);
    res.send("Service Deleted Successfully!!");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/canceljob", async (req, res) => {
  try {
    const { user, job } = req.body;
    //console.log(req.body);
    var jo = job;
    var datee = job.appliedDate;
    //console.log(typeof(datee));
    // const delApplied = await Applied.find( { jobid : jo._id, userid: user._id } );
    Applied.findByIdAndRemove(jo._id, (err) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Service Cancelled Successfully!!");
      }
    });
    //console.log(jo._id+" "+user._id);
    // res.send("Service Cancelled Successfully!!");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
