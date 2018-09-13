import React from "react";
import { Modal, message, Input, Form } from "antd";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import ParticipantsSelect from "./ParticipantsSelect";
import AddGroupForm from "./AddGroupForm";
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
      participants {
        id
        name
      }
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
export default class AddGroup extends React.Component {
  state = {
    searchValue: "",
    values: [],
    title: "",
    description: ""
  };

  _handleSearch = searchValue => {
    this.setState({
      searchValue
    });
  };
  _handleChange = data => {
    this.setState({
      values: data
    });
  };

  _handleOk = async createGroup => {
    this.props.handleOk();
    const input = {
      title: this.state.title,
      description: this.state.description,
      participants: this.state.values.map(val => val.key)
    };
    console.log(input);
    const then = await createGroup({
      variables: {
        input
      }
    });
    if (then.error) {
      message.error("Something went wrong: ", then.error);
    } else {
      message.success(`Group was successfully created.`);
    }
    this.setState({
      values: [],
      title: "",
      description: ""
    });
  };

  _onChangeDescription = evt => {
    this.setState({
      description: evt.target.value
    });
  };

  _onChangeTitle = evt => {
    this.setState({
      title: evt.target.value
    });
  };

  render() {
    const { visible, handleOk, handleCancel, type } = this.props;
    return (
      <Mutation mutation={CREATE_GROUP}>
        {(createGroup, { data }) => (
          <Modal
            title={`Add Group`}
            visible={visible}
            onOk={() => this._handleOk(createGroup)}
            onCancel={handleCancel}
          >
            <AddGroupForm
              onChangeDescription={this._onChangeDescription}
              onChangeTitle={this._onChangeTitle}
              description={this.state.description}
              title={this.state.title}
            />
            <ParticipantsSelect
              handleChange={this._handleChange}
              handleSearch={this._handleSearch}
              values={this.state.values}
              searchValue={this.state.searchValue}
            />
          </Modal>
        )}
      </Mutation>
    );
  }
}
