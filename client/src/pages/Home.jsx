import React, { useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import { getAllJobs, getAppliedJobs } from "../redux/actions/jobsAction";
import { Row, Col, Button, Rate } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import { Zoom } from "react-reveal";

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
        <Row gutter={16}>
          {jobs.map((job) => {
            // {
            //   /* 'lg' is for larger devices and 'sm' is for small devices. 12 is the no. of columns out of total 24 columns.
            //     means it shows 1 job in 12 columns i.e. 1 job in half screen or say 2 jobs in 1 row on large devices
            //     and full 1 job in small screen devices in 1 row. */
            // }
            return (
              <Col lg={12} sm={24}>
                <Zoom>
                  <div className="job-div bs m-2 p-2">
                    <h4>{job.title}</h4>
                    <p className="homepage-pTag">{job.company}</p>
                    <hr />
                    <p className="homepage-pTag">{job.smallDescription}</p>
                    <div className="flex justify-content-between">
                      <p className="homepage-pTag">
                        Service Charges:{" "}
                        <b>
                          {job.salaryFrom} - {job.salaryTo} /-
                        </b>
                      </p>
                      <p
                        className="homepage-pTag"
                        style={{ marginLeft: "1rem" }}
                      >
                        Experience: <b>{job.experience} Years</b>
                      </p>
                    </div>
                    <hr />
                    <div className="flex justify-content-between">
                      <Link to={`/jobs/${job._id}`}>
                        <Button>View</Button>
                      </Link>
                      <Rate disabled defaultValue={job.avgRating} />
                      <p className="homepage-pTag">
                        Posted On:{" "}
                        {moment(job.createdAt).format("MMM DD, YYYY")}
                      </p>
                    </div>
                  </div>
                </Zoom>
              </Col>
            );
          })}
        </Row>
      </DefaultLayout>
    </div>
  );
}

export default Home;
