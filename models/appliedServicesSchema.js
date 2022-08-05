const mongoose = require("mongoose");

const appliedServicesSchema = new mongoose.Schema(
  {
    jobid: { type: String, required: true },
    userid: { type: String, required: true },
    title: { type: String, required: true },
    company: { type: String, required: true },
    postedby: { type: String, required: true },
    appliedDate: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const appliedServicesModel = new mongoose.model(
  "appliedServices",
  appliedServicesSchema
);
module.exports = appliedServicesModel;
