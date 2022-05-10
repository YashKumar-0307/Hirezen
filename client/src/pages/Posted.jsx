import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { Table, Modal } from "antd";
import moment from "moment";
import { EditOutlined, OrderedListOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";

function Posted() {
  const alljobs = useSelector((state) => state.jobsReducer).jobs;
  const allusers = useSelector((state) => state.usersReducer).users;
  const userid = JSON.parse(localStorage.getItem("user"))._id;
  const userPostedJobs = alljobs.filter((job) => job.postedBy == userid);
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState();

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
    {
      title: "Actions",
      render: (text, data) => {
        return (
          <div className="flex">
            <EditOutlined
              onClick={() => {
                navigate(`/editjob/${data.completeJobData._id}`);
              }}
            />
            <OrderedListOutlined
              onClick={() => {
                showModal(job);
              }}
            />
          </div>
        );
      },
    },
  ];

  const dataSource = [];

  for (var job of userPostedJobs) {
    var obj = {
      title: job.title,
      company: job.company,
      appliedCandidatesIds: job.appliedCandidatesIds.length,
      postedOn: moment(job.createdAt).format("MMM-DD-YYYY"),
      completeJobData: job,
    };
    dataSource.push(obj);
  }

  const showModal = (job) => {
    setIsModalVisible(true);
    setSelectedJob(job);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function CandidatesList() {
    const candidatesColumns = [
      {
        title: "Candidate ID",
        dataIndex: "candidateId",
        render: (text, data) => {
          return (
            <Link to={`/users/${data.candidateId}`}>{data.candidateId}</Link>
          );
        },
      },
      {
        title: "Full Name",
        dataIndex: "fullName",
      },
      {
        title: "Applied Date",
        dataIndex: "appliedDate",
      },
    ];

    var candidatesDataSource = [];

    for (var candidate of selectedJob.appliedCandidates) {
      var user = allusers.find((user) => user._id == candidate.userid);
      var obj = {
        candidateId: user._id,
        fullName: user.firstName + " " + user.lastNane,
        appliedDate: candidate.appliedDate,
      };

      candidatesDataSource.push(obj);
    }

    return (
      <Table columns={candidatesColumns} dataSource={candidatesDataSource} />
    );
  }

  return (
    <div>
      <DefaultLayout>
        <h1>Posted Services</h1>
        <Table columns={columns} dataSource={dataSource} />
        <Modal
          title="Applied Candidats List"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          width={800}
          closable={false}
          footer={false}
        >
          <CandidatesList />
        </Modal>
      </DefaultLayout>
    </div>
  );
}

export default Posted;
