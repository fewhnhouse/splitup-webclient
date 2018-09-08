import React from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import "./LoginForm.css";

const FormItem = Form.Item;

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      token: ""
    };
  }
  handleSubmit = (e, mutate, setLoginData) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        mutate({
          variables: {
            email: values.email,
            password: values.password
          }
        }).then(
          res => {
            const { name, email } = res.data.login.user;
            const token = res.data.login.token;
            localStorage.setItem("username", name);
            localStorage.setItem("email", email);
            localStorage.setItem("token", token);
            this.props.client.resetStore();
            setLoginData(name, email);
          },
          err => console.log(err)
        );
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { mutate, setLoginData } = this.props;
    return (
      <Form
        onSubmit={e => this.handleSubmit(e, mutate, setLoginData)}
        className="login-form"
      >
        <FormItem>
          {getFieldDecorator("email", {
            rules: [{ required: true, message: "Please input your email!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="email"
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
          {getFieldDecorator("remember", {
            valuePropName: "checked",
            initialValue: true
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Sign in
          </Button>
          Or <a onClick={this.props.switchView}>register now!</a>
        </FormItem>
      </Form>
    );
  }
}

const WrappedLoginForm = Form.create()(LoginForm);

export default WrappedLoginForm;
