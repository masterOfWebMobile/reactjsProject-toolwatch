import React, {Component, PropTypes} from 'react';

export default class DashboardSection extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  };

  static defaultProps = {
    title: ''
  };

	constructor(props) {
		super(props);
  }

  render() {
    const {title, children, style} = this.props;
  	return (
  		<div className="dashboard-section" style={{...style}}>
  			<p className="title">{title}</p>
        <div className="content">
          {children}
        </div>
  		</div>
  	);
  }
}
