import React from "react";
import { Input, Select, Icon } from "antd";

const Option = Select.Option;

export default class AddAmount extends React.Component {
  _onChange = e => {
    const { value } = e.target;
    const { handleChange } = this.props;
    const reg = /^(0|[1-9]\d*)(\.\d*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === "") {
      handleChange(value);
    }
  };

  _onBlur = () => {
    const { onBlur, handleChange, value } = this.props;
    const index = value.indexOf(".");
    if (index === value.length - 1) {
      handleChange(value.slice(0, -1));
    } else if (index > -1) {
      handleChange(value.slice(0, index + 3));
    }
    if (onBlur) {
      this.onBlur();
    }
  };
  render() {
    const { value } = this.props;
    console.log(value, this.props.handleChange);
    return (
      <Input
        value={value}
        onChange={this._onChange}
        onBlur={this._onBlur}
        placeholder="Input amount"
        maxLength="10"
        addonAfter={selectAfter}
      />
    );
  }
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
