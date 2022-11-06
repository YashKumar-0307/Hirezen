import React, { useState } from "react";
import { Modal, Button, Rate, Input } from "antd";
import { StarOutlined } from "@ant-design/icons";

const RatingReview = () => {
  const [value, setValue] = useState(3);
  const { TextArea } = Input;
  const onChange = (e) => {
    console.log("Change:", e.target.value);
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
          <Button htmlType="submit">Submit Feedback</Button>
        </div>
      </Modal>
    </div>
  );
};

export default RatingReview;
