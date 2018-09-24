import React from "react";
import Dinero from "dinero.js";
import { List, Checkbox, Input } from "antd";

const ListItem = List.Item;
export default class EqualSplit extends React.Component {
  state = {
    checked: [],
    inputs: []
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

  componentDidMount() {
    this.setState(
      {
        checked: this.props.participants.map(el => true),
        inputs: this.props.participants.map(el => 0)
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
      const integerAmount = parseInt(parseFloat(amount) * 100);
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
    currentInputs[index] = e.target.value;

    this.setState({
      inputs: currentInputs
    });
  };
  render() {
    const { participants, amount, splitKey } = this.props;

    const integerAmount = parseInt(parseFloat(amount) * 100);
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
      <List
        style={{
          maxHeight: "200px",
          overflowY: "scroll"
        }}
        dataSource={participants}
        renderItem={(item, index) => {
          console.log(split, index);
          return (
            <ListItem>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "flex-start"
                }}
              >
                <Checkbox
                  checked={this.state.checked[index]}
                  onChange={checked => this.onChange(checked, index)}
                />
                <h2 style={{ marginLeft: "20px" }}>{item.label}</h2>
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
                    style={{ position: "absolute", right: "0px" }}
                    value={this.state.inputs[index]}
                    onChange={value => this.onInputChange(value, index)}
                  />
                ) : null}
                <h2 />
              </div>
            </ListItem>
          );
        }}
      />
    );
  }
}
