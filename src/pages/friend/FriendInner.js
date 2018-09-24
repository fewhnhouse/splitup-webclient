import React from "react";
import { Button, List } from "antd";
import styled from "styled-components";

const FriendInner = ({ onClickMember, onClickSettle, onClickExpense }) => (
  <OuterContainer>
    <Button onClick={onClickMember} style={{ marginRight: "24px" }} type="primary" icon="usergroup-add" ghost>
      Add Friend to Group
    </Button>
    <Button onClick={onClickExpense} style={{ marginRight: "24px" }} type="primary" icon="shopping" ghost>
      Add Expense
    </Button>
    <Button onClick={onClickSettle} style={{ marginRight: "24px" }} type="danger" icon="money-collect" ghost>
      Settle Debts
    </Button>
  </OuterContainer>
);

const OuterContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 24px;
`;

export default FriendInner;
