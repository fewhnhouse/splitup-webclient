import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import WrappedLoginForm from "./LoginForm";

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
      }
    }
  }
`;

export default class LoginPopup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Mutation mutation={LOGIN}>
        {(mutate, { loading, err, data }) => (
          <WrappedLoginForm mutate={mutate} />
        )}
      </Mutation>
    );
  }
}
