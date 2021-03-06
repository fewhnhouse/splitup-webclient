import React from "react";
import {  List } from "antd";
import { Link } from "react-router-dom";

const Item = List.Item;

const Friends = ({ friends, style }) => (
  <div style={{ maxHeight: "200px", overflowY: "scroll" }}>
    <List
      dataSource={friends}
      renderItem={item => (
        <Item>
          <Link to={`/friends/${item.id}`}>{item.name}</Link>
        </Item>
      )}
    />
  </div>
);

export default Friends;
