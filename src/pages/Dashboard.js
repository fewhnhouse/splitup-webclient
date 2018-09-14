import React from "react";
import { Breadcrumb, Layout, Button } from "antd";
import "./dashboard.css";
import styled from "styled-components";

const { Content } = Layout;

const Dashboard = () => (
  <header>
    <section class="header-content">
      <img
        src="https://cssanimation.rocks/levelup/public/images/rocky-dashed.svg"
        class="rocky-dashed"
      />
      <Title>Splitup</Title>
      <SubTitle>Share your expenses</SubTitle>
      <Button ghost type="success">
        Get started now!
      </Button>
    </section>
  </header>
);

const Title = styled.h1`
  color: white;
  letter-spacing: 3px;
`;

const SubTitle = styled.h3`
  color: white;
  text-transform: uppercase;
  margin-bottom: 5rem;
`;

export default Dashboard;
