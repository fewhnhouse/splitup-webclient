import React from "react";
import styled from "styled-components";
import InnerMenu from "./InnerMenu";
import Groups from "./GroupsMenuList";
import Friends from "./FriendsMenuList";
import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";

const FooterMenu = ({ opened }) => (
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
        <h2>
          <Icon type="usergroup-add" />
          Groups
        </h2>
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
      <h2>
        <Icon type="home" />
        Dashboard
      </h2>
      <InnerMenu opened={opened} type="Dashboard" />
    </Menu.Item>
    <Menu.Item
      style={{
        flex: 1,
        textAlign: "center"
      }}
      key="3"
    >
      <h2>
        <Icon type="team" />
        Friends
      </h2>
      <InnerMenu opened={opened} type="Friends">
        <Friends />
      </InnerMenu>
    </Menu.Item>
  </StyledMenu>
);

const StyledMenu = styled(Menu)`
  line-height: 64px;
  display: flex;
  height: ${props => (props.opened ? "350px" : "80px")};
  transition: height 0.3s ease-in-out;
`;

export default FooterMenu;
