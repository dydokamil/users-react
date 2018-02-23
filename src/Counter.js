import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Grid, Row, Button } from "react-bootstrap";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import User from "./components/user";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { idx: 1 };
  }
  render() {
    return (
      <Grid align="center">
        <div className="navbar">
          <Button
            className="button-fancy"
            onClick={() => {
              this.props.onFetchUser(this.state.idx);
              this.setState({ idx: this.state.idx + 1 });
            }}
          >
            Fetch next user
          </Button>
        </div>
        <div>
          <Row className="show-grid">
            {_.map(this.props.users_info.users, user => {
              return <User user={user} />;
            })}
          </Row>
        </div>
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
