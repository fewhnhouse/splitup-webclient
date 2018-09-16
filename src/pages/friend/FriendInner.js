import React from "react";
import { Button, List, Divider, Spin } from "antd";
import styled from "styled-components";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router-dom";

const Item = List.Item;

const COMMON_FRIENDS = gql`
  query UserConnection($where: MyUserWhereInput) {
    usersConnection(where: $where) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

const COMMON_GROUPS = gql`
  query GroupsConnection($where: GroupWhereInput) {
    groupsConnection(where: $where) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;

const FriendInner = ({ onClick, myId, friendId }) => (
  <InnerContainer>
    <List>
      <Item>
        <span>
          <h3>Description: </h3>
          <p>{""}</p>
        </span>
      </Item>
      <Item>
        <div style={{ width: "100%" }}>
          <h3 style={{ paddingRight: "10px" }}>Shared Groups:</h3>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <Query
              query={COMMON_GROUPS}
              variables={{
                where: {
                  AND: [
                    { participants_some: { id: friendId } },
                    { participants_some: { id: myId } }
                  ]
                }
              }}
            >
              {({ loading, error, data }) => {
                if (error || !data) {
                  return <div>Error.</div>;
                } else if (loading) {
                  return <Spin />;
                } else {
                  return (
                    <div>
                      {data.groupsConnection.edges.map((el, index) => (
                        <span key={index}>
                          <Link to={`/groups/${el.node.id}`}>
                            {el.node.title}
                          </Link>
                          {data.groupsConnection.edges.length - 1 !== index ? (
                            <Divider type="vertical" />
                          ) : null}
                        </span>
                      ))}
                    </div>
                  );
                }
              }}
            </Query>
            <Button
              onClick={onClick}
              style={{ float: "right" }}
              icon="plus"
              type="primary"
            >
              Add Friend to Group
            </Button>
          </div>
        </div>
      </Item>
      <Item>
        <div style={{ width: "100%" }}>
          <h3 style={{ paddingRight: "10px" }}>Common Friends:</h3>
          <div
            style={{
              width: "100%"
            }}
          >
            <Query
              query={COMMON_FRIENDS}
              variables={{
                where: {
                  AND: [
                    { friends_some: { id: friendId } },
                    { friends_some: { id: myId } }
                  ]
                }
              }}
            >
              {({ loading, error, data }) => {
                if (error || !data) {
                  return <div>Error.</div>;
                } else if (loading) {
                  return <Spin />;
                } else {
                  return data.usersConnection.edges.map((el, index) => (
                    <span key={index}>
                      <Link to={`/friends/${el.node.id}`}>{el.node.name}</Link>
                      {data.usersConnection.edges.length - 1 !== index ? (
                        <Divider type="vertical" />
                      ) : null}
                    </span>
                  ));
                }
              }}
            </Query>
          </div>
        </div>
      </Item>
    </List>
  </InnerContainer>
);

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 0px;
`;

export default FriendInner;
