import React, { useState } from "react";
import { Button, Space, message } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { markWorkerStatus } from "../redux/actions/jobsAction";

function ServiceCompleted(info) {
  const dispatch = useDispatch();

  function onComplete() {
    if (info.value.isFeedbackSubmitted) {
      info.value.isServiceDone = true;
      dispatch(markWorkerStatus(info.value.bookingId));
    } else {
      message.error("Feedback Not Submitted By Customer!");
    }
  }

  console.log(info);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {info.value.isServiceDone ? (
        <Space>
          <CheckCircleTwoTone twoToneColor="#52c41a" />
        </Space>
      ) : (
        <Button onClick={onComplete}>Mark It Complete</Button>
      )}
    </div>
  );
}

export default ServiceCompleted;
