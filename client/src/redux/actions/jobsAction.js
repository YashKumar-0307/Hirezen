import axios from "axios";
import { message } from "antd";

// dispatch is middleware with the help of which we call reducer after successfull API operations.
export const getAllJobs = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true }); // Making payload to true will show spinner on screen untill data is fetched.
  try {
    const response = await axios.get("/api/jobs/getalljobs");
    dispatch({ type: "GET_ALL_JOBS", payload: response.data });
    dispatch({ type: "LOADING", payload: false }); // After getting data, make spinner off by making payload false.
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const getAppliedJobs = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true }); // Making payload to true will show spinner on screen untill data is fetched.
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const response = await axios.get(`/api/jobs/getappliedjobs?id=${user._id}`);
    // console.log(response);
    dispatch({ type: "GET_APPLIED_JOBS", payload: response.data });
    dispatch({ type: "LOADING", payload: false }); // After getting data, make spinner off by making payload false.
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const getPostedJobs = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true }); // Making payload to true will show spinner on screen untill data is fetched.
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const response = await axios.get(`/api/jobs/getpostedjobs?id=${user._id}`);
    // console.log(response);
    dispatch({ type: "GET_POSTED_JOBS", payload: response.data });
    dispatch({ type: "LOADING", payload: false }); // After getting data, make spinner off by making payload false.
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

// Post your new Service
export const postJob = (values) => async (dispatch) => {
  values.postedBy = JSON.parse(localStorage.getItem("user"))._id;
  //{_id: id}
  dispatch({ type: "LOADING", payload: true }); // Making payload to true will show spinner on screen untill data is fetched.
  try {
    const response = await axios.post("/api/jobs/postjob", values);
    dispatch({ type: "LOADING", payload: false }); // After getting data, make spinner off by making payload false.
    message.success("Service Posted Successfully!!");
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

// Edit your already posted Service
export const editJob = (values) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true }); // Making payload to true will show spinner on screen untill data is fetched.
  try {
    const response = await axios.post("/api/jobs/editjob", values);
    dispatch({ type: "LOADING", payload: false }); // After getting data, make spinner off by making payload false.
    message.success("Service Updated Successfully!!");
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

// Delete posted Service
export const deleteJob = (values) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true }); // Making payload to true will show spinner on screen untill data is fetched.
  try {
    const response = await axios.post("/api/jobs/deletejob", values);
    dispatch({ type: "LOADING", payload: false }); // After getting data, make spinner off by making payload false.
    message.success("Service Deleted Successfully!!");
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

// Book your Service
export const applyJob = (job, dates, value, timeValue) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("user"));

  dispatch({ type: "LOADING", payload: true }); // Making payload to true will show spinner on screen untill data is fetched.
  try {
    // console.log(value);
    const response = await axios.post("/api/jobs/applyjob", {
      job,
      user,
      value,
      timeValue,
    });
    dispatch({ type: "LOADING", payload: false }); // After getting data, make spinner off by making payload false.
    message.success("Service Booked Successfully!!");
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

// Cancel your booked Service
export const cancelJob = (job) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("user"));
  dispatch({ type: "LOADING", payload: true }); // Making payload to true will show spinner on screen untill data is fetched.
  try {
    const response = await axios.post("/api/jobs/canceljob", { job, user });
    dispatch({ type: "LOADING", payload: false }); // After getting data, make spinner off by making payload false.
    message.success("Booking Cancelled Successfully!!");
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

// Search Services
export const searchJobs = (searchKey) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true }); // Making payload to true will show spinner on screen untill data is fetched.
  try {
    const response = await axios.get("/api/jobs/getalljobs");

    // Search jobs and show that jobs.
    const jobs = response.data;
    const filteredJobs = jobs.filter((job) =>
      job.title.toLowerCase().includes(searchKey.toLowerCase())
    );

    dispatch({ type: "GET_ALL_JOBS", payload: filteredJobs });
    dispatch({ type: "LOADING", payload: false }); // After getting data, make spinner off by making payload false.
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

// Filter and sort Jobs according to filters choosen.
export const sortJobs = (values) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true }); // Making payload to true will show spinner on screen untill data is fetched.
  try {
    const response = await axios.get("/api/jobs/getalljobs");

    // Filter jobs and show that jobs.
    const jobs = response.data;
    var filteredJobs = jobs;

    if (values.experience !== undefined) {
      filteredJobs = jobs.filter((job) => job.experience <= values.experience);
    }
    if (values.salary !== undefined) {
      filteredJobs = jobs.filter(
        (job) =>
          job.salaryTo >= values.salary && job.salaryFrom <= values.salary
      );
    }

    dispatch({ type: "GET_ALL_JOBS", payload: filteredJobs });
    dispatch({ type: "LOADING", payload: false }); // After getting data, make spinner off by making payload false.
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

// Give Feedback on service availed
export const giveFeedback = (job, rating, review) => async (dispatch) => {
  console.log(job, rating, review);
  const user = JSON.parse(localStorage.getItem("user"));

  dispatch({ type: "LOADING", payload: true }); // Making payload to true will show spinner on screen untill data is fetched.
  try {
    // console.log(value);
    const response = await axios.post("/api/jobs/addratingreview", {
      job,
      user,
      rating,
      review,
    });
    dispatch({ type: "LOADING", payload: false }); // After getting data, make spinner off by making payload false.
    message.success("Service Booked Successfully!!");
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};
