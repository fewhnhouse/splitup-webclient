import React from "react";
import styled from "styled-components";
import InnerMenu from "./InnerMenu";
import Groups from "./Groups";
import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";

const menuData = [
  {
    title: "Ant Design Title 1"
  },
  {
    title: "Ant Design Title 2"
  },
  {
    title: "Ant Design Title 3"
  },
  {
    title: "Ant Design Title 4"
  }
];

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
        fontSize: "20px",
        margin: "5px",
        textAlign: "center"
      }}
      key="1"
    >
      <Link to="/groups">
        <Icon type="usergroup-add" />
        Groups
        <InnerMenu opened={opened}>
          <Groups />
        </InnerMenu>
      </Link>
    </Menu.Item>
    <Menu.Item
      style={{
        flex: 1,
        fontSize: "20px",
        margin: "5px",
        textAlign: "center"
      }}
      key="2"
    >
      <Icon type="home" />
      Dashboard
      <InnerMenu opened={opened}>
        <Groups />
      </InnerMenu>
    </Menu.Item>
    <Menu.Item
      style={{
        flex: 1,
        fontSize: "20px",
        margin: "5px",
        textAlign: "center"
      }}
      key="3"
    >
      <Icon type="team" />
      Friends
      <InnerMenu opened={opened}>
        <Groups />
      </InnerMenu>
    </Menu.Item>
  </StyledMenu>
);

const StyledMenu = styled(Menu)`
  line-height: 64px;
  display: flex;
  height: ${props => (props.opened ? "300px" : "80px")};
  transition: height 0.3s ease-in-out;
`;

export default FooterMenu;
