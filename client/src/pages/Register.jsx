import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import { Row, Col, Form, Input, Button, message } from "antd";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/actions/userActions";

function Register() {
  const dispatch = useDispatch();
  function register(values) {
    if (values.password !== values.confirmpassword) {
      message.error("Passwords not matched!");
    } else {
      console.log(values);
      dispatch(registerUser(values));
    }
  }

  return (
    <div className="login">
      <Row justify="center">
        <Col lg={10} sm={24} className="bs">
          <h1>Register</h1>
          <hr />
          <Form layout="vertical" onFinish={register}>
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="confirmpassword"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Button htmlType="submit">Register</Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Register;
