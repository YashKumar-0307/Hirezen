import axios from "axios";
import { message } from "antd";

// For Registration Page
export const registerUser = (values) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    await axios.post("/api/users/register", values);
    message.success("Registered Successfully!");

    // timeout function will show this message for particular time, here for 1000 i.e. 1sec
    setTimeout(() => {
      window.location.href = "/login"; // Go back to login page after 1sec.
    }, 1000);
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    message.error("Something Went Wrong, Please Try Again!");
    dispatch({ type: "LOADING", payload: false });
  }
};

// For Login Page
export const loginUser = (values) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const user = await axios.post("/api/users/login", values);
    message.success("Login Successfully!");
    localStorage.setItem("user", JSON.stringify(user.data));

    // timeout function will show this message for particular time, here for 1000 i.e. 1sec
    setTimeout(() => {
      window.location.href = "/"; // Go to home page after 1sec.
    }, 1000);
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    message.error("Invalid Credentials!");
    dispatch({ type: "LOADING", payload: false });
  }
};

// For updating User Details
export const updateUser = (values) => async (dispatch) => {
  const userid = JSON.parse(localStorage.getItem("user"))._id;
  values._id = userid;

  dispatch({ type: "LOADING", payload: true });
  try {
    const user = await axios.post("/api/users/update", values);
    message.success("User Details Updated Successfully!");
    localStorage.setItem("user", JSON.stringify(user.data));

    // timeout function will show this message for particular time, here for 1000 i.e. 1sec
    setTimeout(() => {
      window.location.reload(); // Reload page on update after 1sec.
    }, 1000);
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    message.error("Something went wrong, Please try again later!");
    dispatch({ type: "LOADING", payload: false });
  }
};

// For getting all users data from backend
export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.get("/api/users/getallusers");
    dispatch({ type: "GET_ALL_USERS", payload: response.data });
    dispatch({ type: "LOADING", payload: false }); // After getting data, make spinner off by making payload false.
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};
