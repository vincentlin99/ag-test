import React, { PropTypes } from "react";
import {
  Container,
  Row,
  Col,
  Input,
  InputGroupButton,
  InputGroup
} from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

class List extends React.Component {
  constructor(props) {
    super(props);

    // this.props.list();
    const name = "";
    const data = [];
    this.state = {
      data,
      name
    };
    this.onCreate = this.onCreate.bind(this);
  }

  componentDidMount() {
    this.props.list();
  }

  componentWillReceiveProps(nextProps) {
    const { data, created } = nextProps.data;
    if (Array.isArray(data) === true) {
      this.setState({ data });
    }
    if (created) {
      this.props.list();
    }
  }

  onCreate() {
    const data = {
      name: this.state.name
    };
    this.props.create({ data });
  }

  render() {
    return (
      <Container>
        <Row>
          <InputGroup>
            <Input
              className="input"
              type="text"
              ref="name"
              defaultValue={""}
              onChange={event => this.setState({ name: event.target.value })}
              placeholder="(please enter name)"
            />
            <InputGroupButton
              color="warning"
              className="btn"
              onClick={this.onCreate}
            >
              ADD
            </InputGroupButton>
          </InputGroup>
        </Row>
        <Row>
          <Col md={12}>
            <BootstrapTable className="table" data={this.state.data}>
              <TableHeaderColumn isKey width="150" dataField={"ID"}>
                ID
              </TableHeaderColumn>
              <TableHeaderColumn width="150" dataField={"name"}>
                name
              </TableHeaderColumn>
            </BootstrapTable>
          </Col>
        </Row>
      </Container>
    );
  }
}

List.propTypes = {};

export default List;
