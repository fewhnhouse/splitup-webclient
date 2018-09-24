import React from "react";
import {  List } from "antd";
import { Link } from "react-router-dom";

const Item = List.Item;

const Members = ({ groups, style }) => (
  <div style={{ maxHeight: "200px", overflowY: "scroll" }}>
    <List
      dataSource={groups}
      renderItem={item => (
        <Item>
          <Link to={`/groups/${item.id}`}>{item.title}</Link>
        </Item>
      )}
    />
  </div>
);

export default Members;
