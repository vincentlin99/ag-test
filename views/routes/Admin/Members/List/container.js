import { connect } from "react-redux";
import List from "./components/List";
import { memberGet, memberCreate } from "../../../../actions/member";

const mapStateToProps = (state, ownProps) => {
  return {
    admin: state.reducers.admin,
    data: state.reducers.member
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    list: q => dispatch(memberGet.request(q)),
    create: data => dispatch(memberCreate.request(data))
  };
};

const ListPage = connect(mapStateToProps, mapDispatchToProps)(List);

module.exports = ListPage;
