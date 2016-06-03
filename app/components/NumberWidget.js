import React, {Component, PropTypes} from 'react';
import _ from 'lodash';

export default class NumberWidget extends Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired
  };

  static defaultProps = {
    value: 0,
    length: 8
  };

	constructor(props) {
		super(props);
  }

  render() {
    const {value, length} = this.props;
  	return (
  		<div className="number-widget">
        <span>{`${value >= 0 ? '+' : '-'}${_.padStart(value.toString(), length, '0')}`}</span>
  		</div>
  	);
  }
}
