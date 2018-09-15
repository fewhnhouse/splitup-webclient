import React from "react";
import { Card, Button, AutoComplete, Input, Icon } from "antd";
import AddFriend from "./AddFriendModalContainer";
import AddGroup from "./AddGroupModalContainer";
import styled from "styled-components";

const dataSource = ["Burns Bay Road", "Downing Street", "Wall Street"];

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
        <Header>
          <AutoComplete
            style={{ width: "100%", position: "relative", top: "-20px" }}
            dataSource={dataSource}
            placeholder="Type to filter groups"
            filterOption={(inputValue, option) =>
              option.props.children
                .toUpperCase()
                .indexOf(inputValue.toUpperCase()) !== -1
            }
          >
            <Input
              suffix={
                <Icon type="search" className="custom-autocomplete-input" />
              }
            />
          </AutoComplete>
        </Header>
        <StyledInnerMenu>{children}</StyledInnerMenu>
        {type === "Dashboard" ? null : (
          <Footer>
            <Button
              icon="plus"
              style={{ width: "100%", position: "relative", bottom: "5px" }}
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
          </Footer>
        )}
      </Container>
    );
  }
}

const Footer = styled.div`
  height: 15%;
  width: 100%;
`;

const Header = styled.div`
  height: 15%;
`;

const StyledInnerMenu = styled.div`
  padding: 0px 0px;
  height: 70%;
  overflow-y: scroll;
`;

const Container = styled.div`
  display: ${props => (props.opened ? "" : "none")};
  background: white;
  padding: 14px;
  border-radius: 4px;
  height: 80%;
`;

export default InnerMenu;
