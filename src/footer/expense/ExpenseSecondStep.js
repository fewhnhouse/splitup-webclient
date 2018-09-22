import React from "react";
import { Form, Select, Tabs, Icon, Divider, Input } from "antd";
import GroupsSelect from "../../utils/GroupsSelect";
import ParticipantsSelect from "../../utils/ParticipantsSelect";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import AddAmount from "./AddAmountContainer";

const Option = Select.Option;

const selectAfter = (
  <Select defaultValue="euro" style={{ width: 60 }}>
    <Option value="euro">
      <Icon type="euro" style={{ fontSize: "14px" }} />
    </Option>
    <Option value="dollar">
      <Icon type="dollar" style={{ fontSize: "14px" }} />
    </Option>
    <Option value="pound">
      <Icon type="pound" style={{ fontSize: "14px" }} />
    </Option>
  </Select>
);

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
    const {
      handleStandaloneParticipantsChange,
      handleParticipantsChange,
      handleGroupChange
    } = this.props;
    this._handleParticipantsChange([]);
    this._handleStandaloneParticipantsChange([]);
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

  _handleParticipantsSearch = e => {
    this.setState({
      searchParticipants: e.target.value
    });
  };

  _handleStandaloneParticipantsSearch = e => {
    this.setState({
      searchStandaloneParticipants: e.target.value
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

  _handleStandaloneParticipantsChange = standaloneParticipants => {
    this.props.setStandaloneParticipants(standaloneParticipants);
  };

  render() {
    const { group, participants, standaloneParticipants } = this.props;
    const {
      searchGroup,
      searchParticipants,
      searchStandaloneParticipants
    } = this.state;
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
                handleChange={this._handleStandaloneParticipantsChange}
                handleSearch={this._handleStandaloneParticipantsSearch}
                values={standaloneParticipants}
                searchValue={searchStandaloneParticipants}
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
