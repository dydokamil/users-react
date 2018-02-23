import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Row, Col } from "react-bootstrap";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = { currentClass: "slide-from-bottom" };
  }

  componentWillUnmount(foo) {
    // const main_ref = this.refs.main_div;
    // console.log(main_ref);
    this.setState({ currentClass: "slide-to-bottom" });
    console.log("Unmounting...");
  }

  render() {
    return (
      <Col sm={4} md={3} lg={2} style={{ marginBottom: "1rem" }}>
        <div
          ref="main_div"
          className={`card ${this.state.currentClass}`}
          onClick={() => this.props.onDeleteUser(this.props.user.id)}
        >
          <div className="card-header">
            <img src={this.props.user.avatar} />
          </div>
          <div className="card-content">
            {this.props.user.first_name} {this.props.user.last_name}
          </div>
        </div>
      </Col>
    );
  }
}

const mapStateToProps = state => {
  return { users: state.users_info };
};

const mapDispatchToProps = dispatch => {
  return {
    onDeleteUser: id => {
      dispatch({ type: "REMOVE_USER_REQUEST", payload: { id } });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
