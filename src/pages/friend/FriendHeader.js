import React from "react";
import { Avatar, Divider, Icon } from "antd";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const COMMON_FRIENDS = gql`
    query Users($where: MyUserWhereInput!) {
        users(where: $where) {
            
        }
    }
`;


const Header = ({ name, date }) => (
  <div style={{ display: "flex", flexDirection: "row" }}>
    <Avatar shape="square" size={112} icon="user" />
    <div style={{ flexDirection: "column", marginLeft: "15px" }}>
      <h1 style={{ marginBottom: "5px" }}>{name}</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          color: "lightgrey"
        }}
      >
        <p>
          <Icon
            style={{ marginRight: "5px" }}
            type="calendar"
            theme="outlined"
          />
          {date}
        </p>
        <Divider
          style={{
            marginTop: "5px",
            display: "block",
            lineHeight: "1.5",
            fontSize: "14px"
          }}
          type="vertical"
        />
        <p>
          <Icon style={{ marginRight: "5px" }} type="team" theme="outlined" />
          {"COMMON FRIENDS QUERY"}
        </p>
        <Divider
          style={{
            marginTop: "5px",
            display: "block",
            lineHeight: "1.5",
            fontSize: "14px"
          }}
          type="vertical"
        />
        <p>
          <Icon style={{ marginRight: "5px" }} type="team" theme="outlined" />
          {"COMMON GROUPS QUERY"}
        </p>
      </div>
    </div>
  </div>
);

export default Header;