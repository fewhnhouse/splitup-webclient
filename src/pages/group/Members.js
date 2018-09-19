import React from "react";
import { Card, List } from "antd";
import { Link } from "react-router-dom";

const Item = List.Item;

const Members = ({ participants, style }) => (
  <div style={{ maxHeight: "200px", overflowY: "scroll" }}>
    <List
      dataSource={participants}
      renderItem={item => (
        <Item>
          <Link to={`/friends/${item.id}`}>{item.name}</Link>
        </Item>
      )}
    />
  </div>
);

export default Members;
