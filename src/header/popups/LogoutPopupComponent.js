import React from "react";
import { Button, Popover, List, Avatar } from "antd";
import styled from "styled-components";
import { ApolloConsumer } from "react-apollo";
import "./LogoutPopup.css";

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
                  style={{ color: "#69c0ff", backgroundColor: "#fff" }}
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
                  style={{ color: "#69c0ff", backgroundColor: "#fff" }}
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
                  style={{ color: "#69c0ff", backgroundColor: "#fff" }}
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
  <StyledTitleContainer>
    <Avatar
      style={{ marginTop: "8px", marginRight: "12px" }}
      icon="user"
      size="large"
      shape="square"
    />
    <div style={{ marginTop: "5px" }}>
      <p style={{ marginBottom: "5px" }}>{user.name}</p>
      <p style={{ fontWeight: 200, fontSize: "12px", color: "lightgrey" }}>
        {user.email}
      </p>
    </div>
    <div />
  </StyledTitleContainer>
);

class LogoutPopup extends React.Component {
  render() {
    const { user, resetMe } = this.props;

    return (
      <Popover
        overlayClassName={"auth-popup"}
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

const StyledTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  background: #1890ff;
  border-radius: 4px 4px 0px 0px;
  padding: 5px 16px 4px;
  color: white;
`;

export default LogoutPopup;
