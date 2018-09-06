import { Layout, Breadcrumb, Button, Divider, Popover } from "antd";
import React from "react";
import styled from "styled-components";
import FooterMenu from "./footer/FooterMenu";
import Dashboard from "./pages/Dashboard";
import TopBar from "./header/TopBar";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { UserProvider } from "./UserContext";
const { Footer, Header } = Layout;

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

const Group = ({ match }) => (
  <div>
    <h3>Group {match.params.groupId}</h3>
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
              <Route path="/groups" component={Groups} />

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
