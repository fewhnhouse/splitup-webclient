import React from "react";
import { Form, Select, Icon, Divider, Input  } from "antd";

const Option = Select.Option;
const FormItem = Form.Item;

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
    return (
      <Form>
        <FormItem>
          <Input placeholder="Splits" />
        </FormItem>
        <FormItem>
          <Select disabled placeholder="Add participants" />
        </FormItem>
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
