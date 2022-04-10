import axios from "axios";

// dispatch is middleware with the help of which we call reducer after successfull API operations.
export const getAllJobs = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/jobs/getalljobs");
    dispatch({ type: "GET_ALL_JOBS", payload: response.data });
  } catch (error) {
    console.log(error);
  }
};
