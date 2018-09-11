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
            console.log(data);
            /*this.setState({
              data: data.users ? data.users : []
            });
            */
            return (
              <Select
                mode="multiple"
                value={values}
                placeholder={"Search for users"}
                style={{ width: "100%" }}
                defaultActiveFirstOption={false}
                filterOption={false}
                onSearch={handleSearch}
                onChange={(value) => handleChange(value, data.users ? data.users : [])}
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
                      <Option key={d.id} >{d.name}</Option>
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
