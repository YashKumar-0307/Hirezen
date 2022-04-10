import React, { useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import { getAllJobs } from "../redux/actions/jobsAction";

function Home() {
  // Accessing array data present in jobsReducer
  const { jobs } = useSelector((state) => state.jobsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllJobs());
  }, []);

  return (
    <div>
      <DefaultLayout>
        <h1>Home</h1>
        {jobs.length}
      </DefaultLayout>
    </div>
  );
}

export default Home;
