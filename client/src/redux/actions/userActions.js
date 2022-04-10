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
    localStorage.setItem("user", JSON.stringify(user));

    // timeout function will show this message for particular time, here for 1000 i.e. 1sec
    setTimeout(() => {
      window.location.href = "/home"; // Go to home page after 1sec.
    }, 1000);
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    message.error("Invalid Credentials!");
    dispatch({ type: "LOADING", payload: false });
  }
};
