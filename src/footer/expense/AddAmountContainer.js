import AddAmount from "./AddAmount";
import { connect } from "react-redux";
import { setAmount } from "../../redux/actions";

const mapStateToProps = (state, props) => {
  return {
    user: state.me,
    amount: state.expenses.amount
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    setAmount(amount) {
      dispatch(setAmount(amount));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddAmount);
