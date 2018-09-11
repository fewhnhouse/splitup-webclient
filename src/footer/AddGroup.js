import React from "react";
import { Modal, message } from "antd";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import ParticipantsSelect from "./ParticipantsSelect";

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
export default class AddGroup extends React.Component {
  state = {
    searchValue: "",
    names: [],
    ids: []
  };

  _handleSearch = searchValue => {
    this.setState({
      searchValue
    });
  };
  _handleChange = (selectedIds, data) => {
    console.log(selectedIds);
    const filteredData = data.filter(
      d => selectedIds.includes(d.id) || selectedIds.includes(d.name)
    );
    console.log(filteredData);
    const names = filteredData.map(d => d.name);
    const ids = filteredData.map(d => d.id);

    this.setState({
      names,
      ids
    });
  };

  _handleOk = async createGroup => {
    this.props.handleOk();
    createGroup({ variables: { id: this.state.id } }).then(
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
      <Mutation mutation={CREATE_GROUP}>
        {(createGroup, { data }) => (
          <Modal
            title={`Add Group`}
            visible={visible}
            onOk={() => this._handleOk(createGroup)}
            onCancel={handleCancel}
          >
            <ParticipantsSelect
              handleChange={this._handleChange}
              handleSearch={this._handleSearch}
              values={this.state.names}
              searchValue={this.state.searchValue}
            />
          </Modal>
        )}
      </Mutation>
    );
  }
}
