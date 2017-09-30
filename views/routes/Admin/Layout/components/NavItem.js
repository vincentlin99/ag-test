import React, { PropTypes } from 'react'
import { Row, Col } from 'reactstrap'
import { browserHistory } from 'react-router'

class NavItem extends React.Component {
  constructor(props) {
    super(props)

    this.handleItemClick = this.handleItemClick.bind(this)
  }

  handleItemClick() {
    browserHistory.push(`/admin${this.props.href}`)
  }

  render() {
    return (
      <Row className="item">
        <Col onClick={this.handleItemClick} >
          { this.props.text }
        </Col>
      </Row>
    )
  }
}

NavItem.propTypes = {
  text: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
}

export default NavItem
