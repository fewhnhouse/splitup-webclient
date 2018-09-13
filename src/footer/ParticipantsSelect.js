import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Select, Spin } from "antd";

const Option = Select.Option;

const USERS = gql`
  query Users($name_contains: String) {
    users(name_contains: $name_contains, includeFriends: true) {
      name
      id
    }
  }
`;

export default class AddUser extends React.Component {
  render() {
    const { values, searchValue, handleChange, handleSearch } = this.props;
    return (
      <Query query={USERS} variables={{ name_contains: searchValue }}>
        {({ loading, error, data }) => {
          if (error) {
            return `Error!: ${error}`;
          } else {
            return (
              <Select
                mode="multiple"
                value={values}
                placeholder={"Search for friends to add"}
                style={{ width: "100%", marginBottom: "24px" }}
                onSearch={handleSearch}
                labelInValue
                filterOption={false}
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
                {data.users
                  ? data.users.map((d, index) => (
                      <Option key={d.id} value={d.id}>
                        {d.name}
                      </Option>
                    ))
                  : null}
              </Select>
            );
          }
        }}
      </Query>
    );
  }
}
