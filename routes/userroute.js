const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require("../models/userSchema.js");

router.post("/register", async (req, res) => {
  try {
    // console.log(req.body);
    await bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      if(err)
      {
        return res.status(400).json({ err });
      }
      const newUser = new User({username:req.body.username,password: hash});
      const user = newUser.save();
    });
    res.send("User Created Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    if (user) {
      // console.log(user.password);
      const match = await bcrypt.compare(req.body.password, user.password);
      // console.log(match);
      if(match)
      {
        res.send(user);
      }
      else
      {
        return res.status(400).json({ message: "Invalid Credentials" });
      }
    } else {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/update", async (req, res) => {
  try {
    await User.findOneAndUpdate({ _id: req.body._id }, req.body);
    const user = await User.findOne({ _id: req.body._id });
    res.send(user);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;