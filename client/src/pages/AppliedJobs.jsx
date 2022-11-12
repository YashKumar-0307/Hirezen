import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAppliedJobs } from "../redux/actions/jobsAction";
import DefaultLayout from "../components/DefaultLayout";
import { Table } from "antd";
import moment from "moment";
import RatingReview from "../components/RatingReview";

function AppliedJobs() {
  const { app } = useSelector((state) => state.appliedReducer);
  const user = JSON.parse(localStorage.getItem("user"));
  const userAppliedJobs = [];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAppliedJobs());
  }, []);
  for (var job of app) {
    var obj = {
      title: job.title,
      company: job.company,
      appliedDate: moment(job.appliedDate).format("DD-MMMM-YYYY"),
      feedback: "Give your feedback",
      jobId: job._id,
    };

    userAppliedJobs.push(obj);
  }

  const columns = [
    {
      title: "Service Name",
      dataIndex: "title",
    },
    {
      title: "Service Provider Name",
      dataIndex: "company",
    },
    {
      title: "Booked Date",
      dataIndex: "appliedDate",
    },
    {
      title: "Give Feedback",
      render: (data) => {
        return <RatingReview value={data} />;
      },
    },
  ];

  return (
    <div>
      <DefaultLayout>
        <h1>Booked Services</h1>
        <Table columns={columns} dataSource={userAppliedJobs} />
      </DefaultLayout>
    </div>
  );
}

export default AppliedJobs;
