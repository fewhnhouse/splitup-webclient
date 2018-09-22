import ExpenseThirdStep from "./ExpenseThirdStep";
import { connect } from "react-redux";
import {
  setParticipants,
  setStandaloneParticipants,
  setGroup,
  setSplits
} from "../../redux/actions";

const mapStateToProps = (state, props) => {
  const { splits, participants, standaloneParticipants, amount } = state.expenses;
  return {
    user: state.me,
    splits,
    participants,
    standaloneParticipants,
    amount
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    setSplits(splits) {
      dispatch(setSplits(splits));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseThirdStep);
