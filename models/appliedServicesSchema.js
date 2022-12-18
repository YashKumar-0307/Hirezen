const mongoose = require("mongoose");

const appliedServicesSchema = new mongoose.Schema(
  {
    jobid: { type: String, required: true },
    userid: { type: String, required: true },
    title: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    company: { type: String, required: true },
    postedby: { type: String, required: true },
    appliedDate: { type: Date, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    rating: { type: Number, default: 0 },
    review: { type: String, default: "" },
    clientStatus: { type: Boolean, default: false },
    workerStatus: { type: Boolean, default: false },
    reRecommend: { type: Boolean, default: false },
    reviewScore: { type: Number, default: -1 },
    location_string: { type: String, required: true },
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
