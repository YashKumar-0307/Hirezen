const mongoose = require("mongoose");

const appliedServicesSchema = new mongoose.Schema(
  {
    jobid: { type: String, required: true },
    userid: { type: String, required: true },
    title: { type: String, required: true },
    company: { type: String, required: true },
    postedby: { type: String, required: true },
    appliedDate: { type: Date, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    startTime: { type: Date, required: true },
    rating: { type: Number, default: 0 },
    review: { type: String, default: "" },
    clientStatus: { type: Boolean, default: false},
    workerStatus: { type: Boolean, default: false},
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
