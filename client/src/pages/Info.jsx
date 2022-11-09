import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobs, getAppliedJobs } from "../redux/actions/jobsAction";
import { Button, Tag } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";
import { applyJob, deleteJob, cancelJob } from "../redux/actions/jobsAction";
import { DatePicker, Space, TimePicker } from "antd";

function Info() {
  const { id } = useParams();
  const { jobs } = useSelector((state) => state.jobsReducer);
  const { app } = useSelector((state) => state.appliedReducer);
  const job = jobs.find((job) => job._id == id);
  const { RangePicker } = DatePicker;
  const [dates, setDates] = useState(null);
  const [value, setValue] = useState(null);
  const [timeValue, setTimeValue] = useState(null);
  const disabledDate = (current) => {
    if (!dates) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], "days") > 7;
    const tooEarly = dates[1] && dates[1].diff(current, "days") > 7;
    return !!tooEarly || !!tooLate;
  };
  const onOpenChange = (open) => {
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAppliedJobs());
  }, []);

  // console.log(job);

  const userid = JSON.parse(localStorage.getItem("user"))._id;
  //const appliedCandidates = job.appliedCandidates;
  const alreadyApplied = app.find(
    (candidate) => candidate.jobid == job._id && candidate.userid == userid
  );
  //console.log(alreadyApplied);

  function applyNow() {
    if (value && timeValue) {
      dispatch(applyJob(job, dates,value, timeValue));
    }
  }

  function deleteService() {
    dispatch(deleteJob(job));
  }

  function cancelBookedService() {
    dispatch(cancelJob(alreadyApplied));
  }

  return (
    <div>
      <DefaultLayout>
        {job && (
          <div>
            <p>
              <b>Service Name : </b>
              {job.title}
            </p>
            <p>
              <b>Company/Person Name : </b>
              {job.company}
            </p>
            <p>
              <b>Small Description : </b>
              {job.smallDescription}
            </p>
            <p>
              <b>Full Description : </b>
              {job.fullDescription}
            </p>
            <p>
              <b>Specialization: </b>
              {job.skillsRequired}
            </p>
            <p>
              <b>Experience : </b>
              {job.experience} Years
            </p>
            <p>
              <b>Qualification : </b>
              {job.minimumQualification}
            </p>
            <hr />
            <p>
              <b>Service Charge Range : </b>
              {job.salaryFrom} - {job.salaryTo}{" "}
              <i>(Depends on kind of service and work required.)</i>
            </p>
            <p>
              <b>Service Category : </b>
              {job.department}
            </p>
            <p>
              <b>Service Provider Profile : </b>
              {job.companyDescription}
            </p>
            {/* <p>
              <b>Current Booked Service Count : </b>
              {job.appliedCandidates?.length > 0
                ? job.appliedCandidates.length
                : 0}
            </p> */}
            <hr />
            <div className="flex justify-content-between">
              {job.postedBy == userid ? (
                <div>
                  <Button style={{ marginRight: "1rem" }}>
                    <Link to={`/editjob/${job._id}`}>Edit Service</Link>
                  </Button>
                  <Button onClick={deleteService}>Delete Service</Button>
                </div>
              ) : alreadyApplied ? (
                <div>
                  <Tag color="green">Already Booked</Tag>
                  <Tag
                    color="red"
                    className="cancelBookingBtn"
                    onClick={cancelBookedService}
                  >
                    Cancel Booking
                  </Tag>
                </div>
              ) : (
                <div className="bookingFlex">
                  <Space
                    className="bookingSlot"
                    direction="vertical"
                    size={12}
                    style={{ marginRight: "2rem" }}
                  >
                    <RangePicker
                      className="bookDateRange"
                      value={dates || value}
                      disabledDate={disabledDate}
                      onCalendarChange={(val) => setDates(val)}
                      onChange={(val) => setValue(val)}
                      onOpenChange={onOpenChange}
                      style={{ padding: "0.5rem" }}
                    />
                  </Space>
                  <Space
                    className="bookingSlot"
                    direction="vertical"
                    size={12}
                    style={{ marginRight: "2rem" }}
                  >
                    <TimePicker.RangePicker
                      className="timeRange"
                      value={timeValue}
                      onChange={(val) => setTimeValue(val)}
                      style={{ padding: "0.5rem" }}
                    />
                  </Space>
                  <Button onClick={applyNow}>Book Your Slot</Button>
                </div>
              )}
              <p>
                <b>Posted On : </b>
                {moment(job.createdAt).format("MMM DD, yyyy")}
              </p>
            </div>
          </div>
        )}
      </DefaultLayout>
    </div>
  );
}

export default Info;
