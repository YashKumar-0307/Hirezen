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
    <div className="register">
      <Row justify="center">
        <Col className="registerLogo" style={{ color: "white", paddingRight: '100px' }}>HIREZEN</Col>
        <Col
          lg={10}
          sm={24}
          className="bs"
          style={{
            backgroundColor: "rgba(255,255,255,.5)",
            borderRadius: "1%",
          }}
        >
          <h1>Register</h1>
          <hr />
          <Form layout="vertical" onFinish={register}>
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true }]}
            >
              <Input
                style={{
                  backgroundColor: "rgba(255,255,255,.5)",
                  borderRadius: "1%",
                }}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true }]}
            >
              <Input
                style={{
                  backgroundColor: "rgba(255,255,255,.5)",
                  borderRadius: "1%",
                }}
              />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="confirmpassword"
              rules={[{ required: true }]}
            >
              <Input
                style={{
                  backgroundColor: "rgba(255,255,255,.5)",
                  borderRadius: "1%",
                }}
              />
            </Form.Item>
            <Button htmlType="submit">Register</Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Register;
