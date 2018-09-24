import ExpenseSecondStep from "./ExpenseSecondStep";
import { connect } from "react-redux";
import { setParticipants, setGroup } from "../../redux/actions";

const mapStateToProps = state => {
  const { group, participants } = state.expenses;
  return {
    user: state.me,
    group,
    participants
  };
};

const mapDispatchToProps = dispatch => ({
  setParticipants: participants => dispatch(setParticipants(participants)),
  setGroup: date => dispatch(setGroup(date))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseSecondStep);
