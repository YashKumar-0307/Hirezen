import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Button, Rate, Input } from "antd";
import { StarOutlined } from "@ant-design/icons";
import { giveFeedback } from "../redux/actions/jobsAction";
import {
  CheckCircleTwoTone,
  HeartTwoTone,
  SmileTwoTone,
} from "@ant-design/icons";
import { Space } from "antd";

const RatingReview = (job) => {
  const [value, setValue] = useState(3);
  const [review, setReview] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const { TextArea } = Input;
  const onChange = (e) => {
    setReview(e.target.value);
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const desc = ["Terrible", "Bad", "Normal", "Good", "Wonderful"];

  // console.log(job);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const dispatch = useDispatch();

  function submitNow() {
    if (value && review) {
      dispatch(giveFeedback(job, value, review));
    }
  }

  return (
    <div>
      {user.review && user.rating ? (
        <Space>
          <CheckCircleTwoTone twoToneColor="#52c41a" />
        </Space>
      ) : (
        <StarOutlined onClick={showModal} />
      )}
      <Modal
        title="Give Your Rating and Review"
        footer={false}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
      >
        <div className="rating-review">
          <span>
            <Rate tooltips={desc} onChange={setValue} value={value} />
            {value ? <span className="ant-rate-text"></span> : ""}
          </span>
          <TextArea
            showCount
            maxLength={100}
            onChange={onChange}
            placeholder="Write your review here."
            style={{ marginTop: "2rem", marginBottom: "2rem", width: "100%" }}
          />
          <Button htmlType="submit" onClick={submitNow}>
            Submit Feedback
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default RatingReview;
