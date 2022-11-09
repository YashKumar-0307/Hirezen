import React, { useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { Row, Col, Form, Tabs, Input, Button, Select } from "antd";
import { useDispatch } from "react-redux";
import { postJob } from "../redux/actions/jobsAction";

const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;

function Post() {
  const [jobInfo, setJobInfo] = useState({});
  const [activeTab, setActiveTab] = useState("0");
  const dispatch = useDispatch();

  function onFirstFormFinish(values) {
    setJobInfo(values);
    setActiveTab("1");
  }

  function onFinalFormFinish(values) {
    const finalObj = { ...jobInfo, ...values };
    console.log(finalObj);
    dispatch(postJob(finalObj));
  }

  return (
    <div>
      <DefaultLayout>
        <Tabs defaultActiveKey="0" activeKey={activeTab} className="PostTab">
          <TabPane tab="Service Info" key="0">
            <Form
              className="postServiceForm"
              layout="vertical"
              onFinish={onFirstFormFinish}
            >
              <Row gutter={45}>
                <Col lg={8} sm={24}>
                  <Form.Item
                    name="title"
                    rules={[{ required: true }]}
                    label="Service Name"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col lg={8} sm={24}>
                  <Form.Item
                    name="department"
                    rules={[{ required: true }]}
                    label="Service Category"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col lg={8} sm={24}>
                  <Form.Item
                    name="experience"
                    rules={[{ required: true }]}
                    label="Experience (in Years)"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col lg={8} sm={24}>
                  <Form.Item
                    name="salaryFrom"
                    rules={[{ required: true }]}
                    label="Service Charges From"
                  >
                    <Input type="number" />
                  </Form.Item>
                </Col>
                <Col lg={8} sm={24}>
                  <Form.Item
                    name="salaryTo"
                    rules={[{ required: true }]}
                    label="Service Charges To"
                  >
                    <Input type="number" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={128}>
                <Col lg={10} sm={24}>
                  <Form.Item
                    name="skillsRequired"
                    rules={[{ required: true }]}
                    label="Specializations"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col lg={10} sm={24}>
                  <Form.Item
                    name="minimumQualification"
                    rules={[{ required: true }]}
                    label="Qualification"
                  >
                    <Select>
                      <Option value="Degree">Degree</Option>
                      <Option value="12th">12th</Option>
                      <Option value="10th">10th</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col lg={24} sm={24}>
                  <Form.Item
                    name="smallDescription"
                    rules={[{ required: true }]}
                    label="Small Description"
                  >
                    <TextArea rows={3} />
                  </Form.Item>
                </Col>
                <Col lg={24} sm={24}>
                  <Form.Item
                    name="fullDescription"
                    rules={[{ required: true }]}
                    label="Full Description"
                  >
                    <TextArea rows={7} />
                  </Form.Item>
                </Col>
              </Row>
              <Button htmlType="submit">Next</Button>
            </Form>
          </TabPane>
          <TabPane tab="Company/Person Info" key="1">
            <Form className="postServiceForm" layout="vertical" onFinish={onFinalFormFinish}>
              <Row gutter={100}>
                <Col lg={8} sm={24}>
                  <Form.Item
                    name="company"
                    rules={[{ required: true }]}
                    label="Company Name / Individual"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col lg={8} sm={24}>
                  <Form.Item
                    name="email"
                    rules={[{ required: true }]}
                    label="Email"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col lg={8} sm={24}>
                  <Form.Item
                    name="phoneNumber"
                    rules={[{ required: true }]}
                    label="Phone Number"
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col lg={24} sm={24}>
                  <Form.Item
                    name="companyDescription"
                    rules={[{ required: true }]}
                    label="Description"
                  >
                    <TextArea rows={5} />
                  </Form.Item>
                </Col>
              </Row>
              <Button
                onClick={() => {
                  setActiveTab("0");
                }}
              >
                Previous Page
              </Button>
              <Button htmlType="submit">Post Service</Button>
            </Form>
          </TabPane>
        </Tabs>
      </DefaultLayout>
    </div>
  );
}

export default Post;
