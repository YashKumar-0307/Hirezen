import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { getPostedJobs } from "../redux/actions/jobsAction";
import { Table, Modal } from "antd";
import moment from "moment";
import { EditOutlined, OrderedListOutlined } from "@ant-design/icons";
import { useNavigate, Link, NavLink } from "react-router-dom";
import ServiceCompleted from "../components/ServiceCompleted";

function count(id, records) {
  var count = 0;
  for (var rec in records) {
    if (records[rec].jobid == id) {
      count = count + 1;
    }
  }
  return count;
}

function fillter(id, records) {
  var count = [];
  console.log(records);
  for (var rec in records) {
    if (records[rec].jobid == id) {
      count.push(records[rec]);
    }
  }
  // console.log(count);
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
      appliedCandidatesIds: count(job._id, posted),
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
        title: "Customer Details",
        dataIndex: "candidateId",
        render: (text, data) => {
          return (
            <Link to={`/users/${data.candidateId}`} target="/blank">
              {"Click Here"}
            </Link>
          );
        },
      },
      {
        title: "Customer Name",
        dataIndex: "fullName",
      },
      {
        title: "Booked Date",
        dataIndex: "appliedDate",
      },
      {
        title: "Booked Slot",
        dataIndex: "bookedSlot",
      },
      {
        title: "Mark Service as Competed",
        render: (data) => {
          return <ServiceCompleted value={data} />;
        },
      },
      {
        title: "Booking Location",
        render: (text, data) => {
          return (
            <a href={`${data.bookingLocation}`} target="/blank">
              {"Click Here"}
            </a>
          );
        },
      },
    ];

    var candidatesDataSource = [];
    // console.log(selectedJob);
    for (var candidate of fillter(selectedJob._id, posted)) {
      var user = allusers.find((user) => user._id == candidate.userid);
      var obj = {
        candidateId: user._id,
        fullName: user.firstName + " " + user.lastName,
        appliedDate: moment(candidate.appliedDate).format("DD-MMM-YYYY"),
        isFeedbackSubmitted: candidate.clientStatus,
        isServiceDone: candidate.workerStatus,
        bookingLocation: candidate.location_string,
        bookingId: candidate._id,
        bookedSlot: `
          Date: 
          ${moment(candidate.startDate).format("DD-MMMM")}
           to 
          ${moment(candidate.endDate).format("DD-MMMM")}
           Time: 
          ${moment(candidate.startTime).format("hh:mm")}
           to 
          ${moment(candidate.endTime).format("hh:mm")} `,
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
