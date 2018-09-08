import React from "react";
import { List, Avatar, Card } from "antd";
import styled from "styled-components";

const InnerMenu = ({ opened, children }) => (
  <StyledInnerMenu opened={opened}>{children}</StyledInnerMenu>
);

const StyledInnerMenu = styled(Card)`
  display: ${props => (props.opened ? "" : "none")};
  height: 200px;
  overflow-y: scroll;
`;


export default InnerMenu;
