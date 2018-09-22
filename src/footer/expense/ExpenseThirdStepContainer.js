import ExpenseThirdStep from "./ExpenseThirdStep";
import { connect } from "react-redux";
import {
  setParticipants,
  setStandaloneParticipants,
  setGroup,
  setSplits
} from "../../redux/actions";

const mapStateToProps = state => {
  const {
    splits,
    participants,
    standaloneParticipants,
    amount,
    group
  } = state.expenses;
  return {
    user: state.me,
    splits,
    participants,
    standaloneParticipants,
    amount,
    isLinked: group.key !== ""
  };
};

const mapDispatchToProps = dispatch => ({
  setSplits: splits => dispatch(setSplits(splits))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseThirdStep);
