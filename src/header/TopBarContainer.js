import TopBarComponent from "./TopBarComponent";
import { connect } from "react-redux";

const mapStateToProps = (state, props) => {
  return {
    user: state.me
  };
};

export default connect(mapStateToProps)(TopBarComponent);
