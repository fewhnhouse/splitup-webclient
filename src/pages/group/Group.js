import React from "react";
import { Card, Icon, Tabs, Skeleton, Divider, Alert } from "antd";
import GroupEditButton from "./GroupEditButton";
import History from "./History";
import AddMemberModal from "./AddMemberModal";
import Header from "./GroupHeader";
import GroupInner from "./GroupInner";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const TabPane = Tabs.TabPane;

const GROUP = gql`
  query Group($id: ID!) {
    group(id: $id) {
      id
      title
      description
      createdAt
      participants {
        name
        id
      }
    }
  }
`;

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

class Group extends React.Component {
  closeModal = () => {
    this.setState({ editable: false });
  };

  onClickEdit = () => {
    this.setState(prevState => ({
      editable: !prevState.editable,
      description: "",
      title: ""
    }));
  };

  onChangeTitle = e => {
    this.setState({
      title: e.target.value
    });
  };

  onChangeDescription = e => {
    this.setState({
      description: e.target.value
    });
  };

  state = {
    editable: false,
    title: "",
    description: "",
    showModal: false
  };

  _handleOk = () => {
    this.setState({ showModal: false });
  };

  _onClickShow = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  render() {
    const groupId = this.props.match.params.groupId;

    return (
      <Query query={GROUP} variables={{ id: groupId }}>
        {({ loading, err, data, refetch }) => {
          if (loading) {
            return (
              <Card style={{ margin: "40px" }}>
                <Skeleton active />
              </Card>
            );
          }
          if (err) {
            return <div>Error.</div>;
          } else {
            const {
              title,
              description,
              participants,
              createdAt,
              id
            } = data.group;
            const date = new Date(createdAt);
            const dateString = `${date.getDate()}. ${
              months[date.getMonth()]
            } ${date.getFullYear()}`;
            return (
              <Card style={{ margin: "40px", marginBottom: "200px" }}>
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
                    <GroupEditButton
                      closeModal={this.closeModal}
                      title={this.state.title}
                      description={this.state.description}
                      id={groupId}
                      onClickEdit={this.onClickEdit}
                      editable={this.state.editable}
                    />
                    <Header
                      participants={participants}
                      title={title}
                      value={this.state.title}
                      onChange={this.onChangeTitle}
                      date={dateString}
                      editable={this.state.editable}
                      description={description}
                      editedDescription={this.state.description}
                      onChangeDescription={this.onChangeDescription}
                    />
                    <Divider type="horizontal" />
                    <Alert
                      message="Error"
                      description="You owe $23.21."
                      type="error"
                      showIcon
                    />
                    <Divider type="horizontal" />

                    <GroupInner
                      editable={this.state.editable}
                      description={description}
                      editedDescription={this.state.description}
                      onChangeDescription={this.onChangeDescription}
                      participants={participants}
                      onClickMember={this._onClickShow}
                      onClickSettle={this._onClickShow}
                      onClickExpense={this._onClickShow}
                    />
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
                    <History id={id} />
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

                <AddMemberModal
                  participants={participants}
                  groupId={groupId}
                  visible={this.state.showModal}
                  handleCancel={this._handleOk}
                  handleOk={this._handleOk}
                  editable={this.state.editable}
                />
              </Card>
            );
          }
        }}
      </Query>
    );
  }
}

export default Group;
