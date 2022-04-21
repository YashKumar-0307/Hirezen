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
      <div
        className="loginPageLogo"
        style={{ transform: `translateY(${offsetY * 0.5}px)` }}
      >
        <p
          style={{ textAlign: "center", display: "flex", paddingLeft: "25rem" }}
        >
          {/* <Fade left> */}
          <p class="animate-charcter">H</p>
          <p class="animate-charcter">I</p>
          <p class="animate-charcter">R</p>
          <p class="animate-charcter">E</p>
          <p class="animate-charcter">Z</p>
          <p class="animate-charcter">E</p>
          <p class="animate-charcter">N</p>
          {/* </Fade> */}
        </p>
      </div>
      <Arrow class="arrow bounce" />
      <div
        className="login"
        style={{
          transform: `translateY(${offsetY * 0.3}px)`,
        }}
      >
        <Row justify="center">
          <Col
            lg={10}
            sm={24}
            className="bs"
            style={{
              backgroundColor: "rgba(255,255,255,.5)",
              borderRadius: "1%",
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
                  style={{
                    backgroundColor: "rgba(255,255,255,.5)",
                    borderRadius: "1%",
                  }}
                />
              </Form.Item>
              <Button htmlType="submit">Login</Button>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Login;
