import React from "react";
import { Modal, message } from "antd";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import ParticipantsSelect from "../../utils/ParticipantsSelect";
import AddGroupForm from "./AddGroupForm";

const CREATE_GROUP = gql`
  mutation CreateGroup($input: CreateGroupInput!) {
    createGroup(input: $input) {
      id
      title
      description
    }
  }
`;

const GROUPS = gql`
  query {
    groups {
      id
      title
      description
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
    const { visible, handleCancel, user } = this.props;
    return (
      <Mutation
        mutation={CREATE_GROUP}
        update={(cache, { data: { createGroup } }) => {
          const { groups } = cache.readQuery({ query: GROUPS });
          cache.writeQuery({
            query: GROUPS,
            data: { groups: groups.concat([createGroup]) }
          });
        }}
      >
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
              skip={[user.id]}
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
