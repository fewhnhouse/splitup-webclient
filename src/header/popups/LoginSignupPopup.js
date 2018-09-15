import React, { Component } from "react";
import LoginSignupContent from "./LoginSignupContent";
import { Button, Popover, Icon } from "antd";

const Title = ({ login }) => (
  <div style={{ padding: "5px 16px 4px" }}>
    <h3 style={{ color: "white" }}>
      <Icon type="lock" style={{ marginRight: "5px" }} />
      {login ? "Sign In" : "Sign Up"}
    </h3>
  </div>
);

export default class LoginPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true
    };
  }

  switchView = () => {
    this.setState(prevState => {
      return { login: !prevState.login };
    });
  };

  render() {
    return (
      <Popover
        placement="bottomRight"
        overlayClassName="auth-popup"
        content={<LoginSignupContent switchView={this.switchView} style={{width: "300px"}} />}
        title={<Title login={this.state.login} />}
        trigger="click"
      >
        <Button style={{ margin: "10px" }} type="default" icon="user" key="1">
          {this.state.login ? "Sign in" : "Sign up"}
        </Button>
      </Popover>
    );
  }
}
