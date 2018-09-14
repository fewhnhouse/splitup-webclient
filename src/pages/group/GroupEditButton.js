import React from "react";
import { Popconfirm, Button } from "antd";

const GroupEditButton = ({
  editable,
  editedTitle,
  saveConfirm,
  cancel,
  deleteConfirm,
  onClickEdit
}) => (
  <div>
    {editable ? (
      <div
        style={{
          position: "absolute",
          right: "0px",
          top: "60px",
          fontSize: "20px",
          display: "flex"
        }}
      >
        <Popconfirm
          title="Are you sure you want to save your changes?"
          onConfirm={saveConfirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button
            disabled={editedTitle === ""}
            style={{ marginRight: "5px" }}
            type="primary"
            ghost
            icon="save"
          >
            Save
          </Button>
        </Popconfirm>

        <Button
          style={{ marginRight: "5px" }}
          type="default"
          icon="close-circle"
          onClick={onClickEdit}
        >
          Discard
        </Button>
        <Popconfirm
          placement="topRight"
          title="Are you sure you want to delete this group?"
          onConfirm={deleteConfirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button type="danger" ghost icon="delete">
            Delete
          </Button>
        </Popconfirm>
      </div>
    ) : (
      <Button
        style={{
          position: "absolute",
          right: "0px",
          top: "60px",
          fontSize: "20px"
        }}
        icon="edit"
        theme="outlined"
        onClick={onClickEdit}
      />
    )}
  </div>
);

export default GroupEditButton;

