import React from "react";
import { Modal, message, Steps, Button, Divider } from "antd";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import ParticipantsSelect from "../utils/ParticipantsSelect";
import ExpenseFirstStep from "./ExpenseFirstStep";
import ExpenseSecondStep from "./ExpenseSecondStep";
import ExpenseThirdStep from "./ExpenseThirdStep";

const { Step } = Steps;

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
    value: "",
    title: "",
    description: "",
    step: 0
  };

  _handleSearch = searchValue => {
    this.setState({
      searchValue
    });
  };
  _handleChange = value => {
    this.setState({
      value
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

  next = () => {
    this.setState(prevState => ({
      step: prevState.step < 2 ? prevState.step + 1 : prevState.step
    }));
  };

  prev = () => {
    this.setState(prevState => ({
      step: prevState.step > 0 ? prevState.step - 1 : prevState.step
    }));
  };

  render() {
    const { visible, handleCancel, user } = this.props;
    const steps = [
      {
        title: "First",
        content: (
          <ExpenseFirstStep
            onChangeDescription={this._onChangeDescription}
            onChangeTitle={this._onChangeTitle}
            handleChange={this._handleChange}
            groupValue={this.state.value}
            searchValue={this.state.searchValue}
            description={this.state.description}
            title={this.state.title}
          />
        )
      },
      {
        title: "Second",
        content: <ExpenseSecondStep />
      },
      {
        title: "Last",
        content: <ExpenseThirdStep />
      }
    ];
    return (
      <Mutation mutation={CReATE_EXPENSE}>
        {(createExpense, { data }) => (
          <Modal
            style={{ width: "60%" }}
            title={`Add Expense`}
            visible={visible}
            footer={[
              this.state.step > 0 ? (
                <Button key="back" onClick={this.prev}>
                  Back
                </Button>
              ) : null,
              this.state.step < 2 ? (
                <Button key="submit" type="primary" onClick={this.next}>
                  Next
                </Button>
              ) : (
                <Button key="submit" type="primary" onClick={this.next}>
                  Submit
                </Button>
              )
            ]}
          >
            <div style={{ height: "100%", overflowY: "scroll" }}>
              <Steps current={this.state.step} style={{ marginBottom: "10px" }}>
                {steps.map(item => (
                  <Step key={item.title} title={item.title} />
                ))}
              </Steps>
              <Divider type="horizontal" />
              <div className="steps-content">
                {steps[this.state.step].content}
              </div>
            </div>
          </Modal>
        )}
      </Mutation>
    );
  }
}
