import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import SignupFormContainer from "./SignupFormContainer";
import LoginFormContainer from "./LoginFormContainer";
import { Button, Popover, Icon } from "antd";

const SIGNUP = gql`
  mutation Signup($email: String!, $name: String!, $password: String!) {
    signup(email: $email, name: $name, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

const Content = ({ mutation, Form, switchView }) => (
  <div style={{ width: "300px" }}>
    <Mutation mutation={mutation}>
      {(mutate, { client, loading, err, data }) => {
        return <Form mutate={mutate} client={client} switchView={switchView} />;
      }}
    </Mutation>
  </div>
);

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
        content={
          this.state.login ? (
            <Content
              mutation={LOGIN}
              switchView={this.switchView}
              Form={LoginFormContainer}
            />
          ) : (
            <Content
              mutation={SIGNUP}
              switchView={this.switchView}
              Form={SignupFormContainer}
            />
          )
        }
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
