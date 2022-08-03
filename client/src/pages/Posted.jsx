import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { getPostedJobs } from "../redux/actions/jobsAction";
import { Table, Modal } from "antd";
import moment from "moment";
import { EditOutlined, OrderedListOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";

function count(id,records) {
  var count=0;
  for(var rec in records)
  {
    if(records[rec].jobid == id)
    {
      count=count+1;
    }
  }
  return count;
}

function fillter(id,records) {
  var count=[];
  console.log(records);
  for(var rec in records)
  {
    if(records[rec].jobid == id)
    {
      count.push(records[rec]);
    }
  }
  console.log(count);
  return count;
}

function Posted() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostedJobs());
  }, []);

  const alljobs = useSelector((state) => state.jobsReducer).jobs;
  const allusers = useSelector((state) => state.usersReducer).users;
  const posted = useSelector((state) => state.postedReducer).app;
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
      title: "Company/Individual",
      dataIndex: "company",
    },
    {
      title: "Posted On",
      dataIndex: "postedOn",
    },

    {
      title: "No. of Booked Services",
      dataIndex: "appliedCandidatesIds",
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
                showModal(data.completeJobData);
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
      appliedCandidatesIds: count(job._id,posted),
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
        title: "Booked Date",
        dataIndex: "appliedDate",
      },
    ];

    var candidatesDataSource = [];
    console.log(selectedJob);
    for (var candidate of fillter(selectedJob._id,posted)) {
      var user = allusers.find((user) => user._id == candidate.userid);
      console.log(user);
      var obj = {
        candidateId: user._id,
        fullName: user.firstName + " " + user.lastName,
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
          title="Booked Services List"
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
