import React from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";

const FormItem = Form.Item;

class CreateGroupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      token: ""
    };
  }

  render() {
    const {
      title,
      onChangeTitle,
      onChangeDescription,
      description
    } = this.props;
    return (
      <Form>
        <FormItem>
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            value={title}
            onChange={onChangeTitle}
            placeholder="title"
          />
        </FormItem>
        <FormItem>
          <Input
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            value={description}
            onChange={onChangeDescription}
            placeholder="description"
          />
        </FormItem>
      </Form>
    );
  }
}

export default CreateGroupForm;
