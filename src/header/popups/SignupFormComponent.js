import React from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import "./LoginForm.css";

const FormItem = Form.Item;

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      token: ""
    };
  }
  handleSubmit = (e, mutate) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        mutate({
          variables: {
            email: values.email,
            name: values.name,
            password: values.password
          }
        }).then(
          res => {
            if (values.signin) {
              const { id, name, email } = res.data.signup.user;
              const token = res.data.signup.token;
              localStorage.setItem("name", name);
              localStorage.setItem("email", email);
              localStorage.setItem("id", id);
              localStorage.setItem("token", token);
              this.props.addMe(id, name, email, token);
              this.props.client.resetStore();
            } else {
              this.props.switchView();
            }
          },
          err => console.log(err)
        );
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { mutate } = this.props;
    return (
      <Form onSubmit={e => this.handleSubmit(e, mutate)} className="login-form">
        <FormItem>
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "Please input your Name!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="user"
              placeholder="Name"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("email", {
            rules: [{ required: true, message: "Please input your email!" }]
          })(
            <Input
              prefix={
                <Icon type="inbox" style={{ color: "rgba(0,0,0,.25)" }} />
              }
              placeholder="Email"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("signin", {
            valuePropName: "checked",
            initialValue: true
          })(<Checkbox>Sign in after completion</Checkbox>)}
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Sign up
          </Button>
          Or <a onClick={this.props.switchView}>sign in!</a>
        </FormItem>
      </Form>
    );
  }
}

const WrappedSignupForm = Form.create()(SignupForm);

export default WrappedSignupForm;
