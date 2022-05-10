const express = require("express");
const router = express.Router();
const User = require("../models/userSchema.js");

router.post("/register", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const user = await newUser.save();
    res.send("User Created Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });
    //console.log(user);
    if (user) {
      res.send(user);
    } else {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/update", async (req, res) => {
  try{
    await User.findOneAndUpdate({_id : req.body._id} , req.body);
    const user = await User.findOne({_id : req.body._id});
    res.send(user);
  }
  catch(error)
  {
    return res.status(400).json({ error });
  }
});

module.exports = router;
