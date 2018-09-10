import React from "react";
import { Button, Popover, List, Avatar } from "antd";
import styled from "styled-components";
import { ApolloConsumer } from "react-apollo";

function onLogoutClick(value, client) {
  console.log(client);
  localStorage.clear();
  value.setLoginData("", "");
  client.resetStore();
}

const LogoutContent = ({ value }) => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <ApolloConsumer>
      {client => (
        <List>
          <StyledListItem>
            <List.Item.Meta
              avatar={
                <Avatar
                  size="small"
                  style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                  shape="square"
                  icon="profile"
                />
              }
              title="Profile"
            />
          </StyledListItem>
          <StyledListItem>
            <List.Item.Meta
              avatar={
                <Avatar
                  size="small"
                  style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                  shape="square"
                  icon="setting"
                />
              }
              title="Settings"
            />
          </StyledListItem>
          <StyledListItem onClick={() => onLogoutClick(value, client)}>
            <List.Item.Meta
              avatar={
                <Avatar
                  size="small"
                  style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                  shape="square"
                  icon="logout"
                />
              }
              title="Sign out"
            />
          </StyledListItem>
        </List>
      )}
    </ApolloConsumer>
  </div>
);

const LogoutTitle = ({ name, email }) => (
  <div style={{ display: "flex", flexDirection: "row" }}>
    <Avatar
      style={{ marginTop: "8px", marginRight: "12px" }}
      icon="user"
      size="large"
      shape="square"
    />
    <div style={{ marginTop: "5px" }}>
      <p>Logged in as {name}</p>
      <p style={{ fontWeight: 200, fontSize: "12px", color: "grey" }}>
        {email}
      </p>
    </div>
    <div />
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
