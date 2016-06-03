import React, {Component} from 'react';
import { connect } from 'react-redux';
import Tabs, {TabPane} from 'rc-tabs';
import _ from 'lodash';
import {FaTimes} from 'react-icons/lib/fa';

import * as ContentComponents from './contents';
import {setTab, removeTab} from '../redux/actions/contentActions';

@connect(
  state => ({ content: state.content }),
  { setTab, removeTab }
) 
export default class MainContent extends Component {
	constructor(props) {
		super(props);
		this.onTabClick = this.onTabClick.bind(this);
  }

  onTabClick(key) {
    const {content: {openTabs}} = this.props;
  	this.props.setTab(_.find(openTabs, (t) => t.tabType == key));
  }

  removeTab(tab, e) {
    e.stopPropagation();
    if (this.props.content.openTabs.length > 0 ) {
      this.props.removeTab(tab);
    }
  }

  render() {
  	const {content: {currentTab, openTabs}} = this.props;
  	return (
  		<div className="container">
  			<Tabs activeKey={currentTab.tabType} onTabClick={this.onTabClick}>
  				{openTabs &&
  					openTabs.map((t, i) => {
              const componentName = _.upperFirst(_.camelCase(t.tabTitle));
  						return (
  							<TabPane tab={<div><span>{t.tabTitle}</span>{i > 0 && <a className="close-btn" onClick={this.removeTab.bind(this, t)}>X</a>}</div>} key={t.tabType}>
          				<p className="tabpane-label">{t.tabTitle}</p>
                  {ContentComponents[componentName] && React.createElement(ContentComponents[componentName], null)}
          			</TabPane>
          		);
  					})
  				}
         </Tabs>
  		</div>
  	);
  }
}
