import React from "react";
import { Form, Select, Icon, Divider, Checkbox, Input, Tabs, List } from "antd";
import AddAmount from "./AddAmountContainer";
import Dinero from "dinero.js";

const Option = Select.Option;
const TabPane = Tabs.TabPane;
const ListItem = List.Item;

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
class CreateGroupForm extends React.Component {
  constructor(props) {
    super(props);
  }

  onChangeTab(key) {
    console.log(key);
  }

  state = {
    checked: []
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
      console.error(error);
    }
  };

  componentDidMount() {
    this.setState(
      {
        checked: this.props.participants.map(el => true)
      },
      () => this.setSplits()
    );
  }

  render() {
    const { participants, amount, handleAmountChange, setSplits } = this.props;
    const integerAmount = parseInt(parseFloat(amount) * 100);
    let split = [];

    try {
      const splitArray = this.state.checked
        .filter(el => el === true)
        .map(el => 1);
      const price = Dinero({ amount: integerAmount, currency: "EUR" });
      split = price.allocate(splitArray);
    } catch (error) {
      console.error(error);
    }
    return (
      <Tabs defaultActiveKey="1" onChange={this.onChangeTab}>
        <TabPane tab="Split Equally" key="1">
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
                      justifyContent: "flex-start"
                    }}
                  >
                    <Checkbox
                      checked={this.state.checked[index]}
                      onChange={checked => this.onChange(checked, index)}
                    />
                    <h2 style={{ marginLeft: "20px" }}>{item.label}</h2>
                    <h2 style={{ position: "absolute", right: "0px" }}>
                      {this.state.checked[index]
                        ? split[index].toFormat("$0,0.00")
                        : Dinero({ amount: 0, currency: "EUR" }).toFormat(
                            "$0,0.00"
                          )}
                    </h2>
                    <h2 />
                  </div>
                </ListItem>
              );
            }}
          />

          <Divider type="horizontal" />
          <AddAmount />
        </TabPane>
        <TabPane tab="Split exactly" key="2" />
        <TabPane tab="Split percentually" key="3" />
      </Tabs>
    );
  }
}

export default CreateGroupForm;
