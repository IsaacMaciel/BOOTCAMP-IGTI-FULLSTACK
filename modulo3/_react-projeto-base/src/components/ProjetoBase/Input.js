import React, { Component } from "react";

export default class Input extends Component {

  checkDisabled = (value) => {
    if (value) {
      return 'disabled'
    } 
  }

  render() {
    const {labelName, input,value,disabled,type,style,color} = this.props;
    return (

        <div className={!style ? 'input-field col s3' : style}>
          <input
            value={value}
            id="first_name2"
            type={type}
            className="validate"
            onChange={input}
            readOnly={disabled}
            style={{color: color}}
            step={100}        
          />
          <label className="active" for="first_name2">
            {labelName}
          </label>
        </div>

    );
  }
}
