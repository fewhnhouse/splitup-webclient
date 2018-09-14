import React from "react";
import { Card, Button } from "antd";
import AddFriend from "./AddFriendModalContainer";
import AddGroup from "./AddGroupModalContainer";
import styled from "styled-components";

class InnerMenu extends React.Component {
  state = {
    visible: false
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { opened, children, type } = this.props;
    return (
      <Container opened={opened}>
        <StyledInnerMenu>{children}</StyledInnerMenu>
        {type === "Dashboard" ? null : (
          <ButtonContainer>
            <Button
              icon="plus"
              onClick={this.showModal}
              type="primary"
            >{`Add ${type}`}</Button>
            {type === "Friends" ? (
              <AddFriend
                visible={this.state.visible}
                handleCancel={this.handleOk}
                handleOk={this.handleOk}
                type={type}
              />
            ) : (
              <AddGroup
                visible={this.state.visible}
                handleCancel={this.handleOk}
                handleOk={this.handleOk}
                type={type}
              />
            )}
          </ButtonContainer>
        )}
      </Container>
    );
  }
}

const ButtonContainer = styled.div`
  background: none;
  min-height: 64px;
  box-shadow: 0 -5px 5px -5px #333;
  z-index: 10;
  margin: auto;
  padding: 0;
  bottom: 10px;
`;

const StyledInnerMenu = styled.div`
  height: 200px;
  padding: 0px 10px;
  overflow-y: scroll;
`;

const Container = styled.div`
  display: ${props => (props.opened ? "" : "none")};
`;

export default InnerMenu;
