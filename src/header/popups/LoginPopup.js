import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import WrappedLoginForm from "./LoginForm";
import { UserContext } from "../../UserContext";
import { Button, Popover } from "antd";

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

const Content = () => (
  <div style={{ width: "300px" }}>
    <Mutation mutation={LOGIN}>
      {(mutate, { loading, err, data }) => (
        <UserContext.Consumer>
          {value => (
            <WrappedLoginForm
              mutate={mutate}
              setLoginData={value.setLoginData}
            />
          )}
        </UserContext.Consumer>
      )}
    </Mutation>
  </div>
);

export default class LoginPopup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Popover
        placement="bottomRight"
        content={<Content />}
        title="Sign in"
        trigger="click"
      >
        <Button style={{ margin: "10px" }} type="default" icon="user" key="1">
          Sign in
        </Button>
      </Popover>
    );
  }
}
