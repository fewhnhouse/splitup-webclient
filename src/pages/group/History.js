import React from "react";
import { Timeline, Skeleton } from "antd";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const EXPENSES = gql`
  query Group($id: ID!) {
    group(id: $id) {
      id
      expenses {
        id
        title
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

export default class History extends React.Component {
  render() {
    return (
      <Query query={EXPENSES} variables={{ id: this.props.id }}>
        {({ error, loading, data }) => {
          if (error || !data) {
            return <div>Error.</div>;
          } else if (loading) {
            return <Skeleton active />;
          } else {
            return (
              <Timeline style={{ marginTop: "30px" }}>
                {data.group.expenses.map(expense => (
                  <Timeline.Item>
                    Title:
                    {expense.title}
                    Amount:
                    {expense.amount}
                  </Timeline.Item>
                ))}
              </Timeline>
            );
          }
        }}
      </Query>
    );
  }
}
