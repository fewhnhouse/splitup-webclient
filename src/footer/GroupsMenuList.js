import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { List, Avatar } from "antd";
import score from "string-score";
import { Link } from "react-router-dom";

const GROUPS = gql`
  query {
    groups {
      id
      title
      description
    }
  }
`;

export default class Groups extends Component {
  render() {
    return (
      <div>
        <Query query={GROUPS}>
          {({ loading, err, data }) => {
            if (err || !data) {
              return <div>Error.</div>;
            }
            if (loading) {
              return <div>Loading...</div>;
            } else {
              const { groups } = data;
              return (
                <List
                  itemLayout="horizontal"
                  dataSource={
                    groups
                      ? groups.filter(
                          group =>
                            this.props.searchValue === "" ||
                            score(
                              group.title.toLowerCase(),
                              this.props.searchValue.toLowerCase(),
                              0.6
                            ) > 0.6
                        )
                      : []
                  }
                  renderItem={item => (
                    <List.Item>
                      <Link
                        style={{
                          width: "100%",
                          textAlign: "left"
                        }}
                        to={`/groups/${item.id}`}
                        key={item.id}
                      >
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              className="menu-list-avatar"
                              shape="square"
                              icon="appstore"
                            />
                          }
                          title={item.title}
                          description={item.description}
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
