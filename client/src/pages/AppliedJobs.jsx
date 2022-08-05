import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllJobs, getAppliedJobs } from "../redux/actions/jobsAction";
import DefaultLayout from "../components/DefaultLayout";
import { Table } from "antd";
import moment from "moment";
import { EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function AppliedJobs() {
  const { app } = useSelector((state) => state.appliedReducer);

  const user = JSON.parse(localStorage.getItem("user"));
  const userAppliedJobs = [];
  // console.log(app);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAppliedJobs());
  }, []);
  for (var job of app) {
    var obj = {
      title: job.title,
      company: job.company,
      appliedDate: job.appliedDate,
    };

    userAppliedJobs.push(obj);
  }

  const columns = [
    {
      title: "Service Title",
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
