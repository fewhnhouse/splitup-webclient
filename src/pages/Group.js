import React from "react";
import {
  Card,
  Button,
  List,
  Avatar,
  Divider,
  Icon,
  Input,
  Popconfirm,
  Tabs
} from "antd";
import styled from "styled-components";
import Upload from "./Upload";
import History from "./History";

const TabPane = Tabs.TabPane;

const Item = List.Item;

const Group = ({
  title,
  date,
  participants,
  editable,
  saveConfirm,
  deleteConfirm,
  description,
  cancel,
  onClickEdit
}) => (
  <Card style={{ margin: "40px" }}>
    {editable ? (
      <div
        style={{
          position: "absolute",
          right: "15px",
          top: "15px",
          fontSize: "20px",
          display: "flex"
        }}
      >
        <Popconfirm
          title="Are you sure you want to save your changes?"
          onConfirm={saveConfirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button
            style={{ marginRight: "5px" }}
            type="primary"
            ghost
            icon="save"
          >
            Save
          </Button>
        </Popconfirm>

        <Button
          style={{ marginRight: "5px" }}
          type="default"
          icon="close-circle"
          onClick={onClickEdit}
        >
          Discard
        </Button>
        <Popconfirm
          placement="topRight"
          title="Are you sure you want to delete this group?"
          onConfirm={deleteConfirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button type="danger" ghost icon="delete">
            Delete
          </Button>
        </Popconfirm>
      </div>
    ) : (
      <Button
        style={{
          position: "absolute",
          right: "15px",
          top: "15px",
          fontSize: "20px"
        }}
        icon="edit"
        theme="outlined"
        onClick={onClickEdit}
      />
    )}
    <div style={{ display: "flex", flexDirection: "row" }}>
      {editable ? <Upload /> : <Avatar shape="square" size={112} icon="user" />}
      <div style={{ flexDirection: "column", marginLeft: "15px" }}>
        {editable ? (
          <Input size="large" placeholder="Group title" />
        ) : (
          <h1 style={{ marginBottom: "5px" }}>{title}</h1>
        )}

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
            {participants.length}
          </p>
        </div>
      </div>
    </div>
    <InnerContainer>
      <List>
        <Item>
          {editable ? (
            <Input placeholder="Description" />
          ) : (
            <span>Description:  {description}</span>
          )}
        </Item>
        <Item>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%"
            }}
          >
            <span style={{ paddingRight: "10px" }}>Members:</span>
            <div style={{ width: "100%" }}>
              {participants.map((el, index) => (
                <span>
                  <a>{el.name}</a>
                  {participants.length - 1 !== index ? (
                    <Divider type="vertical" />
                  ) : null}
                </span>
              ))}
            </div>
            <Button style={{ float: "right" }} icon="plus" type="primary">
              Add Member
            </Button>
          </div>
        </Item>
        <Item>Admin: </Item>
      </List>
      <div style={{ height: "300px" }}>
        <Tabs defaultActiveKey="1">
          <TabPane
            tab={
              <span>
                <Icon type="home" theme="outlined" />
                Overview
              </span>
            }
            key="1"
          >
            Pane 2
          </TabPane>
          <TabPane
            tab={
              <span>
                <Icon type="clock-circle" theme="outlined" />
                History
              </span>
            }
            key="2"
          >
            <History />
          </TabPane>
          <TabPane
            tab={
              <span>
                <Icon type="project" theme="outlined" />
                Create Expense
              </span>
            }
            key="3"
          >
            Pane 3
          </TabPane>
        </Tabs>
      </div>
    </InnerContainer>
  </Card>
);

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export default Group;
