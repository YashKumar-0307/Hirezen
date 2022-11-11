import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Rate, Input } from "antd";
import { StarOutlined } from "@ant-design/icons";
import { giveFeedback } from "../redux/actions/jobsAction";
import { useParams } from "react-router-dom";

const RatingReview = () => {
  const [value, setValue] = useState(3);
  const [review, setReview] = useState("");
  const { TextArea } = Input;
  const onChange = (e) => {
    setReview(e.target.value);
    // console.log("Change:", e.target.value);
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];

  const { id } = useParams();
  const { jobs } = useSelector((state) => state.jobsReducer);
  const job = jobs.find((job) => job._id == id);

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
      <StarOutlined onClick={showModal} />
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
