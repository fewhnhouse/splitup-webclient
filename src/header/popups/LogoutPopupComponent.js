import React from "react";
import { Button, Popover, List, Avatar } from "antd";
import styled from "styled-components";
import { ApolloConsumer } from "react-apollo";

function onLogoutClick(resetMe, client) {
  localStorage.clear();
  resetMe();
  client.resetStore();
}

const LogoutContent = ({ resetMe }) => (
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
          <StyledListItem onClick={() => onLogoutClick(resetMe, client)}>
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

const LogoutTitle = ({ user }) => (
  <div style={{ display: "flex", flexDirection: "row" }}>
    <Avatar
      style={{ marginTop: "8px", marginRight: "12px" }}
      icon="user"
      size="large"
      shape="square"
    />
    <div style={{ marginTop: "5px" }}>
      <p>Logged in as {user.name}</p>
      <p style={{ fontWeight: 200, fontSize: "12px", color: "grey" }}>
        {user.email}
      </p>
    </div>
    <div />
  </div>
);

class LogoutPopup extends React.Component {
  render() {
    const { user, resetMe } = this.props;

    return (
      <Popover
        content={<LogoutContent resetMe={resetMe} />}
        title={<LogoutTitle user={user} />}
        trigger="click"
      >
        <Button style={{ margin: "10px" }} type="default" icon="user" key="1">
          {user ? user.name : ""}
        </Button>
      </Popover>
    );
  }
}

const StyledListItem = styled(List.Item)`
  &:hover {
    color: #1890ff;
  }
  cursor: pointer;
`;

export default LogoutPopup;
