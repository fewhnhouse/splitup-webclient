import React from "react";
import { List, Avatar, Card } from "antd";
import styled from "styled-components";

const InnerMenu = ({ opened, data }) => (
  <StyledInnerMenu opened={opened}>
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={item => (
        <StyledListItem>
          <List.Item.Meta
            avatar={<Avatar icon="user" />}
            title={<a href="#">{item.title}</a>}
          />
        </StyledListItem>
      )}
    />
  </StyledInnerMenu>
);

const StyledInnerMenu = styled(Card)`
  display: ${props => (props.opened ? "" : "none")};
  height: 200px;
  overflow-y: scroll;
`;

const StyledListItem = styled(List.Item)`
  &:hover {
    a {
      color: #1890ff;
    }
  }
  cursor: pointer;
`;

export default InnerMenu;
