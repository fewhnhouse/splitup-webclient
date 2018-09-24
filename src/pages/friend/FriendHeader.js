import React from "react";
import { Avatar, Divider, Icon, Spin, Popover } from "antd";
import CommonFriends from "./CommonFriends";
import CommonGroups from "./CommonGroups";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from 'styled-components';

const COMMON_FRIENDS = gql`
  query UserConnection($where: MyUserWhereInput) {
    usersConnection(where: $where) {
      aggregate {
        count
      }
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
      aggregate {
        count
      }
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;

const Header = ({ name, date, friendId, myId }) => {
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
          <div title="Friends since">
            <Icon
              style={{ marginRight: "5px" }}
              type="calendar"
              theme="outlined"
            />
            {date}
          </div>
          <Divider
            style={{
              marginTop: "5px",
              display: "block",
              lineHeight: "1.5",
              fontSize: "14px"
            }}
            type="vertical"
          />

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
                const count = data.usersConnection.aggregate.count;
                const friends = data.usersConnection.edges ?  data.usersConnection.edges.map(edge => edge.node) : [];
                console.log(friends, data.usersConnection.edges);
                return (
                  <Popover
                    content={<CommonFriends friends={friends} />}
                    title="Common Friends"
                    trigger="click"
                    placement="rightTop"
                  >
                    <IconContainer title="Common Friends">
                      <Icon
                        style={{ marginRight: "5px" }}
                        type="team"
                        theme="outlined"
                      />
                      {count}
                    </IconContainer>
                  </Popover>
                );
              }
            }}
          </Query>

          <Divider
            style={{
              marginTop: "5px",
              display: "block",
              lineHeight: "1.5",
              fontSize: "14px"
            }}
            type="vertical"
          />
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
                console.log(data);
                const count = data.groupsConnection.aggregate.count;
                const groups = data.groupsConnection.edges ? data.groupsConnection.edges.map(edge => edge.node) : [];
                return (
                  <Popover
                    content={<CommonGroups groups={groups} />}
                    title="Common Groups"
                    trigger="click"
                    placement="rightTop"
                  >
                    <IconContainer title="Common Groups">
                      <Icon
                        style={{ marginRight: "5px" }}
                        type="team"
                        theme="outlined"
                      />
                      {count}
                    </IconContainer>
                  </Popover>
                );
              }
            }}
          </Query>
        </div>
      </div>
    </div>
  );
};

const IconContainer = styled.div`
        cursor: pointer;
        &:hover {
          color: #1890ff;
        }
`;

export default Header;
