import { Transfer, Divider, Icon } from "antd";
import React from "react";

export default class TransferForm extends React.Component {
  state = {
    mockData: [],
    targetKeys: []
  };

  componentDidMount() {
    this.getMock();
  }

  getMock = () => {
    const targetKeys = [];
    const mockData = [];
    for (let i = 0; i < 10; i++) {
      const data = {
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        chosen: false
      };
      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
    }
    this.setState({ mockData, targetKeys });
  };

  filterOption = (inputValue, option) => {
    return option.description.indexOf(inputValue) > -1;
  };

  handleChange = targetKeys => {
    this.setState({ targetKeys });
  };

  render() {
    return (
      <Transfer
        listStyle={{ width: "45%" }}
        dataSource={this.state.mockData}
        showSearch
        filterOption={this.filterOption}
        targetKeys={this.state.targetKeys}
        onChange={this.handleChange}
        render={item =>
          item.key === "5" ? (
            <span>
              {item.title}<Icon type="user"/>
            </span>
          ) : (
            <span>{item.title}</span>
          )
        }
      />
    );
  }
}
