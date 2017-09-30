import { connect } from "react-redux";
import Layout from "./Layout";
import { adminLogout, adminInit } from "../../actions/auth";

const mapStateToProps = (state, ownProps) => {
  return state.reducers.admin;
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    init: () => {
      dispatch(adminInit.request());
    },
    onLogoutClick: () => {
      dispatch(adminLogout());
    }
  };
};

const LayoutContainer = connect(mapStateToProps, mapDispatchToProps)(Layout);

module.exports = LayoutContainer;
