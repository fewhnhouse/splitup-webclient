import React from "react";
import { Query } from "react-apollo";
import { Divider, List, Icon, Button, Avatar, Card } from "antd";
import gql from "graphql-tag";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Item = List.Item;
const GROUP = gql`
  query Group($id: ID!) {
    group(id: $id) {
      title
      createdAt
      participants {
        name
        id
      }
    }
  }
`;

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
const Group = ({ match }) => (
  <div>
    <Query query={GROUP} variables={{ id: match.params.groupId }}>
      {({ loading, err, data }) => {
        if (loading) {
          return <div>Loading...</div>;
        }
        if (err) {
          return <div>Error.</div>;
        } else {
          const date = new Date(data.group.createdAt);

          console.log(
            date.getDate() +
              "." +
              months[date.getMonth()] +
              " " +
              date.getFullYear()
          );
          const dateString = `${date.getDate()}. ${
            months[date.getMonth()]
          } ${date.getFullYear()}`;
          return (
            <Card style={{ margin: "40px" }}>
              <Button
                style={{
                  position: "absolute",
                  right: "15px",
                  top: "15px",
                  fontSize: "20px"
                }}
                icon="edit"
                theme="outlined"
              />
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Avatar shape="square" size={128} icon="user" />
                <div style={{ flexDirection: "column", marginLeft: "15px" }}>
                  <h1 style={{ marginBottom: "5px" }}>{data.group.title}</h1>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      color: "lightgrey"
                    }}
                  >
                    <p>
                      <Icon
                        style={{ marginRight: "5px" }}
                        type="calendar"
                        theme="outlined"
                      />
                      {dateString}
                    </p>
                    <p>
                      <Divider type="vertical" />
                    </p>
                    <p>
                      <Icon
                        style={{ marginRight: "5px" }}
                        type="team"
                        theme="outlined"
                      />
                      {data.group.participants.length}
                    </p>
                  </div>
                </div>
              </div>
              <InnerContainer>
                <List>
                  <Item>Description</Item>
                  <Item>
                    Members: <span style={{ textAlign: "right" }}>12</span>
                  </Item>
                  <Item>Admin: </Item>
                </List>
              </InnerContainer>
            </Card>
          );
        }
      }}
    </Query>
  </div>
);

const Container = styled(Card)`
  display: flex;
  flex-direction: row;
  margin: auto;
  height: 400px;
  width: 80%;
  background: white;
  padding: 50px;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export default Group;
