import React from "react";
import { Modal, message, Steps, Button, Divider } from "antd";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import ExpenseFirstStep from "./ExpenseFirstStepContainer";
import ExpenseSecondStep from "./ExpenseSecondStepContainer";
import ExpenseThirdStep from "./ExpenseThirdStepContainer";

const { Step } = Steps;

const CREATE_LINKED_EXPENSE = gql`
  mutation CreateLinkedExpense($input: CreateLinkedExpenseInput!) {
    createLinkedExpense(input: $input) {
      id
    }
  }
`;

const CREATE_EXPENSE = gql`
  mutation CreateExpense($input: CreateExpenseInput!) {
    createExpense(input: $input) {
      id
    }
  }
`;

const NextButton = ({ next, nextTab }) =>
  next ? (
    <Button key="submit" type="primary" onClick={nextTab}>
      Next
    </Button>
  ) : (
    <Button disabled type="primary">
      Next
    </Button>
  );

export default class AddExpense extends React.Component {
  _handleOk = async createExpense => {
    const {
      handleOk,
      description,
      title,
      participants,
      standaloneParticipants,
      group,
      amount,
      resetExpense,
      isLinked
    } = this.props;
    handleOk();
    let input = {};
    if (isLinked) {
      input = {
        title,
        description,
        groupId: group.key,
        currency: "EURO",
        amount,
        participants: participants.map(val => val.key)
      };
    } else {
      input = {
        title,
        description,
        currency: "EURO",
        amount,
        participants: participants.map(val => val.key)
      };
    }

    const then = await createExpense({
      variables: {
        input
      }
    });
    if (then.error) {
      message.error("Something went wrong: ", then.error);
    } else {
      message.success(`Expense was successfully created.`);
    }

    resetExpense();
  };

  nextTab = () => {
    const { step, setStep } = this.props;
    setStep(step < 2 ? step + 1 : step);
  };

  prevTab = () => {
    const { step, setStep } = this.props;
    setStep(step > 0 ? step - 1 : step);
  };

  render() {
    const { visible, isNextEnabled, step, handleOk, isLinked } = this.props;

    const steps = [
      {
        title: "First",
        content: <ExpenseFirstStep />
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
      <Modal
        style={{ width: "60%" }}
        title={`Add Expense`}
        visible={visible}
        onCancel={handleOk}
        footer={[
          step > 0 ? (
            <Button key="back" onClick={this.prevTab}>
              Back
            </Button>
          ) : null,
          step < 2 ? (
            <NextButton next={isNextEnabled} nextTab={this.nextTab} />
          ) : (
            <Mutation
              mutation={isLinked ? CREATE_LINKED_EXPENSE : CREATE_EXPENSE}
            >
              {(createExpense, { data }) => (
                <Button
                  key="submit"
                  type="primary"
                  onClick={() => this._handleOk(createExpense)}
                >
                  Submit
                </Button>
              )}
            </Mutation>
          )
        ]}
      >
        <div style={{ height: "100%", overflowY: "scroll" }}>
          <Steps current={step} style={{ marginBottom: "10px" }}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <Divider type="horizontal" />
          <div className="steps-content">{steps[step ? step : 0].content}</div>
        </div>
      </Modal>
    );
  }
}
