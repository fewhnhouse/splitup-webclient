import MainComponent from "./MainComponent";
import { connect } from "react-redux";
import { addMe } from "./redux/actions";


const mapStateToProps = (state, props) => {
  return {
    user: state.me
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    addMe(id, name, email, token) {
      dispatch(addMe(id, name, email, token));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainComponent);
