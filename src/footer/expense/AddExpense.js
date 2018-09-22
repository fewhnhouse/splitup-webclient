import React from "react";
import { Modal, message, Steps, Button, Divider } from "antd";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import ExpenseFirstStep from "./ExpenseFirstStepContainer";
import ExpenseSecondStep from "./ExpenseSecondStepContainer";
import ExpenseThirdStep from "./ExpenseThirdStepContainer";

const { Step } = Steps;

const CREATE_EXPENSE = gql`
  mutation CreateExpense($input: CreateExpenseInput!) {
    createExpense(input: $input) {
      id
    }
  }
`;

const NextButton = ({ next, nextTab }) => {
  if (next) {
    console.log("enabled:", next);
  }
  /*return next ? (
    <Button key="submit" type="primary" onClick={nextTab}>
      Next
    </Button>
  ) : (
    <Button disabled type="primary">
      Next
    </Button>
  );
  */
  return (
    <Button type="primary" onClick={next}>
      Next
    </Button>
  );
};

export default class AddExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      next: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.amount !== this.props.amount ||
      prevProps.description !== this.props.description ||
      prevProps.title !== this.props.title ||
      prevProps.group !== this.props.group ||
      prevProps.participants !== this.props.participants ||
      prevProps.standaloneParticipants !== this.props.standaloneParticipants
    ) {
      const next = this.isNextEnabled();
      console.log(next);
      this.setState(
        {
          next
        },
        () => {
          console.log(this.state);
        }
      );
    }
  }

  /*_handleOk = async createExpense => {
    this.props.handleOk();
    const input = {
      title: this.props.title,
      description: this.props.description,
      participants: this.props.values.map(val => val.key)
    };
    const then = await createExpense({
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
  };*/

  nextTab = () => {
    this.setState(prevState => ({
      step: prevState.step < 2 ? prevState.step + 1 : prevState.step
    }));
  };

  prevTab = () => {
    this.setState(prevState => ({
      step: prevState.step > 0 ? prevState.step - 1 : prevState.step
    }));
  };

  isNextEnabled = () => {
    const {
      description,
      title,
      participants,
      standaloneParticipants,
      group,
      amount
    } = this.props;
    let result = false;
    switch (this.state.step) {
      case 0:
        result = description !== "" && title !== "" && amount !== "";
        break;
      case 1:
        if (!participants || !group) {
          result = false;
        } else {
          result =
            ((participants.length && group.key) ||
              standaloneParticipants.length) &&
            amount !== "";
        }
        break;
      default:
        result = false;
        break;
    }
    return result;
  };

  render() {
    const { visible } = this.props;
    console.log("render:", this.state.next);

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
        onCancel={this.props.handleOk}
        footer={[
          this.state.step > 0 ? (
            <Button key="back" onClick={this.prevTab}>
              Back
            </Button>
          ) : null,
          this.state.step < 2 ? (
            <NextButton next={this.state.next} nextTab={this.nextTab} />
          ) : (
            <Mutation mutation={CREATE_EXPENSE}>
              {(createExpense, { data }) => (
                <Button
                  key="submit"
                  type="primary"
                  onClick={() => /*this._handleOk(createExpense)*/ {}}
                >
                  Submit
                </Button>
              )}
            </Mutation>
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
          {this.state.next ? (
            <div>Next ENABLED!</div>
          ) : (
            <div>Next disabled.</div>
          )}
          <div className="steps-content">
            {steps[this.state.step ? this.state.step : 0].content}
          </div>
        </div>
      </Modal>
    );
  }
}
