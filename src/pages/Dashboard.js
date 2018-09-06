import React from "react";
import { Breadcrumb, Layout } from "antd";

const { Content } = Layout;

const Dashboard = () => (
  <Layout>
    <Breadcrumb style={{ margin: "16px 0" }}>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>List</Breadcrumb.Item>
      <Breadcrumb.Item>App</Breadcrumb.Item>
    </Breadcrumb>
    <Content
      style={{
        background: "#fff",
        padding: 24,
        margin: 10,
        minHeight: 280
      }}
    >
      Content
    </Content>
    <Content
      style={{
        background: "#fff",
        padding: 24,
        margin: 10,
        minHeight: 280
      }}
    >
      Content
    </Content>
    <Content
      style={{
        background: "#fff",
        padding: 24,
        margin: 10,
        minHeight: 280
      }}
    >
      Content
    </Content>
  </Layout>
);

export default Dashboard;
