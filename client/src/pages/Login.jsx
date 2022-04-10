import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import { Row, Col, Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

function Login() {
  const dispatch = useDispatch();

  function login(values) {
    dispatch(loginUser(values));
  }

  return (
    <div className="login">
      <Row justify="center">
        <Col lg={10} sm={24} className="bs">
          <h1>Login</h1>
          <hr />
          <Form layout="vertical" onFinish={login}>
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
            <Button htmlType="submit">Login</Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
