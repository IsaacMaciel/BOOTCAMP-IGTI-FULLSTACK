import React, { Component } from "react";

export default class ProjetoBase extends Component {

  checkDisabled = (value) => {
    if (value) {
      return 'disabled'
    } 
  }

  render() {
    const {labelName, input,value,disabled} = this.props;
    return (
      <div className="row">
        <div className="input-field col s6">
          <input
            value={value}
            id="first_name2"
            type="number"
            className="validate"
            onChange={input}
            disabled={disabled}        
          />
          <label className="active" for="first_name2">
            {labelName}
          </label>
        </div>
      </div>
    );
  }
}
