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
              return (
                <List
                  itemLayout="horizontal"
                  dataSource={data ? data.me.friends : []}
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
                          avatar={<Avatar shape="square" icon="user" />}
                          title={
                            <h4 style={{ color: "#f3f3f3" }}>{item.name}</h4>
                          }
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
