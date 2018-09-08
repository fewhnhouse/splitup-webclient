import React from "react";

const name = localStorage.getItem("username");
const email = localStorage.getItem("email");
const UserContext = React.createContext();

class UserProvider extends React.Component {
  state = {
    email: email !== null ? email : "",
    name: name !== null ? name : "",
    setLoginData: (name, email) => {
      this.setState({ email, name });
    }
  };

  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export { UserContext, UserProvider };
