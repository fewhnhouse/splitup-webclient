import React from "react";
import { Avatar, Divider, Icon, Input, Popover } from "antd";
import Upload from "./Upload";
import Members from "./Members";
import styled from 'styled-components';

const Header = ({
  title,
  value,
  onChange,
  date,
  editable,
  participants,
  description,
  editedDescription,
  onChangeDescription
}) => (
  <div style={{ display: "flex", flexDirection: "row" }}>
    {editable ? <Upload /> : <Avatar shape="square" size={112} icon="user" />}
    <div style={{ flexDirection: "column", marginLeft: "15px" }}>
      {editable ? (
        <Input
          size="large"
          placeholder={title}
          value={value}
          onChange={onChange}
        />
      ) : (
        <h1 style={{ marginBottom: "5px" }}>{title}</h1>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          color: "lightgrey"
        }}
      >
        <div title="Creation Date">
          <Icon
            style={{ marginRight: "5px" }}
            type="calendar"
            theme="outlined"
          />
          {date}
        </div>
        <Divider
          style={{
            marginTop: "5px",
            display: "block",
            lineHeight: "1.5",
            fontSize: "14px"
          }}
          type="vertical"
        />
        <Popover content={<Members participants={participants}/>} title="Members" trigger="click" placement="rightTop">
          <ParticipantsContainer title="Participants">
            <Icon style={{ marginRight: "5px" }} type="team" theme="outlined" />
            {participants.length}
          </ParticipantsContainer>
        </Popover>
      </div>
      {editable ? (
        <div style={{ paddingTop: "20px", width: "100%" }}>
          <Input
            size="small"
            value={editedDescription}
            placeholder={description}
            onChange={onChangeDescription}
          />
        </div>
      ) : (
        <div style={{ paddingTop: "20px" }}>
          <h4>
            <Icon style={{ marginRight: "5px" }} type="read" theme="outlined" />
            {description}
          </h4>
        </div>
      )}
    </div>
  </div>
);

const ParticipantsContainer = styled.div`
        cursor: pointer;
        &:hover {
          color: #1890ff;
        }
`;

export default Header;
