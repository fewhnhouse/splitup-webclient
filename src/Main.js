import { Layout } from "antd";
import React from "react";
import styled from "styled-components";
import FooterMenu from "./footer/FooterMenu";
import Dashboard from "./pages/Dashboard";
import Group from './pages/Group';
import TopBar from "./header/TopBar";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { UserProvider } from "./utils/UserContext";

const { Footer, Header } = Layout;

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

const Login = () => (
  <div>
    <h2>Please login.</h2>
  </div>
);


const Groups = ({ match }) => (
  <div>
    <Route path={`${match.path}/:groupId`} component={Group} />
    <Route
      exact
      path={match.path}
      render={() => (
        <div>
          <h3>Please select a group.</h3>
          <ul>
            <li>
              <Link to={`${match.url}/1`}>Group 1</Link>
            </li>
            <li>
              <Link to={`${match.url}/2`}>Group 2</Link>
            </li>
            <li>
              <Link to={`${match.url}/3`}>Group 3</Link>
            </li>
          </ul>
        </div>
      )}
    />
  </div>
);

const PrivateRoute = ({ component: Component, loggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      loggedIn ? (
        <Component {...props} />
      ) : (
        /*<Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
        */
       null
      )
    }
  />
);

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      loggedIn: false
    };
  }

  onMouseEnter = () => {
    this.setState({ opened: true });
  };

  onMouseLeave = () => {
    this.setState({ opened: false });
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token !== "") {
      console.log(token);
      this.setState({
        loggedIn: true
      });
    }
  }

  render() {
    return (
      <Router>
        <UserProvider>
          <Layout>
            <Header style={{ padding: 0 }}>
              <TopBar />
            </Header>
            <Layout>
              <Route exact path="/" component={Dashboard} />
              <Route path="/about" component={About} />
              <Route path="/login" component={Login} />
              <PrivateRoute
                path="/groups"
                loggedIn={this.state.loggedIn}
                component={Groups}
              />
              <PrivateRoute
                path="/friends"
                loggedIn={this.state.loggedIn}
                component={About}
              />

              {this.state.loggedIn ? <div /> : <div>logged out.</div>}
            </Layout>
            <StyledFooter
              onMouseEnter={this.onMouseEnter}
              onMouseLeave={this.onMouseLeave}
            >
              {this.state.loggedIn ? (
                <FooterMenu opened={this.state.opened} />
              ) : null}
            </StyledFooter>
          </Layout>
        </UserProvider>
      </Router>
    );
  }
}

const StyledFooter = styled(Footer)`
  position: fixed;
  z-index: 1;
  width: 100%;
  bottom: 0;
  padding: 0px;
  margin: 0px;
  border-top: 2px solid #1890ff;
  box-shadow: 2px 0px 8px lightgray;
`;

export default Main;
