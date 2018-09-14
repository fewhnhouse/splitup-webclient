import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Select, Spin } from "antd";

const Option = Select.Option;

const USERS = gql`
  query Users($where: MyUserWhereInput!) {
    users(where: $where) {
      name
      id
    }
    me {
      id
      friends {
        id
      }
    }
  }
`;

export default class AddUser extends React.Component {
  render() {
    const { value, handleChange, handleSearch } = this.props;
    const where = {
      name_contains: value
    };
    return (
      <Query query={USERS} variables={{ where }}>
        {({ loading, error, data }) => {
          if (error) {
            return `Error!: ${error}`;
          } else if (loading) {
            return "Loading...";
          } else {
            const options = data.users.filter(
              el =>
                !data.me.friends.find(friend => friend.id === el.id) &&
                el.id !== data.me.id
            );
            return (
              <Select
                showSearch
                value={value}
                placeholder={"Search for users"}
                style={{ width: "100%" }}
                defaultActiveFirstOption={false}
                filterOption={false}
                onSearch={handleSearch}
                onChange={value =>
                  handleChange(value, data.users ? data.users : [])
                }
                notFoundContent={
                  loading ? (
                    <Spin size="small" />
                  ) : data.users.length === 0 ? (
                    <span>Nothing found.</span>
                  ) : null
                }
              >
                {options.length ? (
                  options.map((d, index) => (
                    <Option key={d.id}>{d.name}</Option>
                  ))
                ) : (
                  <Option disabled key="nothing-found">
                    Nothing found.
                  </Option>
                )}
              </Select>
            );
          }
        }}
      </Query>
    );
  }
}
