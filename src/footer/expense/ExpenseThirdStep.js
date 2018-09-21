import React from "react";
import { Form, Select, Icon, Divider, Checkbox, Input, Tabs, List } from "antd";
import AddAmount from "./AddAmount";
import Dinero from "dinero.js";

const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;
const FormItem = Form.Item;
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
    this.setState({
      checked: currentChecked
    });
  };

  componentDidMount() {
    this.setState({
      checked: this.props.participants.map(el => true)
    });
  }

  render() {
    const { participants, amount, handleAmountChange } = this.props;
    const integerAmount = parseInt(parseFloat(amount) * 100);
    const price = Dinero({ amount: integerAmount, currency: "EUR" });
    let split = [];
    const splitArray = this.state.checked
      .filter(el => el === true)
      .map(el => 1);
    try {
      split = price.allocate(splitArray);
    } catch (error) {
      console.error(error);
    }
    split.forEach(el => console.log(el.getAmount()));
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
          <AddAmount value={amount} handleChange={handleAmountChange} />
        </TabPane>
        <TabPane tab="Split exactly" key="2" />
        <TabPane tab="Split percentually" key="3" />
      </Tabs>
    );
  }
}

export default CreateGroupForm;
