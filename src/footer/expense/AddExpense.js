import React from "react";
import { Modal, message, Steps, Button, Divider } from "antd";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import ParticipantsSelect from "../../utils/ParticipantsSelect";
import ExpenseFirstStep from "./ExpenseFirstStep";
import ExpenseSecondStep from "./ExpenseSecondStep";
import ExpenseThirdStep from "./ExpenseThirdStep";

const { Step } = Steps;

const CREATE_EXPENSE = gql`
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
    amount: "",
    searchValue: "",
    value: "",
    title: "",
    description: "",
    step: 0,
    searchGroup: "",
    group: { key: "", label: "" },
    searchParticipants: "",
    participants: [],
    standaloneParticipants: [],
    standaloneSearchParticipants: ""
  };

  _handleAmountChange = amount => {
    this.setState({
      amount
    });
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

  handleGroupChange = group => {
    this.setState({
      group,
      participants: [],
      searchParticipants: ""
    });
  };

  handleParticipantsChange = participants => {
    this.setState({
      participants
    });
  };

  handleGroupSearch = searchGroup => {
    this.setState({
      searchGroup
    });
  };

  handleParticipantsSearch = searchParticipants => {
    this.setState({
      searchParticipants
    });
  };

  handleStandaloneParticipantsSearch = standaloneSearchParticipants => {
    this.setState({
      standaloneSearchParticipants
    });
  };

  handleStandaloneParticipantsChange = standaloneParticipants => {
    this.setState({ standaloneParticipants });
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

  submit = () => {
    console.log("submit");
  }

  isNextEnabled = () => {
    const {
      step,
      description,
      title,
      participants,
      standaloneParticipants,
      group,
      amount
    } = this.state;
    let test = false;
    switch (step) {
      case 0:
        test = description && title && amount;
        break;
      case 1:
        test =
          ((participants.length && group.key) || standaloneParticipants.length) && amount;
        break;
      default:
        break;
    }
    return test;
  };

  render() {
    const { visible, handleCancel, user } = this.props;

    const steps = [
      {
        title: "First",
        content: (
          <ExpenseFirstStep
            amount={this.state.amount}
            handleAmountChange={this._handleAmountChange}
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
        content: (
          <ExpenseSecondStep
            amount={this.state.amount}
            handleAmountChange={this._handleAmountChange}
            handleGroupChange={this.handleGroupChange}
            handleGroupSearch={this.handleGroupSearch}
            group={this.state.group}
            searchGroup={this.state.searchGroup}
            participants={this.state.participants}
            searchParticipants={this.state.searchParticipants}
            handleParticipantsChange={this.handleParticipantsChange}
            handleParticipantsSearch={this.handleParticipantsSearch}
            handleStandaloneParticipantsChange={
              this.handleStandaloneParticipantsChange
            }
            handleStandaloneParticipantsSearch={
              this.handleStandaloneParticipantsSearch
            }
            standaloneParticipants={this.state.standaloneParticipants}
            standaloneSearchParticipants={
              this.state.standaloneSearchParticipants
            }
          />
        )
      },
      {
        title: "Last",
        content: (
          <ExpenseThirdStep
            amount={this.state.amount}
            handleAmountChange={this._handleAmountChange}
            participants={this.state.participants}
            amount={this.state.amount}
          />
        )
      }
    ];
    return (
      <Mutation mutation={CREATE_EXPENSE}>
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
                this.isNextEnabled() ? (
                  <Button
                    key="submit"
                    type="primary"
                    disabled={this.isNextDisabled}
                    onClick={this.next}
                  >
                    Next
                  </Button>
                ) : (
                  <Button disabled type="primary">
                    Next
                  </Button>
                )
              ) : (
                <Button key="submit" type="primary" onClick={this.submit}>
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
