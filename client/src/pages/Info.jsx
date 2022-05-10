import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Tag } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";
import { applyJob } from "../redux/actions/jobsAction";

function Info() {
  const { id } = useParams();
  const { jobs } = useSelector((state) => state.jobsReducer);
  const job = jobs.find((job) => job._id == id);

  console.log(job);

  const userid = JSON.parse(localStorage.getItem("user"))._id;
  const appliedCandidates = job.appliedCandidates;
  const alreadyApplied = appliedCandidates.find(
    (candidate) => candidate.userid == userid
  );
  const dispatch = useDispatch();

  function applyNow() {
    dispatch(applyJob(job));
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
              {job.salaryFrom} - {job.salaryTo}
            </p>
            <p>
              <b>Service Category : </b>
              {job.department}
            </p>
            <p>
              <b>Service Provider Profile : </b>
              {job.companyDescription}
            </p>
            <p>
              <b>Current Booked Service Count : </b>
              {job.appliedCandidates?.length > 0
                ? job.appliedCandidates.length
                : 0}
            </p>
            <hr />
            <div className="flex justify-content-between">
              {job.postedBy == userid ? (
                <Button>
                  <Link to={`/editjob/${job._id}`}>Edit Now</Link>
                </Button>
              ) : alreadyApplied ? (
                <Tag color="green">Already Applied</Tag>
              ) : (
                <Button onClick={applyNow}>Book Now</Button>
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
