import { connect } from "react-redux";
import { adminLogin, adminInit } from "../../../actions/auth";
import LoginForm from "./components/Login";

const mapStateToProps = (state, ownProps) => {
  return state.reducers.admin;
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    init: () => {
      dispatch(adminInit.request());
    },
    onLoginClick: ({ account, password }) => {
      dispatch(adminLogin.request(account, password));
    }
  };
};

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginForm);

module.exports = Login;
