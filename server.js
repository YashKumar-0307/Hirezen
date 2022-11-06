const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const jobsroute = require("./routes/jobroute.js");
const userroute = require("./routes/userroute.js");
const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

async function dbconnect() {
  try {
    const uri =
      "";
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    const connection = mongoose.connection;
    connection.once("open", () => {
      console.log("MongoDB database connection established successfully");
    });
  } catch (error) {
    console.log("MongoDB connection failed");
  }
}
dbconnect();

app.use("/api/jobs/", jobsroute);
app.use("/api/users/", userroute);

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
