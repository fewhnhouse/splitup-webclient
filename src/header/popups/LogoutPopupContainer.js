import LogoutPopupComponent from "./LogoutPopupComponent";
import { connect } from "react-redux";
import { resetMe } from "../../redux/actions";

const mapStateToProps = (state, props) => {
  return {
    user: state.me
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    resetMe() {
      dispatch(resetMe());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogoutPopupComponent);
