import React from "react";
import UserSelect from "./FriendsModal";
import { Card, Tabs } from "antd";

const TabPane = Tabs.TabPane;

export default class CreateGroup extends React.Component {
  render() {
    return <Tabs>
      <TabPane tab="Join Group" key="1">Content</TabPane>
      <TabPane tab="Create Group" key="2">Content</TabPane>
    </Tabs>;
  }
}
