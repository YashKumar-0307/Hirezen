import React, { useState } from "react";
import { Modal, Tag, Table } from "antd";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const CustomerFeedbacks = (service) => {
  console.log(service);
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

  const { id } = useParams();
  const { users } = useSelector((state) => state.usersReducer);

  // const display = Object.keys(service).map((index, key) => {
  //   return (
  //     <div className="givenFeedbacks">
  //       <li key={key}>
  //         {/* {console.log(service[index][key])} */}
  //         {/* {service[index][key].firstName} {service[index][key].lastName} {"\t"}
  //         {"Rated: "} {service[index][key].rating} {"/ 5"} <br />
  //         {service[index][key].review} */}
  //       </li>
  //     </div>
  //   );
  // });

  const userFeedbacks = [];

  for (var data of service) {
    var obj = {
      name: data.firstName,
      rating: data.rating,
      review: data.review,
    };

    userFeedbacks.push(obj);
  }

  console.log(userFeedbacks);

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "name",
    },
    {
      title: "Rating Given",
      dataIndex: "rating",
    },
    {
      title: "Review Given",
      dataIndex: "review",
    },
  ];

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
        {/* <Table columns={columns} dataSource={userFeedbacks} /> */}
      </Modal>
    </div>
  );
};

export default CustomerFeedbacks;
