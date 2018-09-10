import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { List, Avatar } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";

const GROUPS = gql`
  query {
    groups {
      id
      title
    }
  }
`;

export default class Groups extends Component {
  render() {
    return (
      <div>
        <Query query={GROUPS}>
          {({ loading, err, data }) => {
            if (loading) {
              return <div>Loading...</div>;
            }
            if (err) {
              return <div>Error.</div>;
            } else {
              return (
                <List itemLayout="horizontal">
                  {data
                    ? data.groups.map(group => (
                        <Link to={`/groups/${group.id}`} key={group.id}>
                          <StyledListItem>
                            <List.Item.Meta
                              avatar={<Avatar icon="user" />}
                              title={<p>{group.title}</p>}
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
