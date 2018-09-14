import React from "react";
import { Modal, message } from "antd";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import UserSelect from "./AddFriendModal";

const ADD_FRIEND = gql`
  mutation AddFriend($id: ID!) {
    addFriend(id: $id) {
      name
    }
  }
`;

const CREATE_GROUP = gql`
  mutation CreateGroup($input: CreateGroupInput!) {
    createGroup(input: $input) {
      id
      title
      participants
    }
  }
`;

const ADD_PARTICIPANTS = gql`
  mutation AddGroupParticipant($groupId: ID!, $userId: ID!) {
    addGroupParticipant(groupId: $groupId, userId: $userId) {
      id
      title
      participants
    }
  }
`;

const REMOVE_PARTICIPANTS = gql`
  mutation RemoveGroupParticipant($groupId: ID!, $userId: ID!) {
    removeGroupParticipant(groupId: $groupId, userId: $userId) {
      id
      title
      participants
    }
  }
`;
export default class AddFriend extends React.Component {
  state = {
    value: "",
    id: ""
  };

  _handleSearch = value => {
    this.setState({
      value
    });
  };
  _handleChange = (selectedId, data) => {
    const { name, id } = data.find(d => d.id === selectedId);
    this.setState({
      value: name,
      id
    });
  };
  _handleOk = async addFriend => {
    this.props.handleOk();
    addFriend({ variables: { id: this.state.id } }).then(
      res =>
        message.success(
          `${this.state.value} was successfully added to Friends List.`
        ),
      err => message.error("Something went wrong: ", err)
    );
    this.setState({
      id: "",
      value: ""
    });
  };
  render() {
    const { visible, handleOk, handleCancel, type } = this.props;
    return (
      <Mutation mutation={ADD_FRIEND}>
        {(addFriend, { data }) => (
          <Modal
            title={`Add Friend`}
            visible={visible}
            onOk={() => this._handleOk(addFriend)}
            onCancel={handleCancel}
          >
            <UserSelect
              handleChange={this._handleChange}
              handleSearch={this._handleSearch}
              value={this.state.value}
            />
          </Modal>
        )}
      </Mutation>
    );
  }
}
