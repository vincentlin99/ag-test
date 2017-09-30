import React, { PropTypes } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import NavItem from "./NavItem";
import config from "../../../../../config";

const Navs = require("./Sidebar.json");

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.onLogoutClick();
  }

  render() {
    const sideBar = Navs.map(nav => (
      <Row>
        <Col md={12}>
          <Row className="root">{nav.name}</Row>
          {nav.pages.map(page => <NavItem text={page.name} href={page.href} />)}
        </Col>
      </Row>
    ));

    return (
      <Container>
        <div className="head">
          <Row>
            <Col md={12} className="text-center">
              <h4 className="title">ag-test</h4>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="text-center">
              {"admin："}
              <strong>{this.props.user}</strong>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="text-center">
              <Button onClick={this.handleLogout}>logout</Button>
            </Col>
          </Row>
        </div>
        <div className="nav_wrap">{sideBar}</div>
      </Container>
    );
  }
}

Sidebar.propTypes = {
  user: PropTypes.string.isRequired,
  onLogoutClick: PropTypes.func.isRequired
};

export default Sidebar;
