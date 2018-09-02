import React from "react";
import { Button, Popover, Divider } from "antd";
import LoginPopup from "./LoginPopup";
import styled from "styled-components";

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

const TopBar = () => {
  const username = localStorage.getItem("username");
  return (
    <StyledContainer>
      <div style={{ flex: 8 }} />

      <div style={{ flex: 2 }}>
        {username !== null ? (
          <Popover content={loginContent} title="Login" trigger="click">
            <Button
              style={{ margin: "10px" }}
              type="default"
              icon="user"
              key="1"
            >
              Login
            </Button>
          </Popover>
        ) : (
          <Button style={{ margin: "10px" }} type="default" icon="user" key="1">
            {username}
          </Button>
        )}

        <Divider type="vertical" />

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
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 65px;
  background: white;
  box-shadow: 0 2px 8px #f0f1f2;
`;
export default TopBar;
