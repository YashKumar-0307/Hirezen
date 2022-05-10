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

export const postJob = (values) => async (dispatch) => {
  values.postedBy = JSON.parse(localStorage.getItem("user"))._id;

  dispatch({ type: "LOADING", payload: true }); // Making payload to true will show spinner on screen untill data is fetched.
  try {
    const response = await axios.post("/api/jobs/postjob", values);
    dispatch({ type: "LOADING", payload: false }); // After getting data, make spinner off by making payload false.
    message.success("Job Posted Successfully!!");
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const editJob = (values) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true }); // Making payload to true will show spinner on screen untill data is fetched.
  try {
    const response = await axios.post("/api/jobs/editjob", values);
    dispatch({ type: "LOADING", payload: false }); // After getting data, make spinner off by making payload false.
    message.success("Job Updated Successfully!!");
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const applyJob = (job) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("user"));

  dispatch({ type: "LOADING", payload: true }); // Making payload to true will show spinner on screen untill data is fetched.
  try {
    const response = await axios.post("/api/jobs/applyjob", { job, user });
    dispatch({ type: "LOADING", payload: false }); // After getting data, make spinner off by making payload false.
    message.success("Job Applied Successfully!!");
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};
