import React from "react";
import styled from "styled-components";
import InnerMenu from "./InnerMenu";
import Groups from "./group/GroupsMenuList";
import Friends from "./friend/FriendsMenuList";
import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";

const FooterMenu = ({ opened }) => (
  <div>
    <StyledMenu
      opened={opened}
      theme="light"
      mode="horizontal"
      defaultSelectedKeys={["2"]}
    >
      <Menu.Item
        style={{
          flex: 1,
          textAlign: "center"
        }}
        key="1"
      >
        <Link to="/groups">
          <StyledHeader>
            <Icon type="usergroup-add" />
            Groups
          </StyledHeader>
        </Link>
        <InnerMenu opened={opened} type="Groups">
          <Groups />
        </InnerMenu>
      </Menu.Item>
      <Menu.Item
        style={{
          flex: 1,
          textAlign: "center"
        }}
        key="2"
      >
        <StyledHeader>
          <Icon type="home" />
          Dashboard
        </StyledHeader>
        <InnerMenu opened={opened} type="Expense" />
      </Menu.Item>
      <Menu.Item
        style={{
          flex: 1,
          textAlign: "center"
        }}
        key="3"
      >
        <StyledHeader>
          <Icon type="team" />
          Friends
        </StyledHeader>
        <InnerMenu opened={opened} type="Friends">
          <Friends />
        </InnerMenu>
      </Menu.Item>
    </StyledMenu>
  </div>
);

const StyledMenu = styled(Menu)`
  line-height: 64px;
  display: flex;
  height: ${props => (props.opened ? "350px" : "80px")};
  transition: height 0.3s ease-in-out;
`;

const StyledHeader = styled.h2`
  color: white;
  margin-bottom: 0;
`;
export default FooterMenu;
