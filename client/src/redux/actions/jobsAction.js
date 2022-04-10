import axios from "axios";

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
