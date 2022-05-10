import React from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { Table } from "antd";
import moment from "moment";
import { EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function AppliedJobs() {
  const { jobs } = useSelector((state) => state.jobsReducer);
  const user = JSON.parse(localStorage.getItem("user"));
  const userAppliedJobs = [];

  for (var job of jobs) {
    var appliedCandidates = job.appliedCandidates;
    var temp = appliedCandidates.find(
      (candidate) => candidate.userid == user._id
    );

    if (temp) {
      var obj = {
        title: job.title,
        company: job.company,
        appliedDate: job.appliedDate,
      };

      userAppliedJobs.push(obj);
    }
  }

  const columns = [
    {
      title: "Job Title",
      dataIndex: "title",
    },
    {
      title: "Company",
      dataIndex: "company",
    },
    {
      title: "Applied Date",
      dataIndex: "appliedDate",
    },
  ];

  return (
    <div>
      <DefaultLayout>
        <h1>Applied Jobs</h1>
        <Table columns={columns} dataSource={userAppliedJobs} />
      </DefaultLayout>
    </div>
  );
}

export default AppliedJobs;