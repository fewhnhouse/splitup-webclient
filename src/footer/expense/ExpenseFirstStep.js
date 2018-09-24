import React from "react";
import {
  Form,
  Input,
  DatePicker,
  Divider,
} from "antd";
import AddAmount from "./AddAmountContainer";

const FormItem = Form.Item;
const { TextArea } = Input;


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

  _onChangeTitle = e => {
    this.props.setTitle(e.target.value);
  };

  _onChangeDescription = e => {
    this.props.setDescription(e.target.value);
  };

  render() {
    const { title, description } = this.props;

    return (
      <Form>
        <FormItem>
          <Input
            value={title}
            onChange={this._onChangeTitle}
            placeholder="Title"
          />
        </FormItem>
        <FormItem>
          <TextArea
            value={description}
            onChange={this._onChangeDescription}
            placeholder="Description"
          />
        </FormItem>

        <FormItem>
          <DatePicker />
        </FormItem>
        <Divider type="horizontal" />

        <FormItem>
          <AddAmount />
        </FormItem>
      </Form>
    );
  }
}

export default CreateGroupForm;
