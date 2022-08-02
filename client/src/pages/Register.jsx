import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import { Row, Col, Form, Input, Button, message } from "antd";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/actions/userActions";
import Fade from "react-reveal";

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
      <Fade top>
        <Row justify="center">
          <div className="register-flex">
            <Col
              className="registerLogo"
              style={{
                color: "white",
                paddingRight: "10rem",
                paddingTop: "10px",
              }}
            >
              HIREZEN
            </Col>
            <Col
              lg={12}
              sm={24}
              className="bs registerForm"
              style={{
                backgroundColor: "rgba(255,255,255,.5)",
                borderRadius: "1%",
                left: "-12rem",
                top: "1rem",
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
                    type="password"
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
                    type="password"
                    style={{
                      backgroundColor: "rgba(255,255,255,.5)",
                      borderRadius: "1%",
                    }}
                  />
                </Form.Item>
                <Button htmlType="submit" className="mb-3">
                  Register
                </Button>
              </Form>
              <a
                className="loginATag"
                href="/login"
                style={{ paddingTop: "50px" }}
              >
                Already Registered ? Click here to Login
              </a>
            </Col>
          </div>
        </Row>
      </Fade>
    </div>
  );
}

export default Register;
