import React, {Component} from 'react';
import Dock from 'react-dock';

import {SideMenu, MainContent} from '../components';

const max_sidemenu_size = 0.2;

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sidemenu_size: max_sidemenu_size,
			collapsed: false
		};
	}

	setCollpased(val) {
		this.setState({collapsed: val});
	}

  render() {
  	const {sidemenu_size, collapsed} = this.state;
		const sidemenu = <SideMenu onMenuStyleChange={this.setCollpased.bind(this)} menuStyle={collapsed ? 'collapsed': 'expanded'} />;
    return (
      <div className="app-container">
				{collapsed ? sidemenu :
					<Dock position="left" size={sidemenu_size} isVisible={true} dimMode="none" onSizeChange={(size) => this.setState({sidemenu_size: Math.min(size, max_sidemenu_size)})}>
						{sidemenu}
					</Dock>
				}
      	<div className="app-content" style={{marginLeft: collapsed ? '30px' : `${sidemenu_size * 100}%`}}>
      		<MainContent />
      	</div>
      </div>
    );
  }
}
