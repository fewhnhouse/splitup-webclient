import React from "react";
import { Modal } from "antd";
import ParticipantsSelect from "../../utils/ParticipantsSelect";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const EDIT_GROUP = gql`
  mutation AddGroupParticipants($input: AddGroupParticipantsInput!) {
    addGroupParticipants(input: $input) {
      participants {
        name
      }
    }
  }
`;

export default class AddMemberModal extends React.Component {
  state = {
    values: [],
    searchValue: ""
  };

  _handleChange = values => {
    this.setState({ values });
  };

  _handleSearch = searchValue => {
    this.setState({ searchValue });
  };

  _handleOk = editGroup => {
    const participants = this.state.values.map(val => val.key);
    const input = {
      groupId: this.props.groupId,
      participants
    };
    console.log(input);
    editGroup({ variables: {input} });
    this.props.handleOk();
  };

  _handleCancel = () => {};
  render() {
    console.log(this.props.groupId);
    return (
      <Mutation mutation={EDIT_GROUP}>
        {(editGroup, { data }) => (
          <Modal
            visible={this.props.visible}
            title="Add member"
            onOk={() => this._handleOk(editGroup)}
            onCancel={this.props.handleCancel}
          >
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
