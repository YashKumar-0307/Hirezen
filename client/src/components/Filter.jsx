import React, { useState } from "react";
import { Button, Form, Input, Modal, Select } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { Option } from "antd/lib/mentions";
import { useDispatch } from "react-redux";
import { searchJobs, sortJobs } from "../redux/actions/jobsAction";

const { Search } = Input;

function Filter() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function sort(values) {
    dispatch(sortJobs(values));
    handleCancel();
  }

  return (
    <div className="flex">
      <Search
        onSearch={(value) => {
          dispatch(searchJobs(value));
        }}
      />
      <FilterOutlined onClick={showModal} />
      <Modal
        title="Select Filters"
        footer={false}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
      >
        <Form layout="vertical" onFinish={sort}>
          <Form.Item name="experience" label="Experience">
            <Select>
              <Option value={0}>New</Option>
              <Option value={1}>1 Year</Option>
              <Option value={2}>2 Years</Option>
              <Option value={3}>3 Years</Option>
              <Option value={4}>4 Years</Option>
              <Option value={5}>5 Years</Option>
            </Select>
          </Form.Item>
          <Form.Item name="salary" label="Service Charges">
            <Select>
              <Option value={200}>200</Option>
              <Option value={350}>350</Option>
              <Option value={500}>500</Option>
              <Option value={700}>750</Option>
              <Option value={1000}>1000</Option>
              <Option value={3000}>3000</Option>
            </Select>
          </Form.Item>
          <Button htmlType="submit">Filter</Button>
        </Form>
      </Modal>
    </div>
  );
}

export default Filter;
