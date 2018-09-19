import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Select, Spin } from "antd";

const Option = Select.Option;

const GROUPS = gql`
  query Groups($title: String!) {
    groups(title: $title) {
      title
      id
    }
  }
`;

export default class AddUser extends React.Component {
  render() {
    const { value, searchValue, handleChange, handleSearch, skip } = this.props;
    const where = {
      name_contains: searchValue,
      id_not_in: skip
    };

    return (
      <Query query={GROUPS} variables={{ where }}>
        {({ loading, error, data }) => {
          if (error) {
            return `Error!: ${error}`;
          } else if (loading) {
            return "Loading";
          } else {
            const options = data.groups
              ? skip
                ? data.groups.filter(el => !skip.find(s => s.id === el.id))
                : data.groups
              : [];
            return (
              <Select
                value={values}
                placeholder={"Search for friends to add"}
                style={{ width: "100%", marginBottom: "24px" }}
                onSearch={handleSearch}
                labelInValue
                filterOption={false}
                onChange={handleChange}
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
