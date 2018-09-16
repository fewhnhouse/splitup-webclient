import React from "react";
import { Avatar, Divider, Icon } from "antd";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const COMMON_FRIENDS = gql`
  query UserConnection($where: MyUserWhereInput) {
    usersConnection(where: $where) {
      edges {
        node {
          id
          name
        }
      }
      aggregate {
        count
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
      aggregate {
        count
      }
    }
  }
`;

const Header = ({ name, date, friendId, myId }) => {
  console.log(myId);
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Avatar shape="square" size={112} icon="user" />
      <div style={{ flexDirection: "column", marginLeft: "15px" }}>
        <h1 style={{ marginBottom: "5px" }}>{name}</h1>

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
            {date}
          </p>
          <Divider
            style={{
              marginTop: "5px",
              display: "block",
              lineHeight: "1.5",
              fontSize: "14px"
            }}
            type="vertical"
          />
          <p>
            <Icon style={{ marginRight: "5px" }} type="team" theme="outlined" />

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
                  return <div>Loading...</div>;
                } else {
                  const count = data.usersConnection.aggregate.count;
                  return count;
                }
              }}
            </Query>
          </p>

          <Divider
            style={{
              marginTop: "5px",
              display: "block",
              lineHeight: "1.5",
              fontSize: "14px"
            }}
            type="vertical"
          />
          <p>
            <Icon style={{ marginRight: "5px" }} type="team" theme="outlined" />
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
                  return <div>Loading...</div>;
                } else {
                  const count = data.groupsConnection.aggregate.count;
                  return count;
                }
              }}
            </Query>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
