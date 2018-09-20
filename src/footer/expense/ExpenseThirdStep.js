import React from "react";
import { Form, Select, Icon, Divider, Checkbox, Input, Tabs, List } from "antd";
import AddAmount from "./AddAmount";

const Option = Select.Option;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const ListItem = List.Item;

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
class CreateGroupForm extends React.Component {
  constructor(props) {
    super(props);
  }

  onChangeTab(key) {
    console.log(key);
  }

  render() {
    const { participants, amount, handleAmountChange } = this.props;
    return (
      <Tabs defaultActiveKey="1" onChange={this.onChangeTab}>
        <TabPane tab="Split Equally" key="1">
          <List
            dataSource={participants}
            renderItem={item => {
              console.log(item);
              return (
                <ListItem>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between"
                    }}
                  >
                    <Checkbox />
                    {item.label}
                    {amount / parseFloat(participants.length)}
                  </div>
                </ListItem>
              );
            }}
          />
          <Divider type="horizontal" />
          <AddAmount value={amount} handleChange={handleAmountChange} />
        </TabPane>
        <TabPane tab="Split exactly" key="2" />
        <TabPane tab="Split percentually" key="3" />
      </Tabs>
    );
  }
}

export default CreateGroupForm;
