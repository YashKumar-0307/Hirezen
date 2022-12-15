import React from "react";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  PlusSquareOutlined,
  ContactsOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";
import Filter from "./Filter";

const { Header, Sider, Content } = Layout;

class DefaultLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: window.matchMedia("(max-width: 650px)").matches,
    };
  }

  componentDidMount() {
    const handler = (e) => this.setState({ matches: e.matches });
    window.matchMedia("(max-width: 650px)").addEventListener("change", handler);
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  render() {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          style={{
            position: "sticky",
            overflow: "auto",
            height: "100%",
            top: "0",
          }}
        >
          <div className="logo">
            {this.state.collapsed ? <h1>HS</h1> : <h1>Hirezen</h1>}
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[window.location.pathname]}
          >
            <Menu.Item key="/" icon={<UserOutlined />}>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="/profile" icon={<VideoCameraOutlined />}>
              <Link to="/profile">Profile</Link>
            </Menu.Item>
            {/* <Menu.Item key="/login" icon={<UploadOutlined />}>
              <Link to="/login">Login</Link>
            </Menu.Item> */}
            <Menu.Item key="/post" icon={<VideoCameraOutlined />}>
              <Link to="/post">Post Service</Link>
            </Menu.Item>
            <Menu.Item key="/posted" icon={<VideoCameraOutlined />}>
              <Link to="/posted">Posted Services</Link>
            </Menu.Item>
            <Menu.Item key="/appliedjob" icon={<PlusSquareOutlined />}>
              <Link to="/appliedjob">Booked Services</Link>
            </Menu.Item>
            <Menu.Item key="/contact" icon={<ContactsOutlined />}>
              <Link to="/contact">Contact Us</Link>
            </Menu.Item>
            <Menu.Item
              key="/logout"
              icon={<UploadOutlined />}
              onClick={this.logout}
            >
              <Link to="/login">Logout</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: "0",
              position: "sticky",
              overflow: "auto",
              top: "0",
              zIndex: "9999",
            }}
          >
            <div className="flex justify-content-between">
              <div>
                {React.createElement(
                  this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                  {
                    className: "trigger",
                    onClick: this.toggle,
                  }
                )}
              </div>

              <div>
                <Filter />
              </div>

              <div>
                <h5 className="mr-3">
                  <b>{user.username}</b>
                </h5>
              </div>
            </div>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            {this.props.children}
            {/* Content */}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default DefaultLayout;
