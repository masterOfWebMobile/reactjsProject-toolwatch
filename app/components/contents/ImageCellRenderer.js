import React, {Component, PropTypes} from 'react';
import request from 'superagent';

export default class ImageCellRenderer extends Component {
  render() {
    const {value} = this.props.params;
    return <img src={value} style={{height:'100%'}}/>
  }
}

// the grid will always pass in one props called 'params',
// which is the grid passing you the params for the cellRenderer.
// this piece is optional. the grid will always pass the 'params'
// props, so little need for adding this validation meta-data.
ImageCellRenderer.propTypes = {
  params: PropTypes.object
};