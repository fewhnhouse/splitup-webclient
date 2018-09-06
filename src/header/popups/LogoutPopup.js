import React from "react";
import { Button, Popover, Divider, List, Icon } from "antd";
import styled from "styled-components";

function onLogoutClick(value) {
  localStorage.clear();
  value.setLoginData("", "");
}

const LogoutContent = ({ value }) => (
  <div style={{ width: "150px", display: "flex", flexDirection: "column" }}>
    <List>
      <StyledListItem>
        <Icon type="user" />
        Profile
      </StyledListItem>
      <StyledListItem>
        <Icon type="user" />
        Settings
      </StyledListItem>
      <StyledListItem onClick={() => onLogoutClick(value)}>
        <Icon type="user" />
        Logout
      </StyledListItem>
    </List>
  </div>
);

const LogoutTitle = ({ name, email }) => (
  <div>
    <p>Logged in as {name}</p>
    <p style={{ fontWeight: 200, fontSize: "12px", color: "grey" }}>{email}</p>
  </div>
);

const LogoutPopup = ({ value }) => (
  <Popover
    content={<LogoutContent value={value} />}
    title={<LogoutTitle name={value.name} email={value.email} />}
    trigger="click"
  >
    <Button style={{ margin: "10px" }} type="default" icon="user" key="1">
      {value.name}
    </Button>
  </Popover>
);

const StyledListItem = styled(List.Item)`
  &:hover {
    color: #1890ff;
  }
  cursor: pointer;
`;

export default LogoutPopup;
