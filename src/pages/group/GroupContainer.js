import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import Group from "./Group";
import { message } from "antd";

const GROUP = gql`
  query Group($id: ID!) {
    group(id: $id) {
      id
      title
      description
      createdAt
      participants {
        name
        id
      }
    }
  }
`;

const EDIT_GROUP = gql`
  mutation EditGroup($id: ID!, $title: String!, $description: String!) {
    editGroup(id: $id, title: $title, description: $description) {
      id
      title
      description
    }
  }
`;

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export default class GroupContainer extends React.Component {
  saveConfirm = (editGroup, id) => {
    const { description, title } = this.state;
    console.log({ id, description, title });
    editGroup({
      variables: { id, description, title }
    }).then(
      res => {
        message.success("Changes saved.");
      },
      err => {
        message.error("An error occured while saving the group.");
      }
    );
    this.setState({ editable: false });
  };

  deleteConfirm = () => {
    message.success("Group deleted.");
    this.setState({ editable: false });
  };

  onClickEdit = () => {
    this.setState(prevState => ({
      editable: !prevState.editable,
      description: "",
      title: ""
    }));
  };

  onChangeTitle = e => {
    this.setState({
      title: e.target.value
    });
  };

  onChangeDescription = e => {
    this.setState({
      description: e.target.value
    });
  };

  state = {
    editable: false,
    title: "",
    description: ""
  };

  render() {
    return (
      <Query query={GROUP} variables={{ id: this.props.match.params.groupId }}>
        {({ loading, err, data, refetch }) => {
          if (loading) {
            return <div>Loading...</div>;
          }
          if (err) {
            return <div>Error.</div>;
          } else {
            const date = new Date(data.group.createdAt);
            const { id, title, description, participants } = data.group;
            const dateString = `${date.getDate()}. ${
              months[date.getMonth()]
            } ${date.getFullYear()}`;

            return (
              <Mutation
                mutation={EDIT_GROUP}
              >
                {(editGroup, { data }) => (
                  <Group
                    groupId={this.props.match.params.groupId}
                    onClickEdit={this.onClickEdit}
                    saveConfirm={() => this.saveConfirm(editGroup, id)}
                    deleteConfirm={this.deleteConfirm}
                    date={dateString}
                    participants={participants}
                    title={data ? data.editGroup.title : title}
                    description={
                      data && data.editGroup.description
                        ? data.editGroup.description
                        : description
                    }
                    editable={this.state.editable}
                    onChangeDescription={this.onChangeDescription}
                    onChangeTitle={this.onChangeTitle}
                    editedTitle={this.state.title}
                    editedDescription={this.state.description}
                  />
                )}
              </Mutation>
            );
          }
        }}
      </Query>
    );
  }
}
