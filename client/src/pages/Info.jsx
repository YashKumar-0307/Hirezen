import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";

function Info() {
  const { id } = useParams();
  const { jobs } = useSelector((state) => state.jobsReducer);
  const job = jobs.find((job) => job._id == id);
  const userid = JSON.parse(localStorage.getItem('user'))._id;

  return (
    <div>
      <DefaultLayout>
        
        {job && (<div>
          <p><b>Title : </b>{job.title}</p>
          <p><b>Company : </b>{job.company}</p>
          <p><b>Small Description : </b>{job.smallDescription}</p>
          <p><b>Full Description : </b>{job.fullDescription}</p>
          <p><b>Skills Required : </b>{job.skillsRequired}</p>
          <p><b>Experience : </b>{job.experience}</p>
          <p><b>Minimum Qualification : </b>{job.minimumQualification}</p>
          <hr />
          <p><b>Salary Range : </b>{job.salaryFrom} - {job.salaryTo}</p>
          <p><b>Department : </b>{job.department}</p>
          <p><b>Company Profile : </b>{job.companyDescription}</p>
          <p><b>Total Candidates Applied : </b>{job.appliedCandidates?.length > 0 ? job.appliedCandidates.length : 0}</p>
          <hr />
          <div className="flex justify-content-between">
            {job.postedBy==userid ? (<Button><Link to={`/editjob/${job._id}`}>Edit Now</Link></Button>) : <Button>Apply Now</Button>}
            <p><b>Posted On : </b>{moment(job.createdAt).format('MMM DD, YYYY')}</p>
          </div>
        </div>)}

      </DefaultLayout>
    </div>
  );
}

export default Info;
