import React from "react";
import { Card, Button } from "antd";
import AddModal from "./AddModal";
import AddFriend from "./UserSelect";
import CreateGroup from "./CreateGroup";
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
              onClick={this.showModal}
              type="primary"
            >{`Add ${type}`}</Button>
            <AddModal
              visible={this.state.visible}
              handleCancel={this.handleCancel}
              handleOk={this.handleOk}
              type={type}
              placeholder=""
            >
              {type === "Friends" ? <AddFriend /> : <CreateGroup />}
            </AddModal>
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
