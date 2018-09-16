import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { List, Avatar } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";
import './MenuList.css';

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
            if (loading ) {
              return <div>Loading...</div>;
            }
            if (err || !data) {
              return <div>Error.</div>;
            } else {
              const { me } = data;
              return (
                <List
                  itemLayout="horizontal"
                  dataSource={
                    me
                      ? me.friends.filter(
                          friend =>
                            friend.name.indexOf(
                              this.props.searchValue.toLowerCase()
                            ) !== -1
                        )
                      : []
                  }
                  renderItem={item => (
                    <List.Item>
                      <Link
                        style={{
                          width: "100%",
                          padding: "0px 20px",
                          textAlign: "left",
                          color: "white"
                        }}
                        to={`/friends/${item.id}`}
                        key={item.id}
                      >
                        <List.Item.Meta
                          avatar={<Avatar className="menu-list-avatar" shape="square" icon="user" />}
                          title={item.name}
                        />
                      </Link>
                    </List.Item>
                  )}
                />
              );
            }
          }}
        </Query>
      </div>
    );
  }
}
