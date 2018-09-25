import React from "react";
import Dinero from "dinero.js";
import {
  List,
  Checkbox,
  Input,
  InputNumber,
  Icon,
  Button,
  Progress
} from "antd";

const ListItem = List.Item;
export default class EqualSplit extends React.Component {
  state = {
    checked: [],
    inputs: [],
    numberInputs: []
  };

  onChange = (e, index) => {
    let currentChecked = this.state.checked;
    currentChecked[index] = e.target.checked;
    this.setState(
      {
        checked: currentChecked
      },
      () => this.setSplits()
    );
  };

  _onBlur = index => {
    const { onBlur } = this.props;
    const amount = this.state.inputs[index];
    const commaIndex = amount.indexOf(".");
    let currentInputs = this.state.inputs;
    if (commaIndex === amount.length - 1) {
      currentInputs[index] = amount.slice(0, -1);
      this.setState({ inputs: currentInputs });
    } else if (commaIndex > -1) {
      currentInputs[index] = amount.slice(0, commaIndex + 3);
      this.setState({ inputs: currentInputs });
    }
    if (onBlur) {
      this.onBlur();
    }
  };

  componentDidMount() {
    this.setState(
      {
        checked: this.props.participants.map(el => true),
        inputs: this.props.participants.map(el => 0),
        numberInputs: this.props.participants.map(el => 0)
      },
      () => this.setSplits()
    );
  }

  setSplits = () => {
    const { amount, participants, setSplits } = this.props;
    const splitArray = this.state.checked
      .filter(el => el === true)
      .map(el => 1);
    try {
      const integerAmount = parseInt(parseFloat(amount) * 100, 10);
      const price = Dinero({ amount: integerAmount, currency: "EUR" });
      const split = price.allocate(splitArray);
      const parentSplits = split.map((el, index) => {
        return { amount: el.getAmount(), id: participants[index].key };
      });
      setSplits(parentSplits);
    } catch (error) {
      //console.error(error);
    }
  };

  onInputChange = (e, index) => {
    let currentInputs = this.state.inputs;
    const { value } = e.target;
    const reg = /^(0|[1-9]\d*)(\.\d*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === "") {
      currentInputs[index] = value;
      this.setState({
        inputs: currentInputs
      });
    }
  };

  onNumberInputChange = (e, index) => {
    let currentNumberInputs = this.state.numberInputs;
    currentNumberInputs[index] = e;
    this.setState({
      numberInputs: currentNumberInputs
    });
  };

  checkPercentageSum = () => {
    return this.state.numberInputs.length
      ? this.state.numberInputs.reduce((acc, curr) => acc + curr)
      : 0;
  };

  checkNumberSum = () => {
    const { amount } = this.props;
    if(amount === "") {
        return 0;
    }
    const sum = this.state.inputs.length
      ? this.state.inputs.reduce((acc, curr) => parseFloat(acc) + parseFloat(curr))
      : 0;
      const percent =  sum / parseFloat(amount) * 100;
    return percent.toFixed(2)
  };

  render() {
    const { participants, amount, splitKey } = this.props;

    const integerAmount = parseInt(parseFloat(amount) * 100, 10);
    let split = [];

    try {
      const splitArray = this.state.checked
        .filter(el => el === true)
        .map(el => 1);
      const price = Dinero({ amount: integerAmount, currency: "EUR" });
      split = price.allocate(splitArray);
    } catch (error) {
      //console.error(error);
    }

    return (
      <div>
        <List
          style={{
            maxHeight: "200px",
            overflowY: "scroll"
          }}
          dataSource={participants}
          renderItem={(item, index) => {
            return (
              <ListItem>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start"
                    }}
                  >
                    <Checkbox
                      checked={this.state.checked[index]}
                      onChange={checked => this.onChange(checked, index)}
                    />
                    <h2 style={{ marginLeft: "20px" }}>{item.label}</h2>
                  </div>
                  {splitKey === "1" ? (
                    <h2 style={{ position: "absolute", right: "0px" }}>
                      {this.state.checked[index]
                        ? Dinero({
                            amount: split[0] ? split[0].getAmount() : 0,
                            currency: "EUR"
                          }).toFormat("$0,0.00")
                        : Dinero({ amount: 0, currency: "EUR" }).toFormat(
                            "$0,0.00"
                          )}
                    </h2>
                  ) : splitKey === "2" ? (
                    <Input
                      style={{
                        position: "absolute",
                        right: "0px",
                        width: "150px"
                      }}
                      addonAfter={<Icon type="euro" />}
                      value={this.state.inputs[index]}
                      onChange={value => this.onInputChange(value, index)}
                      onBlur={() => this._onBlur(index)}
                    />
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        width: "60%"
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          overflow: "auto",
                          maxWidth: "200px",
                          paddingBottom: "10px"
                        }}
                      >
                        <Button
                          type="primary"
                          onClick={() => this.onNumberInputChange(10, index)}
                          ghost
                          style={{ marginLeft: "20px" }}
                        >
                          10%
                        </Button>
                        <Button
                          onClick={() => this.onNumberInputChange(25, index)}
                          type="primary"
                          ghost
                          style={{ marginLeft: "20px" }}
                        >
                          25%
                        </Button>
                        <Button
                          onClick={() => this.onNumberInputChange(50, index)}
                          type="primary"
                          ghost
                          style={{ marginLeft: "20px" }}
                        >
                          50%
                        </Button>
                        <Button
                          onClick={() => this.onNumberInputChange(75, index)}
                          type="primary"
                          ghost
                          style={{ marginLeft: "20px" }}
                        >
                          75%
                        </Button>
                      </div>

                      <InputNumber
                        min={0}
                        max={100}
                        formatter={value => `${value}%`}
                        style={{
                          marginLeft: "20px",
                          width: "75px"
                        }}
                        value={this.state.numberInputs[index]}
                        onChange={value =>
                          this.onNumberInputChange(value, index)
                        }
                      />
                    </div>
                  )}
                </div>
              </ListItem>
            );
          }}
        />
        {splitKey !== "1" ? (
          <Progress style={{width: "90%"}} percent={ splitKey === "2" ? this.checkNumberSum() : this.checkPercentageSum()} />
        ) : null}
      </div>
    );
  }
}
