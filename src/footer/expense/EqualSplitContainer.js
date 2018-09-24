import EqualSplit from "./EqualSplit";
import { connect } from "react-redux";
import { setSplits } from "../../redux/actions";

const mapStateToProps = state => {
  const { splits, participants, amount, group } = state.expenses;
  return {
    user: state.me,
    splits,
    participants: [
      { key: "123123123", label: "asdasd" },
      { key: "12312314", label: "def" }
    ],
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
)(EqualSplit);
