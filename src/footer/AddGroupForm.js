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
          <Input value={title} onChange={onChangeTitle} placeholder="Title" />
        </FormItem>
        <FormItem>
          <Input
            value={description}
            onChange={onChangeDescription}
            placeholder="Description"
          />
        </FormItem>
      </Form>
    );
  }
}

export default CreateGroupForm;
