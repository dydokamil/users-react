import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Row, Col } from "react-bootstrap";
import Radium, { StyleRoot } from "radium";
import { bounceInUp, bounceOutUp } from "react-animations";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entering: true,
      exiting: false,
      error: false
    };
  }

  styles = {
    bounceInUp: {
      animation: "x 1s",
      animationName: Radium.keyframes(bounceInUp, "bounceInUp")
    },
    bounceOutUp: {
      animation: "x 1s",
      animationName: Radium.keyframes(bounceOutUp, "bounceOutUp")
    }
  };

  handleToggle() {
    this.setState({
      entering: false,
      exiting: true
    });
    setTimeout(() => {
      this.setState({
        entering: false,
        exiting: false
      });
      this.props.onDeleteUser(this.props.user.id);
    }, 1000);
  }

  render() {
    const { show } = this.state;
    return (
      <StyleRoot>
        <div
          style={
            this.state.entering
              ? this.styles.bounceInUp
              : this.state.exiting ? this.styles.bounceOutUp : {}
          }
        >
          <Col
            style={{ marginBottom: "1rem" }}
            className="test"
            sm={4}
            md={3}
            lg={2}
          >
            <div
              className={`card ${this.state.currentClass}`}
              onClick={() => this.handleToggle()}
            >
              <div className="card-header">
                <img src={this.props.user.avatar} />
              </div>
              <div className="card-content">
                {this.props.user.first_name} {this.props.user.last_name}
              </div>
            </div>
          </Col>
        </div>
      </StyleRoot>
    );
  }
}

const mapStateToProps = state => {
  return { users_info: state.users_info };
};

const mapDispatchToProps = dispatch => {
  return {
    onDeleteUser: id => {
      dispatch({ type: "REMOVE_USER_REQUEST", payload: { id } });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
