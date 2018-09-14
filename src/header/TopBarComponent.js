import React from "react";
import { Button, Popover, Divider } from "antd";
import SignupPopup from "./popups/LoginSignupPopup";
import LogoutPopup from "./popups/LogoutPopupContainer";
import styled from "styled-components";

const content = (
  <div style={{ width: "300px", height: "300px" }}>
    <p>Content</p>
    <p>Content</p>
  </div>
);

const TopBar = ({ user }) => {
  console.log("topbar user:", user.name);
  return (
    <StyledContainer>
      <div style={{ float: "right" }}>
        {user.name === undefined || user.name === "" ? (
          <SignupPopup />
        ) : (
          <LogoutPopup />
        )}

        {user.name === undefined || user.name !== ""
          ? [
              <Divider type="vertical" key={1} />,
              <Popover
                key={2}
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
              </Popover>,

              <Divider type="vertical" key={3} />,
              <Popover
                key={4}
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
            ]
          : null}
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
