import React from "react";
import { Modal, Select, Spin } from "antd";
import { debounce } from "lodash";
import jsonp from "fetch-jsonp";
import querystring from "querystring";
import gql from "graphql-tag";

const Option = Select.Option;

const FRIENDS = gql`
    
`;

class AddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      value: [],
      fetching: false
    };
    this.timeout = null;
  }

  fetch = value => {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    this.setState({
      loading: true,
      value
    });

    const fake = () => {
      const str = querystring.encode({
        code: "utf-8",
        q: value
      });
      jsonp(`https://suggest.taobao.com/sug?${str}`)
        .then(response => response.json())
        .then(d => {
          if (this.state.value === value) {
            const result = d.result;
            const data = [];
            result.forEach(r => {
              data.push({
                value: r[0],
                text: r[0]
              });
            });
            console.log("data in fake:", data, this.state);
            this.setState({
              data,
              loading: false
            });
          }
        });
    };

    this.timeout = setTimeout(fake, 300);
  };

  handleSearch = value => {
    const debouncedFetch = debounce(this.fetch, 800);
    debouncedFetch(value);
  };

  handleChange = value => {
    this.setState({ value });
  };
  render() {
    const { visible, handleOk, handleCancel, type, placeholder } = this.props;
    const options = this.state.data.map(d => (
      <Option key={d.value}>{d.text}</Option>
    ));

    return (
      <Modal
        title={`Add ${type}`}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Select
          showSearch
          value={this.state.value}
          placeholder={this.props.placeholder}
          style={{ width: "100%" }}
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={false}
          onSearch={this.handleSearch}
          onChange={this.handleChange}
          notFoundContent={
            this.state.loading ? (
              <Spin size="small" />
            ) : this.state.data.length === 0 ? (
              <span>Nothing found.</span>
            ) : null
          }
        >
          {options}
        </Select>
      </Modal>
    );
  }
}

export default AddModal;
