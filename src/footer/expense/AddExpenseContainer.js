import AddExpense from "./AddExpense";
import { connect } from "react-redux";
import { setStep } from "../../redux/actions";

const mapStateToProps = (state, props) => {
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
    step
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    setStep(step) {
      dispatch(setStep(step));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddExpense);
