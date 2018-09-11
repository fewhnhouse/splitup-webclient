import React from "react";
import {Card, Button, List, Avatar, Divider, Icon} from 'antd';
import styled from "styled-components";
import Upload from './Upload';

const Item = List.Item;

const Group = ({ title, date, participants, editable }) => (
  <Card style={{ margin: "40px" }}>
    <Button
      style={{
        position: "absolute",
        right: "15px",
        top: "15px",
        fontSize: "20px"
      }}
      icon="edit"
      theme="outlined"
    />
    <div style={{ display: "flex", flexDirection: "row" }}>
      {editable ? <Upload/> : <Avatar shape="square" size={112} icon="user" />}
      <div style={{ flexDirection: "column", marginLeft: "15px" }}>
        <h1 style={{ marginBottom: "5px" }}>{title}</h1>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            color: "lightgrey"
          }}
        >
          <p>
            <Icon
              style={{ marginRight: "5px" }}
              type="calendar"
              theme="outlined"
            />
            {date}
          </p>
          <p>
            <Divider type="vertical" />
          </p>
          <p>
            <Icon style={{ marginRight: "5px" }} type="team" theme="outlined" />
            {participants}
          </p>
        </div>
      </div>
    </div>
    <InnerContainer>
      <List>
        <Item>Description</Item>
        <Item>
          Members: <span style={{ textAlign: "right" }}>12</span>
        </Item>
        <Item>Admin: </Item>
      </List>
    </InnerContainer>
  </Card>
);

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export default Group;