import React from "react";
import { Avatar, Divider, Icon, Input } from "antd";
import Upload from "./Upload";

const Header = ({ title, value, onChange, date, editable, participants }) => (
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
          {participants.length}
        </p>
      </div>
    </div>
  </div>
);

export default Header;
