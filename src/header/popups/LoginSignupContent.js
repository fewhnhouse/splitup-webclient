import React from "react";
import { Mutation } from "react-apollo";
import SignupFormContainer from "./SignupFormContainer";
import LoginFormContainer from "./LoginFormContainer";
import gql from "graphql-tag";
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

const LoginSignupContent = ({ switchView, login, style }) => (
  <div style={style}>
    <Mutation mutation={login ? LOGIN : SIGNUP}>
      {(mutate, { client, loading, err, data }) => {
        return login ? (
          <LoginFormContainer
            mutate={mutate}
            client={client}
            switchView={switchView}
          />
        ) : (
          <SignupFormContainer
            mutate={mutate}
            client={client}
            switchView={switchView}
          />
        );
      }}
    </Mutation>
  </div>
);

export default LoginSignupContent;
