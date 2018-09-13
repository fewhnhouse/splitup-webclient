import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Group from "./Group";
import { message } from "antd";

const GROUP = gql`
  query Group($id: ID!) {
    group(id: $id) {
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
  mutation EditGroup($title: String!, $description: String!) {
    editGroup(title: $title, description: $description) {
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
  saveConfirm = () => {
    message.success("Changes saved.");
    this.setState({ editable: false });
  };

  deleteConfirm = () => {
    message.success("Group deleted.");
    this.setState({ editable: false });
  };

  onClickEdit = () => {
    this.setState(prevState => ({ editable: !prevState.editable }));
  };

  state = {
    editable: false
  };
  render() {
    return (
      <Query query={GROUP} variables={{ id: this.props.match.params.groupId }}>
        {({ loading, err, data }) => {
          if (loading) {
            return <div>Loading...</div>;
          }
          if (err) {
            return <div>Error.</div>;
          } else {
            const date = new Date(data.group.createdAt);

            console.log(
              date.getDate() +
                "." +
                months[date.getMonth()] +
                " " +
                date.getFullYear()
            );
            const dateString = `${date.getDate()}. ${
              months[date.getMonth()]
            } ${date.getFullYear()}`;

            const participants = data.group.participants;
            const title = data.group.title;
            const description = data.group.description;
            return (
              <Group
                onClickEdit={this.onClickEdit}
                saveConfirm={this.saveConfirm}
                deleteConfirm={this.deleteConfirm}
                date={dateString}
                participants={participants}
                title={title}
                description={description}
                editable={this.state.editable}
              />
            );
          }
        }}
      </Query>
    );
  }
}
