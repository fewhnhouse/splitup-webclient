import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

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

let input = "";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  onChangeMail = e => {
    this.setState({
      email: e.target.value
    });
  };

  onChangePassword = e => {
    this.setState({
      password: e.target.value
    });
  };

  render() {
    return (
      <Mutation mutation={LOGIN}>
        {(mutate, {loading, err, data}) => (
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
                mutate({
                  variables: {
                    email: this.state.email,
                    password: this.state.password
                  }
                }).then(
                  res => console.log("res:", res.data),
                  err => console.log(err)
                );
                /*this.setState({
                  email: "",
                  password: ""
                });*/
              }}
            >
              <input onChange={this.onChangeMail} value={this.state.email} />
              <input
                onChange={this.onChangePassword}
                value={this.state.password}
              />
              <button type="submit">Login</button>
            </form>
            {loading && <p>Loading...</p>}
            {err && <p>Error: {err}</p>}
            {data && <p>Done: {data.login.token}</p>}
          </div>
        )}
      </Mutation>
    );
  }
}
