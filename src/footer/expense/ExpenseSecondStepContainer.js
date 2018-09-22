import ExpenseSecondStep from "./ExpenseSecondStep";
import { connect } from "react-redux";
import {
  setParticipants,
  setStandaloneParticipants,
  setGroup
} from "../../redux/actions";

const mapStateToProps = state => {
  const { group, participants, standaloneParticipants } = state.expenses;
  return {
    user: state.me,
    group,
    participants,
    standaloneParticipants
  };
};

const mapDispatchToProps = dispatch => ({
  setParticipants: participants => dispatch(setParticipants(participants)),
  setStandaloneParticipants: title =>
    dispatch(setStandaloneParticipants(title)),
  setGroup: date => dispatch(setGroup(date))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseSecondStep);
