// @flow

import React from 'react';

const InputEl = ({id}) => {
  <label>
    <input
      id={id}
      type='text'
      ref={(input) => { this.textInput = input; }}
      value={this.state}
      maxLength='90'
      size='90'
      onChange={this.handleChangeUsername}
    />
  </label>
};

export default InputEl;
