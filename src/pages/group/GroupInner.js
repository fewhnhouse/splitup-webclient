import React from "react";
import { Button, List, Divider, Input } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Members from "./Members";

const Item = List.Item;

const GroupInner = ({ onClickMember, onClickSettle, onClickExpense }) => (
  <OuterContainer>
    <Button onClick={onClickMember} style={{ marginRight: "24px" }} type="primary" icon="usergroup-add" ghost>
      Add Member
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

export default GroupInner;
