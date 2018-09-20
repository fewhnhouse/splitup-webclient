import React from "react";
import {
  Form,
  Input,
  DatePicker,
  Select,
  Tabs,
  Icon,
  Divider,
  Steps
} from "antd";
import AddAmount from "./AddAmount";

const FormItem = Form.Item;
const { TextArea } = Input;
const TabPane = Tabs.TabPane;
const Option = Select.Option;


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
      description,
      amount,
      handleAmountChange
    } = this.props;

    const { value } = this.state;

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

        <FormItem>
          <DatePicker />
        </FormItem>
        <Divider type="horizontal" />

        <FormItem>
          <AddAmount value={amount} handleChange={handleAmountChange} />
        </FormItem>
      </Form>
    );
  }
}

export default CreateGroupForm;
