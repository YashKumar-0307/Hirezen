import React, { useState } from "react";
import { Modal, Tag } from "antd";

const CustomerFeedbacks = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

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
    <div style={{ marginTop: "1rem" }}>
      <Tag color="purple" className="feedbackButton" onClick={showModal}>
        Click to see other people feedbacks
      </Tag>
      <Modal
        title="Feedbacks"
        footer={false}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
      >
        <div>
          <p>
            1. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed
            labore consequatur tempora perspiciatis aperiam quae mollitia
            molestias minima soluta voluptatem.
          </p>
          <p>
            2. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quibusdam, neque?
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default CustomerFeedbacks;
