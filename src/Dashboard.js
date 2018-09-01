import { Layout, Breadcrumb, Button, Divider, Popover } from "antd";
import React from "react";
import styled from "styled-components";
import FooterMenu from "./FooterMenu";
import LoginPopup from "./LoginPopup";
const { Content, Footer, Header } = Layout;

const content = (
  <div style={{ width: "300px", height: "300px" }}>
    <p>Content</p>
    <p>Content</p>
  </div>
);

const loginContent = (
  <div style={{ width: "300px" }}>
    <LoginPopup />
  </div>
);

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false
    };
  }

  onMouseEnter = () => {
    this.setState({ opened: true });
  };

  onMouseLeave = () => {
    this.setState({ opened: false });
  };

  render() {
    return (
      <Layout>
        <Header style={{ padding: 0 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              height: "120px",
              background: "white"
            }}
          >
            <div style={{ flex: 8 }} />
            <div style={{ flex: 2 }}>
              <Popover content={loginContent} title="Login" trigger="click">
                <Button
                  style={{ margin: "10px" }}
                  type="default"
                  icon="user"
                  key="1"
                >
                  User
                </Button>
              </Popover>
            </div>

            <div style={{ flex: 2 }}>
              <Popover
                content={content}
                placement="bottomRight"
                title="Messages"
                trigger="click"
              >
                <Button
                  style={{ margin: "10px" }}
                  type="danger"
                  ghost
                  icon="mail"
                  shape="circle"
                  key="2"
                />
              </Popover>

              <Divider type="vertical" />
              <Popover
                content={content}
                placement="bottomRight"
                title="Notifications"
                trigger="click"
              >
                <Button
                  style={{ margin: "10px" }}
                  type="primary"
                  ghost
                  icon="notification"
                  shape="circle"
                  key="3"
                />
              </Popover>
            </div>
          </div>
        </Header>
        <Layout>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              style={{
                background: "#fff",
                padding: 24,
                margin: 10,
                minHeight: 280
              }}
            >
              Content
            </Content>
            <Content
              style={{
                background: "#fff",
                padding: 24,
                margin: 10,
                minHeight: 280
              }}
            >
              Content
            </Content>
            <Content
              style={{
                background: "#fff",
                padding: 24,
                margin: 10,
                minHeight: 280
              }}
            >
              Content
            </Content>
          </Layout>
        </Layout>
        <StyledFooter
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
        >
          <FooterMenu opened={this.state.opened} />
        </StyledFooter>
      </Layout>
    );
  }
}

const StyledFooter = styled(Footer)`
  position: fixed;
  z-index: 1;
  width: 100%;
  bottom: 0;
  padding: 0px;
  margin: 0px;
  border-top: 2px solid #1890ff;
  box-shadow: 2px 0px 8px lightgray;
`;

export default Dashboard;
