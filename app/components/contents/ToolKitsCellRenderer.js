import React, {Component, PropTypes} from 'react';

import {FaInbox} from 'react-icons/lib/fa';

export default class CheckboxCellRenderer extends Component {
  render() {
    return <FaInbox size={20} style={{color: 'red'}}/>;
  }
}
