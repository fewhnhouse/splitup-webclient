import React from "react";
import { Modal, message } from "antd";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import ParticipantsSelect from "../utils/ParticipantsSelect";
import AddExpenseForm from "./AddExpenseForm";

const CReATE_EXPENSE = gql`
  mutation CreateExpense($input: CreateExpenseInput!) {
    createExpense(input: $input) {
      id
    }
  }
`;

const GROUPS_AND_FRIENDS = gql`
  query {
    groups {
      id
      title
      description
    }
    me {
      id
      friends {
        id
        name
        email
      }
    }
  }
`;

export default class AddExpense extends React.Component {
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
      <Mutation mutation={CReATE_EXPENSE}>
        {(createExpense, { data }) => (
          <Modal
            title={`Add Expense`}
            visible={visible}
            onOk={() => this._handleOk(createExpense)}
            onCancel={handleCancel}
          >
            <AddExpenseForm
              onChangeDescription={this._onChangeDescription}
              onChangeTitle={this._onChangeTitle}
              description={this.state.description}
              title={this.state.title}
            />
          </Modal>
        )}
      </Mutation>
    );
  }
}
