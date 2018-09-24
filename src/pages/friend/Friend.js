import React from "react";
import { Card, Icon, Tabs, Skeleton, Divider } from "antd";
import History from "./History";
import AddGroupModal from "./AddGroupModal";
import Header from "./FriendHeader";
import FriendInner from "./FriendInner";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const TabPane = Tabs.TabPane;

const FRIEND = gql`
  query User($id: ID) {
    user(id: $id) {
      id
      name
      email
      groups {
        id
        title
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

class Friend extends React.Component {
  state = {
    showModal: false
  };

  _handleOk = () => {
    this.setState({ showModal: false });
  };

  _onClickShow = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  render() {
    const friendId = this.props.match.params.friendId;

    return (
      <Query query={FRIEND} variables={{ id: friendId }}>
        {({ loading, err, data, refetch }) => {
          if (loading) {
            return (
              <Card style={{ margin: "40px" }}>
                <Skeleton active />
              </Card>
            );
          }
          if (err || !data) {
            return <div>Error.</div>;
          } else {
            const { user } = data;
            const { name, email, createdAt } = user;
            const date = new Date(createdAt);
            const dateString = `${date.getDate()}. ${
              months[date.getMonth()]
            } ${date.getFullYear()}`;
            return (
              <Card style={{ margin: "40px" }}>
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
                    <Header
                      name={name}
                      email={email}
                      date={"24. December 2016"}
                      myId={this.props.user.id}
                      friendId={friendId}
                    />
                    <Divider type="horizontal" />

                    <FriendInner
                      onClick={this._onClickShow}
                      myId={this.props.user.id}
                      friendId={friendId}
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

                <AddGroupModal
                  participants={[]}
                  groupId={friendId}
                  visible={this.state.showModal}
                  handleCancel={this._handleOk}
                  handleOk={this._handleOk}
                />
              </Card>
            );
          }
        }}
      </Query>
    );
  }
}

export default Friend;
