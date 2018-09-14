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
  }
`;

export default class AddUser extends React.Component {
  render() {
    const {
      values,
      searchValue,
      handleChange,
      handleSearch,
      skip
    } = this.props;
    const where = {
      name_contains: searchValue,
      id_not_in: skip
    };

    return (
      <Query query={USERS} variables={{ where }}>
        {({ loading, error, data }) => {
          if (error) {
            return `Error!: ${error}`;
          } else if (loading) {
            return "Loading";
          } else {
            const options = data.users
              ? skip
                ? data.users.filter(el => !skip.find(s => s.id === el.id))
                : data.users
              : [];
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
                {options.length ? (
                  options.map((d, index) => (
                    <Option key={d.id} value={d.id}>
                      {d.name}
                    </Option>
                  ))
                ) : (
                  <Option key="nothing-found" disabled>
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
