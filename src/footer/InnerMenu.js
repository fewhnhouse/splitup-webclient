import React from "react";
import { Card, Button } from "antd";
import AddFriend from "./AddFriend";
import AddGroup from "./AddGroup";
import CreateGroup from "./GroupModal";
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

  handleCancel = e => {
    this.setState({
      visible: false
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
          <div>
            <Button
              icon="plus"
              onClick={this.showModal}
              type="primary"
            >{`Add ${type}`}</Button>
            {type === "Friends" ? (
              <AddFriend
                visible={this.state.visible}
                handleCancel={this.handleCancel}
                handleOk={this.handleOk}
                type={type}
              />
            ) : (
              <AddGroup
                visible={this.state.visible}
                handleCancel={this.handleCancel}
                handleOk={this.handleOk}
                type={type}
              />
            )}
          </div>
        )}
      </Container>
    );
  }
}

const StyledInnerMenu = styled(Card)`
  height: 200px;
  overflow-y: scroll;
`;

const Container = styled.div`
  display: ${props => (props.opened ? "" : "none")};
`;

export default InnerMenu;
