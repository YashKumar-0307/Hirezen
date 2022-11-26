const express = require("express");
const router = express.Router();
const Jobs = require("../models/jobsSchema.js");
const User = require("../models/userSchema.js");
const Applied = require("../models/appliedServicesSchema.js");
//const moment = require("moment");
const mongoose=require("mongoose");
const nodemailer=require("nodemailer");
mongoose.set('useFindAndModify', false);
const secrets=require("../secrets.json")
console.log(secrets);


router.get("/getalljobs", async (req, res) => {
  try {
    const jobs = await Jobs.find().sort({ score: -1, avgRating: -1 });
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

router.get("/getratingreview", async (req, res) => {
  try {
    const jo = await Applied.find({ jobid: req.query.id });
    // console.log(req.query);
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
  const { user, job, value, timeValue } = req.body;
  try {
    // const jobDetails = await Jobs.findOne({ _id: job._id });

    // const appliedCandidate = {
    //   userid: user._id,
    //   appliedDate: moment().format("MMM DD YYYY"),
    // };

    // jobDetails.appliedCandidates.push(appliedCandidate);
    // await jobDetails.save();
    var dat = new Date();
    // console.log(value);
    // console.log(timeValue);

    const newapplied = new Applied({
      jobid: job._id,
      userid: user._id,
      title: job.title,
      company: job.company,
      firstName: user.firstName,
      lastName: user.lastName,
      postedby: job.postedBy,
      appliedDate: dat,
      startDate: value[0],
      endDate: value[1],
      startTime: timeValue[0],
      endTime: timeValue[1],
    });
    await newapplied.save();
    const userDetails = await User.findOne({ _id: user._id });

    let pName = newapplied.company,
      fName = userDetails.firstName,
      lName = userDetails.lastName,
      sTime = newapplied.startTime,
      eTime = newapplied.endTime,
      sDate = newapplied.startDate,
      eDate = newapplied.endDate,
      address = userDetails.address,
      mNo = userDetails.mobileNumber;
    //console.log(newapplied);
    const message="Greetings "+pName+ ",\nYour job offer has been availed by the user " +fName+" "+lName+". They have opted to get avail your service from "+ sTime.getHours()+":"+sTime.getMinutes()+" "+sDate+" to "+eTime+" "+ eDate+". Kindly reach their place "+address+". Please do remember to call them at "+mNo+" for further instructions and directions. In case of an issue please reach us at hirezen.solutions@gmail.com.\n Regards, \n Hirezen Team.";
    //console.log(message);

    await newapplied.save();

    var email=secrets[0].username;
    console.log(email);//"hirezen.solutions@gmail.com";
    var password=secrets[0].password;//"rcbyocmslkqcnsnh";
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: email,
        pass: password,
      },
    });

    var mailOptions = {
      from: email,
      to: secrets[0].testMail,//"pranjal2019.s@gmail.com",//job.email,
      subject: "Service booked from "+userDetails.firstName+" "+userDetails.lastName+" from "+newapplied.startDate ,
      text: message
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

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

router.post("/addratingreview", async (req, res) => {
  try {
    const { job, user, rating, review } = req.body;
    //console.log(req.body);
    var jo = job.value;
    // var datee = job.appliedDate;
    //console.log(typeof(datee));
    // const delApplied = await Applied.find( { jobid : jo._id, userid: user._id } );

    const updatedApplied = await Applied.updateMany(
      { _id: jo.jobId },
      { review: review, rating: rating, reRecommend: true }
    );
    // console.log(updatedApplied);

    // var record = await Applied.findOne({ _id: jo.jobId });
    // record.review=review;
    // record.rating=rating;
    // console.log(record);
    // console.log(job);
    // console.log(jo._id+" "+user._id);
    res.send("Review Submitted Successfully!!");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
