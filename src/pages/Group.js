import React from "react";
import {
  Card,
  Button,
  List,
  Avatar,
  Divider,
  Icon,
  Input,
  Modal,
  Tabs
} from "antd";
import styled from "styled-components";
import GroupEditButton from "./GroupEditButton";
import Upload from "./Upload";
import History from "./History";
import ParticipantsSelect from "../footer/ParticipantsSelect";

const TabPane = Tabs.TabPane;

const Item = List.Item;

class Header extends React.Component {
  state = {
    title: ""
  };

  render() {
    const { title, date, editable, participants } = this.props;
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        {editable ? (
          <Upload />
        ) : (
          <Avatar shape="square" size={112} icon="user" />
        )}
        <div style={{ flexDirection: "column", marginLeft: "15px" }}>
          {editable ? (
            <Input
              size="large"
              placeholder={this.props.title}
              value={this.props.value}
              onChange={this.props.onChange}
            />
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
            <Divider
              style={{
                marginTop: "5px",
                display: "block",
                lineHeight: "1.5",
                fontSize: "14px"
              }}
              type="vertical"
            />
            <p>
              <Icon
                style={{ marginRight: "5px" }}
                type="team"
                theme="outlined"
              />
              {participants.length}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

class Group extends React.Component {
  state = {
    showModal: false
  };

  _onClickShow = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  render() {
    const {
      title,
      date,
      participants,
      editable,
      saveConfirm,
      deleteConfirm,
      description,
      cancel,
      onClickEdit,
      editedTitle,
      editedDescription,
      onChangeTitle,
      onChangeDescription
    } = this.props;

    return (
      <Card style={{ margin: "40px" }}>
        <GroupEditButton
          saveConfirm={saveConfirm}
          editedTitle={editedTitle}
          cancel={cancel}
          deleteConfirm={deleteConfirm}
          onClickEdit={onClickEdit}
          editable={editable}
        />
        <Header
          title={title}
          value={editedTitle}
          onChange={onChangeTitle}
          date={date}
          participants={participants}
          editable={editable}
        />
        <InnerContainer>
          <List>
            <Item>
              {editable ? (
                <span style={{ width: "100%" }}>
                  <h3>Description: </h3>

                  <Input
                    value={editedDescription}
                    placeholder={description}
                    onChange={onChangeDescription}
                  />
                </span>
              ) : (
                <span>
                  <h3>Description: </h3>
                  <p>{description}</p>
                </span>
              )}
            </Item>
            <Item>
              <div style={{ width: "100%" }}>
                <h3 style={{ paddingRight: "10px" }}>Members:</h3>
                <div
                  style={{
                    width: "100%"
                  }}
                >
                  {participants.map((el, index) => (
                    <span key={index}>
                      <a>{el.name}</a>
                      {participants.length - 1 !== index ? (
                        <Divider type="vertical" />
                      ) : null}
                    </span>
                  ))}
                  <Button
                    onClick={this._onClickShow}
                    style={{ float: "right" }}
                    icon="plus"
                    type="primary"
                  >
                    Add Member
                  </Button>
                </div>
              </div>
            </Item>
            <Item>
              <h3>Admin</h3>{" "}
            </Item>
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
        <Modal visible={this.state.showModal} title="Add member">
          <ParticipantsSelect />
        </Modal>
      </Card>
    );
  }
}

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 0px;
`;

export default Group;
