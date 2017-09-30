import React, { PropTypes } from "react";
import { Container, Row, Col } from "reactstrap";
import "bootstrap/scss/bootstrap.scss";
import "../scss/style.scss";
import Sidebar from "./components/Sidebar";

class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {}

  render() {
    if (this.props.logined === true) {
      return (
        <Container fluid={true}>
          <Row>
            <div className="sidebar">
              <Sidebar
                user={this.props.name}
                init={this.props.init}
                onLogoutClick={() => {
                  this.props.onLogoutClick();
                }}
              />
            </div>
            <div className="submenu">
              <Row className="content content_main">{this.props.children}</Row>
            </div>
          </Row>
        </Container>
      );
    }
    return <Container className="login_wrap">{this.props.children}</Container>;
  }
}

Layout.propTypes = {
  children: PropTypes.object.isRequired,
  logined: PropTypes.bool.isRequired
};

export default Layout;
