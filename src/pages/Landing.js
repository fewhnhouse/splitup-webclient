import React from "react";
import "./landing.css";
import styled from "styled-components";
import LoginSignupContent from "../header/popups/LoginSignupContent";
import withScroll from "../utils/withScroll";

class Dashboard extends React.Component {
  state = {
    login: true
  };

  switchView = () => {
    this.setState(prevState => {
      return { login: !prevState.login };
    });
  };

  render() {
    const { scrollPosition } = this.props;
    return (
      <div>
        <header />
        <LoginCard>
          <TitleContainer>
            <Title>Splitup</Title>
            <SubTitle>Share your expenses</SubTitle>
          </TitleContainer>
          <LoginSignupContent
            login={this.state.login}
            switchView={this.switchView}
            style={{ padding: "5px", width: "280px", margin: "auto" }}
          />
        </LoginCard>
        <StyledContent scroll={scrollPosition} />
      </div>
    );
  }
}

const StyledContent = styled.div`
  &:before {
    background: #1890ff;
    content: "";
    height: 40rem;
    left: -5%;
    position: absolute;
    right: -5%;
    transform-origin: 0 0;
    transform: ${props =>
      `rotateZ(-${props.scroll > 200 ? 0 : (200 - props.scroll) / 50.0}deg)`};
    box-shadow: 2px 0px 8px darkslategray;
    z-index: 0;
  }
`;

const Title = styled.h1`
  color: white;
  letter-spacing: 3px;
  padding: 10px;
`;

const TitleContainer = styled.div`
  background: #1890ff;
  border-radius: 8px 8px 0px 0px;
`;

const SubTitle = styled.h3`
  color: white;
  text-transform: uppercase;
  padding: 10px;
`;

const LoginCard = styled.div`
  position: fixed;
  left: 100px;
  top: 100px;
  border-radius: 8px;
  box-shadow: 2px 2px 4px darkslategray;
  width: 300px;
  background: #fff;
`;
export default withScroll(Dashboard);
