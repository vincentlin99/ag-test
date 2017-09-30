import React, { PropTypes } from "react";
import { browserHistory } from "react-router";
import { Row, Col, Form, FormGroup, Input, Button, Alert } from "reactstrap";
import config from "../../../../../config";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let adminToken = localStorage.getItem("ADMIN_TOKEN");
    if (adminToken) {
      if (this.props.logined === true) {
        browserHistory.push("/admin/member");
      } else {
        this.props.init();
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.logined === true) {
      browserHistory.push("/admin/member");
    }

    if (nextProps.status === "ERROR") {
      alert(nextProps.error);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { account, password } = this.refs;
    const args = {
      account: account.value,
      password: password.value
    };
    this.props.onLoginClick(args);
  }

  render() {
    return (
      <Row style={{ height: window.innerHeight }}>
        <Col
          style={{ "margin-top": window.innerHeight / 3 - 100 }}
          className="align-middle"
          sm="12"
          md={{ size: 4, offset: 4 }}
        >
          <Row>
            <Col className="text-center">
              <h3 />
            </Col>
          </Row>
          <Row>
            <Col className="text-center">
              <h3>member platform</h3>
            </Col>
          </Row>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Input
                getRef={input => (this.refs.account = input)}
                type="text"
                placeholder="帳號"
              />
            </FormGroup>
            <FormGroup>
              <Input
                getRef={input => (this.refs.password = input)}
                type="password"
                placeholder="密碼"
              />
            </FormGroup>
            <FormGroup>
              <Button block>login</Button>
            </FormGroup>
            {this.props.status === "ERROR" ? (
              <Alert color="danger">login fail</Alert>
            ) : (
              ""
            )}
          </Form>
        </Col>
      </Row>
    );
  }
}

Login.propTypes = {
  onLoginClick: PropTypes.func.isRequired
};

export default Login;
