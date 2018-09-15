import React from "react";
import { Popconfirm, Button, message } from "antd";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const EDIT_GROUP = gql`
  mutation EditGroup($id: ID!, $title: String!, $description: String!) {
    editGroup(id: $id, title: $title, description: $description) {
      id
      title
      description
    }
  }
`;

const DELETE_GROUP = gql`
  mutation DeleteGroup($id: ID!) {
    id
  }
`;

const saveGroup = (mutate, description, title, id, closeModal) => {
  mutate({
    variables: { id, description, title }
  }).then(
    res => {
      message.success("Changes saved.");
    },
    err => {
      message.error("An error occured while saving the group.");
    }
  );
  closeModal();
};

const GroupEditButton = ({
  editable,
  title,
  description,
  id,
  closeModal,
  cancel,
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
        <Mutation mutation={EDIT_GROUP}>
          {(editGroup, { data }) => (
            <Popconfirm
              title="Are you sure you want to save your changes?"
              onConfirm={() =>
                saveGroup(editGroup, description, title, id, closeModal)
              }
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button
                disabled={title === ""}
                style={{ marginRight: "5px" }}
                type="primary"
                ghost
                icon="save"
              >
                Save
              </Button>
            </Popconfirm>
          )}
        </Mutation>

        <Button
          style={{ marginRight: "5px" }}
          type="default"
          icon="close-circle"
          onClick={onClickEdit}
        >
          Discard
        </Button>
        <Mutation mutation={DELETE_GROUP}>
          {(deleteGroup, { data }) => (
            <Popconfirm
              placement="topRight"
              title="Are you sure you want to delete this group?"
              onConfirm={closeModal}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button type="danger" ghost icon="delete">
                Delete
              </Button>
            </Popconfirm>
          )}
        </Mutation>
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
