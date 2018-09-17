import React from "react";
import { Form, Input, DatePicker, Select, Tabs, Icon } from "antd";
import Transfer from "./Transfer";

const FormItem = Form.Item;
const { TextArea } = Input;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

function formatNumber(value) {
  value += "";
  const list = value.split(".");
  const prefix = list[0].charAt(0) === "-" ? "-" : "";
  let num = prefix ? list[0].slice(1) : list[0];
  let result = "";
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ""}`;
}

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
    this.state = {
      name: "",
      email: "",
      token: "",
      value: ""
    };
  }

  onChangeTab(key) {
    console.log(key);
  }

  onChange = e => {
    const { value } = e.target;
    const reg = /^(0|[1-9]\d*)(\.\d*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === "") {
      this.setState({
        value
      });
    }
  };

  onBlur = () => {
    const { onBlur } = this.props;
    const { value } = this.state;
    const index = value.indexOf(".");
    if (index === value.length - 1) {
      this.setState({
        value: value.slice(0, -1)
      });
    } else if (index > -1) {
      this.setState({
        value: value.slice(0, index + 3)
      });
    }
    if (onBlur) {
      this.onBlur();
    }
  };

  render() {
    const {
      title,
      onChangeTitle,
      onChangeDescription,
      description
    } = this.props;

    const { value } = this.state;

    const numberTitle = value ? (
      <span className="numeric-input-title">
        {value !== "-" ? formatNumber(value) : "-"}
      </span>
    ) : (
      "Input a number"
    );
    return (
      <Form>
        <FormItem>
          <Input value={title} onChange={onChangeTitle} placeholder="Title" />
        </FormItem>
        <FormItem>
          <TextArea
            value={description}
            onChange={onChangeDescription}
            placeholder="Description"
          />
        </FormItem>
        <Form layout="inline">
          <FormItem>
            <Input
              value={this.state.value}
              onChange={this.onChange}
              onBlur={this.onBlur}
              placeholder="Input a number"
              maxLength="25"
              addonAfter={selectAfter}
            />
          </FormItem>
          <FormItem>
            <DatePicker />
          </FormItem>
        </Form>
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
      </Form>
    );
  }
}

export default CreateGroupForm;
