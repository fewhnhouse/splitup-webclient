import React from "react";
import { Button, Popover, Divider } from "antd";
import SignupPopup from "./popups/LoginSignupPopup";
import LogoutPopup from "./popups/LogoutPopup";
import styled from "styled-components";
import { UserContext } from "../utils/UserContext";

const content = (
  <div style={{ width: "300px", height: "300px" }}>
    <p>Content</p>
    <p>Content</p>
  </div>
);

const TopBar = () => {
  return (
    <UserContext.Consumer>
      {value => {
        return (
          <StyledContainer>
            <div style={{ float: "right" }}>
              {value.name === "" ? (
                <SignupPopup />
              ) : (
                <LogoutPopup value={value} />
              )}

              {value.name !== ""
                ? [
                    <Divider type="vertical" />,
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
                    </Popover>,

                    <Divider type="vertical" />,
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
                  ]
                : null}
            </div>
          </StyledContainer>
        );
      }}
    </UserContext.Consumer>
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
