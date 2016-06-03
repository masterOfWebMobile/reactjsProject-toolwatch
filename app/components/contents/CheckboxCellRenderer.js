import React, {Component, PropTypes} from 'react';

import {FaCheckSquareO, FaSquareO} from 'react-icons/lib/fa';

export default class CheckboxCellRenderer extends Component {
  render() {
    var params = this.props.params;
    return params.value ? <FaCheckSquareO size={20} /> : <FaSquareO size={20} />;
  }
}

// the grid will always pass in one props called 'params',
// which is the grid passing you the params for the cellRenderer.
// this piece is optional. the grid will always pass the 'params'
// props, so little need for adding this validation meta-data.
CheckboxCellRenderer.propTypes = {
  params: PropTypes.object
};