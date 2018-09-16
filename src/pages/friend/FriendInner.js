import React from "react";
import { Button, List, Divider, Input } from "antd";
import styled from "styled-components";

const Item = List.Item;

const FriendInner = ({ onClick }) => (
  <InnerContainer>
    <List>
      <Item>
        <span>
          <h3>Description: </h3>
          <p>{""}</p>
        </span>
      </Item>
      <Item>
        <div style={{ width: "100%" }}>
          <h3 style={{ paddingRight: "10px" }}>Shared Groups:</h3>
          <div
            style={{
              width: "100%"
            }}
          >
            {[{ name: "test" }].map((el, index) => (
              <span key={index}>
                <a>{el.name}</a>
                {[1].length - 1 !== index ? <Divider type="vertical" /> : null}
              </span>
            ))}
            <Button
              onClick={onClick}
              style={{ float: "right" }}
              icon="plus"
              type="primary"
            >
              Add Friend to Group
            </Button>
          </div>
        </div>
      </Item>
      <Item>
        <div style={{ width: "100%" }}>
          <h3 style={{ paddingRight: "10px" }}>Common Friends:</h3>
          <div
            style={{
              width: "100%"
            }}
          >
            {[{ name: "test" }].map((el, index) => (
              <span key={index}>
                <a>{el.name}</a>
                {[1].length - 1 !== index ? <Divider type="vertical" /> : null}
              </span>
            ))}
          </div>
        </div>
      </Item>
    </List>
  </InnerContainer>
);

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 0px;
`;

export default FriendInner;
