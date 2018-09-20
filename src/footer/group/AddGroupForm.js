import React from "react";
import { Form, Input } from "antd";

const FormItem = Form.Item;
const { TextArea } = Input;
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
          <TextArea
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
