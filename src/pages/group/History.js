import React from "react";
import { Timeline, Skeleton, Card, Icon, Divider } from "antd";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
const EXPENSES = gql`
  query Group($id: ID!) {
    group(id: $id) {
      id
      expenses {
        id
        title
        createdAt
        description
        amount
        splits {
          amount
          author {
            id
            name
          }
        }
      }
    }
  }
`;

const TimeItemRight = ({
  title,
  description,
  createdAt,
  amount,
  participants
}) => (
  <StyledContainer right={true}>
    <div style={{ padding: "10px" }}>
      <h2 style={{ marginBottom: "0px" }}>{title}</h2>
      <span style={{ color: "lightgrey", fontSize: "10px" }}>
        <Icon type="calendar" />
        {createdAt}
        <Divider type="vertical" />
        <Icon type="user" />
        {participants.length}
      </span>
    </div>
    <StyledPriceContainer right={true}>
      <h2 style={{ color: "white" }}>{amount}$</h2>
    </StyledPriceContainer>
  </StyledContainer>
);

const TimeItemLeft = ({
  title,
  description,
  createdAt,
  amount,
  participants
}) => (
  <StyledContainer>
    <StyledPriceContainer>
      <h2 style={{ color: "white" }}>{amount}$</h2>
    </StyledPriceContainer>
    <div style={{ padding: "10px" }}>
      <h3 style={{ marginBottom: "0px" }}>{title}</h3>
      <span style={{ color: "lightgrey", fontSize: "10px" }}>
        <Icon type="calendar" />
        {createdAt}
        <Divider type="vertical" />
        <Icon type="user" />
        {participants.length}
      </span>
    </div>
  </StyledContainer>
);

const StyledPriceContainer = styled.div`
  padding: 10px;
  background: #1890ff;
  min-width: 100px;
  text-align: ${props => (props.right ? "right" : "left")};
  line-height: 10px;
  color: white;
  border-radius: ${props =>
    props.right ? "0px 5px 5px 0px" : "5px 0px 0px 5px"};
`;

const StyledContainer = styled.div`
  width: 80%;
  float: ${props => (props.right ? "" : "right")};
  border: 1px solid lightgray;
  display: flex;
  flex-direction: row;
  border-radius: 5px;
  justify-content: space-between;
  background: white;
`;

export default class History extends React.Component {
  render() {
    console.log(this.props.id);
    return (
      <Query query={EXPENSES} variables={{ id: this.props.id }}>
        {({ error, loading, data }) => {
          if (error || !data) {
            return <div>Error.</div>;
          } else if (loading) {
            return <Skeleton active />;
          } else {
            return (
              <Timeline style={{ marginTop: "30px" }} mode="alternate">
                {data.group.expenses.map((expense, index) => {
                  const date = new Date(expense.createdAt);
                  const dateString = `${date.getDate()}. ${
                    months[date.getMonth()]
                  } ${date.getFullYear()}`;

                  return index % 2 == 0 ? (
                    <Timeline.Item>
                      <TimeItemRight
                        title={expense.title}
                        createdAt={dateString}
                        amount={expense.amount}
                        participants={expense.participants ? [] : []}
                        description={expense.description}
                      />
                    </Timeline.Item>
                  ) : (
                    <Timeline.Item>
                      <TimeItemLeft
                        title={expense.title}
                        createdAt={dateString}
                        amount={expense.amount}
                        participants={expense.participants ? [] : []}
                        description={expense.description}
                      />
                    </Timeline.Item>
                  );
                })}
              </Timeline>
            );
          }
        }}
      </Query>
    );
  }
}
