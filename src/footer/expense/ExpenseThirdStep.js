import React from "react";
import { Divider, Radio } from "antd";
import AddAmount from "./AddAmountContainer";
import EqualSplit from "./EqualSplitContainer";


class CreateGroupForm extends React.Component {



  state = {
    checked: [],
    radio: "1"
  };

  _onChangeRadio = e => {
    this.setState({
      radio: e.target.value
    });
  };

  render() {
    
    return (
      <div>
        <div style={{ textAlign: "center" }}>
          <Radio.Group
            defaultValue={this.state.radio}
            value={this.state.radio}
            onChange={this._onChangeRadio}
            buttonStyle="solid"
          >
            <Radio.Button value="1">Split Equally</Radio.Button>
            <Radio.Button value="2">Split Exactly</Radio.Button>
            <Radio.Button value="3">Split Percentually</Radio.Button>
          </Radio.Group>
        </div>
        <EqualSplit splitKey={this.state.radio}/>
        <Divider type="horizontal" />
        <AddAmount />
      </div>
    );
  }
}

export default CreateGroupForm;
