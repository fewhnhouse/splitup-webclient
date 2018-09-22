import React from "react";
import { Input, Select, Icon } from "antd";

const Option = Select.Option;

export default class AddAmount extends React.Component {
  _onChange = e => {
    const { value } = e.target;
    const { setAmount } = this.props;
    const reg = /^(0|[1-9]\d*)(\.\d*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === "") {
      setAmount(value);
    }
  };

  _onBlur = () => {
    const { onBlur, setAmount, amount } = this.props;
    const index = amount.indexOf(".");
    if (index === amount.length - 1) {
      setAmount(amount.slice(0, -1));
    } else if (index > -1) {
      setAmount(amount.slice(0, index + 3));
    }
    if (onBlur) {
      this.onBlur();
    }
  };
  render() {
    const { amount } = this.props;
    return (
      <Input
        value={amount}
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
