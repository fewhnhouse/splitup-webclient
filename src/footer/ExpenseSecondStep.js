import React from "react";
import { Form, Select, Tabs, Icon, Divider, Input } from "antd";

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

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class CreateGroupForm extends React.Component {
  constructor(props) {
    super(props);
  }

  onChangeTab(key) {
    console.log(key);
  }

  render() {
    return (
      <Form>
        <Tabs defaultActiveKey="1" onChange={this.onChangeTab}>
          <TabPane tab="Group Expense" key="1">
            <FormItem>
              <Select placeholder="Add expense to group" />
            </FormItem>
            <FormItem>
              <Select disabled placeholder="Add participants" />
            </FormItem>
          </TabPane>
          <TabPane tab="Standalone Expense" key="2">
            <FormItem>
              <Select placeholder="Add participants" />
            </FormItem>
          </TabPane>
        </Tabs>
        <Divider type="horizontal" />

        <FormItem>
          <Input
            value={0}
            placeholder="Input amount"
            maxLength="10"
            addonAfter={selectAfter}
          />
        </FormItem>
      </Form>
    );
  }
}

export default CreateGroupForm;
