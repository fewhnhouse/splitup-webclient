import { Layout } from "antd";
import React from "react";
import styled from "styled-components";
import FooterMenu from "./footer/FooterMenu";
import Landing from "./pages/Landing";
import Group from "./pages/group/Group";
import Friend from './pages/friend/FriendContainer';
import TopBarContainer from "./header/TopBarContainer";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";

const { Footer, Header } = Layout;

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

const Dashboard = () => (
  <div>
    <h2>Dashboard</h2>
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


const Friends = ({ match }) => (
  <div>
    <Route path={`${match.path}/:friendId`} component={Friend} />
    <Route
      exact
      path={match.path}
      render={() => (
        <div>
          <h3>Please select a friend.</h3>
          <ul>
            <li>
              <Link to={`${match.url}/1`}>Friend 1</Link>
            </li>
            <li>
              <Link to={`${match.url}/2`}>Friend 2</Link>
            </li>
            <li>
              <Link to={`${match.url}/3`}>Friend 3</Link>
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
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const PublicOnlyRoute = ({ component: Component, loggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !loggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/dashboard",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false
    };
  }

  onMouseEnter = () => {
    this.setState({ opened: true });
  };

  onMouseLeave = () => {
    this.setState({ opened: false });
  };

  async componentDidMount() {
    const token = await localStorage.getItem("token");
    const name = await localStorage.getItem("name");
    const email = await localStorage.getItem("email");
    const id = await localStorage.getItem("id");
    if (token !== "" && token !== null && token !== undefined) {
      this.props.addMe(id, name, email, token);
    }
  }

  render() {
    const loggedIn =
      this.props.user.name !== undefined && this.props.user.name !== "";
    return (
      <Router>
        <Layout>
          {loggedIn ? (
            <Header className="page-header" style={{ padding: 0 }}>
              <TopBarContainer />
            </Header>
          ) : null}

          <Layout
            onScroll={(detail, view) => {
              console.log("scroll: ", detail);
            }}
          >
            <PublicOnlyRoute
              loggedIn={loggedIn}
              exact
              path="/"
              component={Landing}
            />
            <Route path="/about" component={About} />
            <Route path="/login" component={Login} />
            <PrivateRoute
              path="/groups"
              loggedIn={loggedIn}
              component={Groups}
            />
            <PrivateRoute
              path="/friends"
              loggedIn={loggedIn}
              component={Friends}
            />
            <PrivateRoute
              path="/dashboard"
              loggedIn={loggedIn}
              component={Dashboard}
            />
          </Layout>
          {loggedIn ? (
            <StyledFooter
              onMouseEnter={this.onMouseEnter}
              onMouseLeave={this.onMouseLeave}
              opened={this.state.opened}
            >
              <FooterMenu opened={this.state.opened} />}
            </StyledFooter>
          ) : (
            <div style={{ height: "200px" }} />
          )}
        </Layout>
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

  &:before {
    background: #1890ff;
    content: "";
    height: 40rem;
    left: -5%;
    position: absolute;
    right: -5%;
    transform-origin: 0 0;
    transform: ${props => (props.opened ? "" : "rotateZ(-4deg)")};
    transition: 0.2s transform ease-in-out;
    box-shadow: 2px 0px 8px lightgray;
    z-index: 0;
  }
`;

export default Main;
