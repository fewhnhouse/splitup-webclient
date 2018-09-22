import AddExpense from "./AddExpense";
import { connect } from "react-redux";
import { setStep, resetExpense } from "../../redux/actions";

const isNextEnabled = expenses => {
  const {
    step,
    participants,
    standaloneParticipants,
    group,
    description,
    title,
    amount
  } = expenses;
  let result = false;
  switch (step) {
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
  console.log(result);
  return result;
};

const mapStateToProps = state => {
  const {
    title,
    description,
    amount,
    group,
    participants,
    standaloneParticipants,
    date,
    splits,
    step
  } = state.expenses;

  return {
    user: state.me,
    title,
    description,
    amount,
    group,
    participants,
    standaloneParticipants,
    date,
    splits,
    step,
    isNextEnabled: isNextEnabled(state.expenses)
  };
};

const mapDispatchToProps = dispatch => ({
  setStep: step => dispatch(setStep(step)),
  resetExpense: () => dispatch(resetExpense())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddExpense);
