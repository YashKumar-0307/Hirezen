import React from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { Table } from "antd";
import moment from "moment";

function Posted() {
  const alljobs = useSelector((state) => state.jobsReducer).jobs;
  const userid = JSON.parse(localStorage.getItem("user"))._id;
  const userPostedJobs = alljobs.filter((job) => job.postedBy == userid);
  console.log(userPostedJobs);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Company",
      dataIndex: "company",
    },

    {
      title: "Applied Candidates",
      dataIndex: "appliedCandidatesIds",
    },
    {
      title: "Posted On",
      dataIndex: "postedOn",
    },
  ];

  const dataSource = [];

  for (var job of userPostedJobs) {
    var obj = {
      title: job.title,
      company: job.company,
      appliedCandidatesIds: job.appliedCandidatesIds.length,
      postedOn: moment(job.createdAt).format("MMM-DD-YYYY"),
    };
    dataSource.push(obj);
  }

  return (
    <div>
      <DefaultLayout>
        <h1>Posted Services</h1>
        <Table columns={columns} dataSource={dataSource} />
      </DefaultLayout>
    </div>
  );
}

export default Posted;
