import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { List, Avatar } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";

const FRIENDS = gql`
  query {
    me {
      friends {
        name
        id
      }
    }
  }
`;

export default class Friends extends Component {
  render() {
    return (
      <div>
        <Query query={FRIENDS}>
          {({ loading, err, data }) => {
            if (loading) {
              return <div>Loading...</div>;
            }
            if (err) {
              return <div>Error.</div>;
            } else {
              console.log("d", data);
              return (
                <List itemLayout="horizontal">
                  {data
                    ? data.me.friends.map(friend => (
                        <Link to={`/friends/${friend.id}`} key={friend.id}>
                          <StyledListItem>
                            <List.Item.Meta
                              avatar={<Avatar icon="user" />}
                              title={<p>{friend.name}</p>}
                            />
                          </StyledListItem>
                        </Link>
                      ))
                    : null}
                </List>
              );
            }
          }}
        </Query>
      </div>
    );
  }
}

const StyledListItem = styled(List.Item)`
  &:hover {
    a {
      color: #1890ff;
    }
  }
  cursor: pointer;
`;
