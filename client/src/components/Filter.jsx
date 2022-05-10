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
              <Option value={0}>Fresher</Option>
              <Option value={1}>1 Year</Option>
              <Option value={2}>2 Years</Option>
              <Option value={3}>3 Years</Option>
              <Option value={4}>4 Years</Option>
              <Option value={5}>5 Years</Option>
            </Select>
          </Form.Item>
          <Form.Item name="salary" label="Salary">
            <Select>
              <Option value={10000}>10000+</Option>
              <Option value={15000}>15000+</Option>
              <Option value={20000}>20000+</Option>
              <Option value={25000}>25000+</Option>
              <Option value={30000}>30000+</Option>
              <Option value={50000}>50000+</Option>
            </Select>
          </Form.Item>
          <Button htmlType="submit">Filter</Button>
        </Form>
      </Modal>
    </div>
  );
}

export default Filter;
