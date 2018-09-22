import ExpenseFirstStep from "./ExpenseFirstStep";
import { connect } from "react-redux";
import {
  setAmount,
  setTitle,
  setDate,
  setDescription
} from "../../redux/actions";

const mapStateToProps = state => {
  const { title, description } = state.expenses;
  return {
    user: state.me,
    title,
    description
  };
};

const mapDispatchToProps = dispatch => ({
  setAmount: amount => dispatch(setAmount(amount)),
  setTitle: title => dispatch(setTitle(title)),
  setDate: date => dispatch(setDate(date)),
  setDescription: description => dispatch(setDescription(description))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseFirstStep);
