import React, { useState, useEffect } from "react";
import { Row, Col, Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/actions/userActions";
import Fade from "react-reveal";
import { ReactComponent as Arrow } from "../images/down-arrow.svg";
import loginBackground from "../images/LoginBackground.jpg";
import * as basicScroll from "react-basic-scroll";
import { Wave } from "react-animated-text";

function Login() {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dispatch = useDispatch();

  function login(values) {
    dispatch(loginUser(values));
  }

  return (
    <div className="loginPage">
      {/* <Fade> */}
      <div
        className="loginPageLogo"
        style={{ transform: `translateY(${offsetY * 0.5}px)` }}
      >
        <p
          id="logoName"
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            fontSize: "10rem",
          }}
        >
          {/* <Fade left> */}
          <p class="animate-character">H</p>
          <p class="animate-character">I</p>
          <p class="animate-character">R</p>
          <p class="animate-character">E</p>
          <p class="animate-character">Z</p>
          <p class="animate-character">E</p>
          <p class="animate-character">N</p>
          {/* </Fade> */}
        </p>
      </div>
      {/* </Fade> */}
      <Arrow class="arrow bounce" />
      <div
        className="login"
        style={{
          transform: `translateY(${offsetY * 0.3}px)`,
          bottom: "8rem",
        }}
      >
        <Fade top>
          <Row justify="center">
            <Col
              lg={10}
              sm={24}
              className="bs loginForm"
              style={{
                boxShadow: "0 0 1rem 0 rgba(0, 0, 0, 1)",
                backgroundColor: "rgba(255,255,255,.5)",
                borderRadius: "1%",
                backdropFilter: " saturate(180%) blur(10px)",
                padding: "2rem",
              }}
            >
              <h1>Login</h1>
              <hr />
              <Form layout="vertical" onFinish={login}>
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
                <Button htmlType="submit" className="mb-3">
                  Login
                </Button>
              </Form>
              <a
                className="loginATag"
                href="/register"
                style={{ paddingTop: "50px" }}
              >
                Not Registered ? Click here to Register
              </a>
            </Col>
          </Row>
        </Fade>
      </div>
    </div>
  );
}

export default Login;
