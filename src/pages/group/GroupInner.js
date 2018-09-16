import React from "react";
import { Button, List, Divider, Input } from "antd";
import styled from "styled-components";

const Item = List.Item;

const GroupInner = ({
  description,
  editedDescription,
  onChangeDescription,
  onClick,
  participants,
  editable
}) => (
  <InnerContainer>
    <List>
      <Item>
        {editable ? (
          <span style={{ width: "100%" }}>
            <h3>Description: </h3>

            <Input
              value={editedDescription}
              placeholder={description}
              onChange={onChangeDescription}
            />
          </span>
        ) : (
          <span>
            <h3>Description: </h3>
            <p>{description}</p>
          </span>
        )}
      </Item>
      <Item>
        <div style={{ width: "100%" }}>
          <h3 style={{ paddingRight: "10px" }}>Members:</h3>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <div>
              {participants.map((el, index) => (
                <span key={index}>
                  <a>{el.name}</a>
                  {participants.length - 1 !== index ? (
                    <Divider type="vertical" />
                  ) : null}
                </span>
              ))}
            </div>
            <Button
              onClick={onClick}
              style={{ float: "right" }}
              icon="plus"
              type="primary"
            >
              Add Member
            </Button>
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

export default GroupInner;
