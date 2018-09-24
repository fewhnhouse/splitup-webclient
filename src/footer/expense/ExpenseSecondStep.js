import React from "react";
import { Form, Select, Tabs, Divider } from "antd";
import GroupsSelect from "../../utils/GroupsSelect";
import ParticipantsSelect from "../../utils/ParticipantsSelect";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import AddAmount from "./AddAmountContainer";

const GROUP = gql`
  query Group($id: ID!) {
    group(id: $id) {
      id
      participants {
        id
        name
      }
    }
  }
`;

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class CreateGroupForm extends React.Component {
  onChangeTab = key => {
    this._handleParticipantsChange([]);
    this._handleGroupChange({ key: "", label: "" });
  };

  state = {
    searchGroup: "",
    searchParticipants: "",
    searchStandaloneParticipants: ""
  };

  _handleGroupSearch = e => {
    this.setState({
      searchGroup: e.target.value
    });
  };

  _handleParticipantsSearch = searchParticipants => {
    this.setState({
      searchParticipants
    });
  };

  _handleGroupChange = group => {
    this.props.setGroup(group);
    this.props.setParticipants([]);
    this.setState({
      searchParticipants: ""
    });
  };

  _handleParticipantsChange = participants => {
    this.props.setParticipants(participants);
  };

  render() {
    const { group, participants } = this.props;
    const { searchGroup, searchParticipants } = this.state;
    return (
      <Form>
        <Tabs defaultActiveKey="1" onChange={this.onChangeTab}>
          <TabPane tab="Group Expense" key="1">
            <FormItem>
              <GroupsSelect
                handleChange={this._handleGroupChange}
                handleSearch={this._handleGroupSearch}
                value={group}
                searchValue={searchGroup}
              />
            </FormItem>
            <FormItem>
              <Query query={GROUP} variables={{ id: group.key }}>
                {({ loading, error, data }) => {
                  if (error || !data) {
                    return <div>Error.</div>;
                  } else if (loading) {
                    return <Select disabled />;
                  } else {
                    return (
                      <ParticipantsSelect
                        disabled={group.key === ""}
                        handleChange={this._handleParticipantsChange}
                        handleSearch={this._handleParticipantsSearch}
                        values={participants}
                        searchValue={searchParticipants}
                        include={
                          data.group
                            ? data.group.participants.map(p => p.id)
                            : []
                        }
                        placeholder="Add participants"
                      />
                    );
                  }
                }}
              </Query>
            </FormItem>
          </TabPane>
          <TabPane tab="Standalone Expense" key="2">
            <FormItem>
              <ParticipantsSelect
                handleChange={this._handleParticipantsChange}
                handleSearch={this._handleParticipantsSearch}
                values={participants}
                searchValue={searchParticipants}
                placeholder="Add participants"
              />
            </FormItem>
          </TabPane>
        </Tabs>
        <Divider type="horizontal" />

        <FormItem>
          <AddAmount />
        </FormItem>
      </Form>
    );
  }
}

export default CreateGroupForm;
