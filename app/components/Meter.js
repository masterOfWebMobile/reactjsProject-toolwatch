import React, {Component, PropTypes} from 'react';
import _ from 'lodash';

export default class Meter extends Component {
  static propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
  };

  static defaultProps = {
    min: 0,
    max: 100,
    value: 0
  };

	constructor(props) {
		super(props);
  }

  render() {
    const {min, max, value} = this.props;
  	return (
  		<div className="meter-container">
  			<img className="meter-bg" src="/assets/images/meter.png" />        
        <div className="meter-needle" style={{transform: `rotate(${value / (max - min) * 180}deg)`}} />
        <div className="meter-centerpoint" />
  		</div>
  	);
  }
}
