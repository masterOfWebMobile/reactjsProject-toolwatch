import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Tabs, {TabPane} from 'rc-tabs';
import Collapse from 'react-collapse';
import Tree, {TreeNode} from 'rc-tree';
import velocity from 'velocity-animate';
import classNames from 'classnames';
import _ from 'lodash';
import * as FaIcons from 'react-icons/lib/fa';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {setTab} from '../redux/actions/contentActions';

class CollapsiblePane extends Component {
  constructor(props) {
    super(props);
    this.state = {isOpened: true};
  }
  render() {
    const {isOpened} = this.state;
    return (
      <div className="collapsible-pane">
        <div className="pane-header">
          { isOpened ? React.createElement(FaIcons.FaAngleDoubleUp, {size: 15}) : React.createElement(FaIcons.FaAngleDoubleDown, {size: 15}) }
          <a onClick={(e) => this.setState({isOpened: !this.state.isOpened})} style={{width: '100%'}}><span>{this.props.title}</span></a>
        </div>
        <Collapse isOpened={this.state.isOpened} className="panel-content">
          {this.props.children}
        </Collapse>
      </div>
    );
  }
}

const primaryNavIcons = ["FaLineChart", "FaChain", "FaCube", "FaTicket", "FaClipboard", "FaTable", "FaCreditCard", "FaFileTextO", "FaCog", "FaTrash"];
const subNavIcons = {
  'Tools & Equipment': ["FaChainBroken", "FaChain", "FaSuitcase", "FaCut", "FaFileTextO"],
  'Materials & Consumables': ["FaCube", "FaCubes", "FaSignal", "FaFileTextO"],
  'Pick Tickets & Transfers': ["FaLaptop", "FaFileCodeO", "FaFileExcelO", "FaListOl", "FaFileTextO"],
  'Service & Calibration': ["FaSearch", "FaSliders", "FaCalendar", "FaFileTextO"],
  'Purchasing & Receiving': ["FaRandom", "FaShareAlt", "FaFileTextO"],
  'Job Cost & Billing': ["FaAnchor", "FaAreaChart", "FaBook", "FaFileWordO", "FaExternalLinkSquare", "FaBarChart", "FaFileTextO"],
  'Administration': ["FaUser", "FaUserSecret", "FaUserPlus", "FaCalendarCheckO"],
};

@connect(
  state => ({ content: state.content, sidemenu: state.sidemenu }),
  { setTab }
)
export default class SideMenu extends Component {
  static propTypes = {
    onMenuStyleChange: PropTypes.func,
    menuStyle: PropTypes.string
  };

	constructor(props) {
		super(props);
    this.state = {
      currentOrg: '',
      currentNavigator: props.sidemenu.navigators[0],
      //currentSubNavigator: null,
      currentCollapsedMenu: ''
    };

    this.handleOrgChange = this.handleOrgChange.bind(this);
    this.toggleMenuStyle = this.toggleMenuStyle.bind(this);
	}

  componentDidMount() {
    const {content: {currentTab, openTabs}} = this.props;
    const {currentNavigator} = this.state;
    if (!currentTab || !openTabs || !openTabs.length) {
      this.props.setTab(_.omit(currentNavigator, 'children'));
    }
  }

  renderOrgTree(data, prefixKey) {
    return data.map((item, index) => {
      const myKey = `${prefixKey}-${index}`;
      return (item.children ?
        <TreeNode key={myKey} title={item.name}>
          {this.renderOrgTree(item.children, myKey)}
        </TreeNode>
      :
        <TreeNode key={myKey} title={item.name} />
      );
    });
  }

  handleListItemClick(item) {
    alert(`You selected "${item}"`);
  }

  handleOrgChange(keys, e) {
    this.setState({currentOrg: e.node.props.eventKey}, () => alert(`Current picked org is "${e.node.props.title}"`));
  }

  handleNavigatorChange(item, e) {
    if (this.state.currentNavigator.name != item.name) {
      this.setState({currentNavigator: item, currentSubNavigator: null});
      if (item.tabType) {
        this.props.setTab(_.omit(item, 'children'));
      }
    }
  }

  handleSubNavigatorChange(item, e) {
    const {currentNavigator, currentSubNavigator} = this.state;
    //if ((!currentSubNavigator && item) || (currentSubNavigator && !item) || (currentSubNavigator && item && currentSubNavigator.name != item.name)) {
    //  this.setState({currentSubNavigator: item});
      if (item && item.tabType) {
        this.props.setTab(item);
      } else if (currentNavigator.tabType) {
        this.props.setTab(_.omit(currentNavigator, 'children'));
      }
    //}
  }

  toggleMenuStyle() {
    this.props.onMenuStyleChange(this.props.menuStyle !== 'collapsed');
  }

  render() {
    const {sidemenu: {lists, navigators, org_trees}, menuStyle} = this.props;
    const curPrimaryNavItem = this.state.currentNavigator ? this.state.currentNavigator : navigators[0];
    const {currentCollapsedMenu} = this.state;

    const listsMenuContent = <div className="tab-container">
      <div className="tab-header">
        <p className="tab-label">Lists</p>
        <a className="header-link" onClick={this.toggleMenuStyle}><FaIcons.FaEyedropper size={15} /></a>
        <a className="header-link"><FaIcons.FaClose size={15} /></a>
      </div>
      <div className="tab-content bg-gray">
        {lists.map((item, index) => {
          const myKey = `list-section-${index}`;
          return (
            <CollapsiblePane key={myKey} title={item.name}>
              {item.children.map((item1, index1) => <div key={`${myKey}-${index1}`} className="item"><a href="#" onClick={this.handleListItemClick.bind(this, item1.name)}>{`${item1.name}...`}</a></div>)}
            </CollapsiblePane>
          );
        })}
      </div>
    </div>;

    const navigatorMenuContent = <div className="tab-container">
      <div className="tab-header">
        <p className="tab-label">Navigator</p>
        <a className="header-link" onClick={this.toggleMenuStyle}><FaIcons.FaEyedropper size={15} /></a>
        <a className="header-link"><FaIcons.FaClose size={15} /></a>
      </div>
      <div className="tab-content fit-screen bg-white no-padding display-flex flex-column">
          <div className="nav-section" style={{flex: 0.8, paddingBottom: '20px'}}>
            <div className="nav-title" onClick={this.handleSubNavigatorChange.bind(this, null)}>{curPrimaryNavItem.name}</div>
            {!!curPrimaryNavItem.children &&
              curPrimaryNavItem.children.map((item, index) => {
                const icon = FaIcons[subNavIcons[curPrimaryNavItem.name][index]];
                const l = item.name;
                return <div key={`sub-nav-item-${index}`} className="nav-item no-bg" onClick={this.handleSubNavigatorChange.bind(this, item)}>{React.createElement(icon, {size: 30})} {l}</div>;
              })
            }
          </div>
          <div className="nav-section fill">
            {navigators.map((item, index) => {
              const icon = FaIcons[primaryNavIcons[index]];
              const l = item.name;
              return <div key={`nav-item-${index}`} className={classNames('nav-item', {active: this.state.currentNavigator == item})} onClick={this.handleNavigatorChange.bind(this, item)}>{React.createElement(icon, {size: 30})} {l}</div>;
            })}
          </div>
      </div>
    </div>;

    let collapsedMenu = null;
    if (menuStyle === 'collapsed' && currentCollapsedMenu) {
      switch (currentCollapsedMenu) {
        case 'lists':
          collapsedMenu = listsMenuContent;
          break;
        case 'navigator':
          collapsedMenu = navigatorMenuContent;
          break;
        case 'org_tree':
          collapsedMenu = orgTreeMenuContent;
          break;
        default:
          break;
      }
    }

    const orgTreeMenuContent = <div className="tab-container">
      <div className="tab-header">
        <p className="tab-label">Org Tree</p>
        <a className="header-link" onClick={this.toggleMenuStyle}><FaIcons.FaEyedropper size={15} /></a>
        <a className="header-link"><FaIcons.FaClose size={15} /></a>
      </div>
      <div className="tab-content fit-screen bg-white">
        <Tree defaultExpandAll={false} showIcon={false} onSelect={this.handleOrgChange} selectedKeys={[this.state.currentOrg]}>
          {this.renderOrgTree(org_trees, 'org-tree')}
        </Tree>
      </div>
    </div>;

    return (
      <div className={classNames('side-menu', {collapsed: menuStyle == 'collapsed'})}>
        {menuStyle == 'expanded' ?
          <Tabs defaultActiveKey="1">
            <TabPane tab='Lists' key="1">
              {listsMenuContent}
            </TabPane>
            <TabPane tab='Navigator' key="2">
              {navigatorMenuContent}
            </TabPane>
            <TabPane tab='Org Tree' key="3">
              {orgTreeMenuContent}
            </TabPane>
          </Tabs>
        :
          <div className="collapsed-menu-container">
            <div className="menu-labels">
              <p className="menu-item" onMouseOver={(e) => this.setState({currentCollapsedMenu: 'lists'})}>Lists</p>
              <p className="menu-item" onMouseOver={(e) => this.setState({currentCollapsedMenu: 'navigator'})}>Navigator</p>
              <p className="menu-item" onMouseOver={(e) => this.setState({currentCollapsedMenu: 'org_tree'})}>Org Tree</p>
            </div>

            <ReactCSSTransitionGroup transitionName="collapsed-menu" transitionEnterTimeout={200} transitionLeaveTimeout={100}>
              {currentCollapsedMenu === 'lists' ? <div key='collapsed-menu-1' className="collapsed-menu" onMouseLeave={(e) => this.setState({currentCollapsedMenu: ''})}>{listsMenuContent}</div> : null}
            </ReactCSSTransitionGroup>
            <ReactCSSTransitionGroup transitionName="collapsed-menu" transitionEnterTimeout={200} transitionLeaveTimeout={100}>
              {currentCollapsedMenu === 'navigator' ? <div key='collapsed-menu-2' className="collapsed-menu" onMouseLeave={(e) => this.setState({currentCollapsedMenu: ''})}>{navigatorMenuContent}</div> : null}
            </ReactCSSTransitionGroup>
            <ReactCSSTransitionGroup transitionName="collapsed-menu" transitionEnterTimeout={200} transitionLeaveTimeout={100}>
              {currentCollapsedMenu === 'org_tree' ? <div key='collapsed-menu-3' className="collapsed-menu" onMouseLeave={(e) => this.setState({currentCollapsedMenu: ''})}>{orgTreeMenuContent}</div> : null}
            </ReactCSSTransitionGroup>
          </div>
        }
      </div>
    );
  }
}
