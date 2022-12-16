import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllJobs,
  getAppliedJobs,
  getRatingReview,
} from "../redux/actions/jobsAction";
import { Button, Tag, Table, Modal, message, Input } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";
import { applyJob, deleteJob, cancelJob } from "../redux/actions/jobsAction";
import { DatePicker, Space, TimePicker, Rate } from "antd";

function Info() {
  const { id } = useParams();
  const { jobs } = useSelector((state) => state.jobsReducer);
  const { app } = useSelector((state) => state.appliedReducer);
  const job = jobs.find((job) => job._id == id);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const { ratingreview } = useSelector((state) => state.ratingReviewReducer);
  const { RangePicker } = DatePicker;
  const [dates, setDates] = useState(null);
  const [value, setValue] = useState(null);
  const [timeValue, setTimeValue] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const desc = ["Terrible", "Bad", "Normal", "Good", "Wonderful"];

  const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const disabledDate = (current) => {
    if (!dates) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], "days") > 3;
    const tooEarly = dates[1] && dates[1].diff(current, "days") > 3;
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
    dispatch(getRatingReview(job._id));
  }, []);

  const userFeedbacks = [];

  for (var data of ratingreview) {
    var obj = {
      name: data.firstName + " " + data.lastName,
      rating: data.rating,
      review: data.review,
    };

    userFeedbacks.push(obj);
  }

  // console.log(userFeedbacks);

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "name",
    },
    {
      title: "Rating Given",
      dataIndex: "rating",
      render: (text, data) => {
        return (
          <span>
            <Rate tooltips={desc} value={data.rating} />
            {value ? <span className="ant-rate-text"></span> : ""}
          </span>
        );
      },
    },
    {
      title: "Review Given",
      dataIndex: "review",
    },
  ];

  // console.log(columns);

  const userid = JSON.parse(localStorage.getItem("user"))._id;
  //const appliedCandidates = job.appliedCandidates;
  const alreadyApplied = app.find(
    (candidate) =>
      candidate.jobid == job._id &&
      candidate.userid == userid &&
      candidate.workerStatus == false
  );
  // console.log(alreadyApplied);

  function getCoordinates() {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  }

  function applyNow() {
    if (
      user.firstName &&
      user.lastName &&
      user.email &&
      user.mobileNumber &&
      user.address
    ) {
      if (value && timeValue) {
        if (lat !== null && long !== null) {
          dispatch(applyJob(job, dates, value, timeValue));
        } else {
          message.error("Please Give Your Location!");
        }
      } else {
        message.error("Please Select Your Slot Dates and Time!");
      }
    } else {
      message.error("Please Complete Your Profile First!");
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
                  <div className="locationField">
                    <Space>
                      <Input
                        style={{
                          width: "25rem",
                        }}
                        value={
                          lat == null
                            ? ""
                            : `https://google.com/maps?q=${lat},${long}`
                        }
                      />
                      <Button onClick={getCoordinates}>
                        Get Your Location
                      </Button>
                    </Space>
                  </div>
                  <Button className="bookingBtn" onClick={applyNow}>
                    Book Your Slot
                  </Button>
                </div>
              )}
              <p>
                <b>Posted On : </b>
                {moment(job.createdAt).format("MMM DD, yyyy")}
              </p>
            </div>

            <div style={{ marginTop: "1rem" }}>
              <Tag
                color="purple"
                className="feedbackButton"
                onClick={showModal}
              >
                Click to see customer feedbacks
              </Tag>
              <Modal
                title="Customer Feedbacks"
                footer={false}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                closable={false}
                style={{ width: "100px" }}
              >
                {userFeedbacks && (
                  <Table columns={columns} dataSource={userFeedbacks} />
                )}
              </Modal>
            </div>
          </div>
        )}
      </DefaultLayout>
    </div>
  );
}

export default Info;
