import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Grid, Row, Button } from "react-bootstrap";
import { headShake, shake } from "react-animations";
import Radium, { StyleRoot } from "radium";

import User from "./components/user";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { idx: 1, error: false };
  }

  componentWillReceiveProps = newProps => {
    if (
      newProps.users_info &&
      newProps.users_info.error &&
      this.state.error === false
    ) {
      this.setState({ error: true });
      console.log("SETTING ERROR TO TRUE");
      setTimeout(() => {
        this.setState({ error: false });
        console.log("SETTING ERROR TO FALSE");
      }, 1000);
    }
  };

  styles = {
    headShake: {
      animation: "x 1s",
      animationName: Radium.keyframes(headShake, "headShake")
    }
  };

  render() {
    return (
      <Grid align="center">
        <div className="navbar">
          <StyleRoot>
            <div style={this.state.error ? this.styles.headShake : {}}>
              <Button
                className="button-fancy"
                onClick={() => {
                  this.props.onFetchUser(this.state.idx);
                  this.setState({ idx: this.state.idx + 1 });
                }}
                disabled={this.state.error}
              >
                Fetch next user
              </Button>
            </div>
          </StyleRoot>
        </div>
        <Row className="show-grid">
          {_.map(this.props.users_info.users, user => {
            return (
              <div className="test">
                <User user={user} />
              </div>
            );
          })}
        </Row>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return { users_info: state.users_info };
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchUser: id => {
      dispatch({ type: "FETCH_USER_REQUEST", payload: { id } });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
