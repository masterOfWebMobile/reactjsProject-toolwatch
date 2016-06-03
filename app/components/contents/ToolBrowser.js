import React, {Component} from 'react';
import { connect } from 'react-redux';
import Tree, {TreeNode} from 'rc-tree';
import {AgGridReact} from 'ag-grid-react';
import {reactCellRendererFactory} from 'ag-grid-react';
import {FaList, FaPlus, FaPencil, FaCut, FaExternalLinkSquare, FaPrint} from 'react-icons/lib/fa';
import _ from 'lodash';
import request from 'superagent';

import CheckboxCellRenderer from './CheckboxCellRenderer.js';

@connect(
  state => ({ content: state.content, sidemenu: state.sidemenu }),
  {}
)
export default class ToolBrowser extends Component {
	constructor(props) {
		super(props);
		this.state = {
      currentCategory: '',
      columnDefs: [
        {headerName: '', width: 30, suppressSorting: true, suppressMenu: true, suppressResize: true},
        {headerName: 'Category', field: 'category'},
        {headerName: 'Number', field: 'number'},
        {headerName: 'Bar Code', field: 'bar_code'},
        {headerName: 'Serial Number', field: 'serial_number'},
        {headerName: 'Kit', field: 'kit'},
        {headerName: 'T', field: 't'},
        {headerName: 'Description', field: 'description'},
        {headerName: 'Model', field: 'model'},
        {headerName: 'Qty', field: 'qty'},
        {headerName: 'Status', field: 'status'},
        {headerName: 'Assignment', field: 'assignment'},
        {headerName: 'Pl', field: 'pl', cellRenderer: reactCellRendererFactory(CheckboxCellRenderer)},
        {headerName: 'Owner', field: 'owner'},
        {headerName: 'Manager', field: 'manager'},
        {headerName: 'Department', field: 'department'},
        {headerName: 'Supervisor', field: 'supervisor'},
      ],
      rowData: [ /*
        {category: 'Adhesive Gun', number: 51515685, bar_code: '62', serial_number: '12345', kit: '', t: 'T', description: 'test', model: '1230123b', qty: 1, status: 'AWS', assignment: 'Sigma Warehouse', pl: false, owner: 'Sigma Warehouse', manager: 'Sigma Warehouse', department: 'Excavating Dept.', supervisor: 'abcdefgh'},
      	{category: 'Adhesive Gun', number: 15177, bar_code: '4513128', serial_number: '67890', kit: '', t: 'T', description: 'test', model: '1230123b', qty: 1, status: 'AWS', assignment: 'Sigma Warehouse', pl: true, owner: 'Sigma Warehouse', manager: 'Sigma Warehouse', department: 'Excavating Dept.', supervisor: 'abcdefgh'},
      	{category: 'Adhesive Gun', number: 51515780, bar_code: '180', serial_number: '13579', kit: '', t: 'T', description: 'test', model: '1230123b', qty: 1, status: 'AWS', assignment: 'Sigma Warehouse', pl: false, owner: 'Sigma Warehouse', manager: 'Sigma Warehouse', department: 'Excavating Dept.', supervisor: 'abcdefgh'}
      */ ],
      page: 0,
      pageSize: 100,
      total: 0
		};
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.state.rowData = _.fill(Array(100), {category: 'Adhesive Gun', number: 51515685, bar_code: '62', serial_number: '12345', kit: '', t: 'T', description: 'test', model: '1230123b', qty: 1, status: 'AWS', assignment: 'Sigma Warehouse', pl: false, owner: 'Sigma Warehouse', manager: 'Sigma Warehouse', department: 'Excavating Dept.', supervisor: 'abcdefgh'});
  }

  componentDidMount() {
    this.loadPage(0);
  }

  loadPage(pagenum) {
    this.setState({page: pagenum, rowData: []}, () => {
      const {page, pageSize} = this.state;
      request
        .get('http://localhost:3001/tools')
        .set('Content-Type', 'application/json')
        .query({start: page * pageSize, end: (page + 1) * pageSize})
        .end((err, res) => {
          if (res && res.statusCode == 200) {
            this.setState({rowData: res.body.data, total: res.body.total});
          }
        });
    });
  }

  handleCategoryChange(keys, e) {
    this.setState({currentCategory: e.node.props.eventKey}, () => {
    	if (!e.node.props.children) {
    		alert(`Current picked org is "${e.node.props.title}"`);
    	}
    });
  }

  renderBrowserCategories(data, prefixKey) {
    return data.map((item, index) => {
      const myKey = `${prefixKey}-${index}`;
      return (item.children ?
        <TreeNode key={myKey} title={item.name}>
          {this.renderBrowserCategories(item.children, myKey)}
        </TreeNode>
      :
        <TreeNode key={myKey} title={item.name} />        
      );
    });
  }

  getDataSource() {
    return {
      pageSize: 100,
      getRows: (params) => {
        console.log('asking for ', params);
        // At this point in your code, you would call the server, using $http if in AngularJS.
        // To make the demo look real, wait for 500ms before returning
        let q = { start: params.startRow, end: params.endRow };
        if (params.sortModel && params.sortModel.length > 0) {
          Object.assign(q, {sort_by: params.sortModel[0].colId, sort_order: params.sortModel[0].sort});
        }
        if (params.filterModel && params.filterModel.length > 0) {
          Object.assign(q, {filter_by: params.filterModel[0].colId, filter_value: params.filterModel[0].filter});
        }
        request
          .get('http://localhost:3001/tools')
          .set('Content-Type', 'application/json')
          .query(q)
          .end((err, res) => {
            if (res && res.statusCode == 200) {
                // if on or after the last page, work out the last row.
                var lastRow = -1; // params.endRow
                // call the success callback
                if (10000 <= params.endRow) {
                  lastRow = 10000;
                }
                params.successCallback(res.body.data, lastRow);
            }
          });
      }
    };
  }

  onGridReady(params) {
    this.api = params.api;
    this.columnApi = params.columnApi;
    console.log('grid ready');
    // this.api.setDatasource(this.getDataSource());
    this.columnApi.autoSizeColumns();
  }

  render() {
    const {sidemenu: {tool_browser_categories}} = this.props;
    const {page, pageSize, rowData, columnDefs, total} = this.state;
  	return (
  		<div className="tool-browser fit-screen">
  			<div className="toolbar">
  				<a className="btn bg-white black"><FaPlus size={20} style={{color: 'darkgreen'}} /> Add Item</a>
  				<a className="btn bg-white black"><FaPencil size={20} style={{color: 'darkblue'}} /> Edit Item</a>
  				<a className="btn bg-white black"><FaCut size={20} style={{color: 'orange'}} /> Retire Item</a>
  				<a className="btn bg-white black"><FaExternalLinkSquare size={20} style={{color: 'green'}} /> Export Data</a>
  				<a className="btn bg-white black"><FaPrint size={20} /> Print</a>
  			</div>
  			<div className="content">
  				<div className="view" style={{flex: 0.2}}>
  					<p style={{fontWeight: 'bold'}}>Explorer</p>
  					<div className="view-content">
  						<Tree defaultExpandAll={false} showIcon={false} onSelect={this.handleCategoryChange} selectedKeys={[this.state.currentCategory]}>
  							{this.renderBrowserCategories(tool_browser_categories, 'tool-browser-categories')}
  						</Tree>
  					</div>
  					<a className="btn bg-gray black" style={{display: 'inline-table'}}>Search...</a>
  				</div>
  				<div className="view" style={{flex: 0.8}}>
  					<div className="grid-header">
              <p>Page Size:&nbsp;&nbsp;&nbsp;</p>
              <select value={pageSize} onChange={(e) => this.setState({pageSize: e.target.value}, () => this.loadPage(0))} style={{marginRight: '30px'}}>
                <option value={100}>100</option>
                <option value={200}>200</option>
                <option value={500}>500</option>
                <option value={1000}>1000</option>
                <option value={2000}>2000</option>
                <option value={5000}>5000</option>
                <option value={10000}>10000</option>
              </select>
              <button disabled={page == 0} onClick={this.loadPage.bind(this, 0)}>first</button>
              <button disabled={page == 0} onClick={this.loadPage.bind(this, page - 1)}>prev</button>
              <p>{`${page * pageSize + 1} to ${(page + 1) * pageSize} of ${total ? total : 'more'}`}</p>
              <button disabled={page == (Math.ceil(total / pageSize) - 1)} onClick={this.loadPage.bind(this, page + 1)}>next</button>
              <button disabled={page == (Math.ceil(total / pageSize) - 1)} onClick={this.loadPage.bind(this, total / pageSize - 1)}>last</button>
            </div>
  					<div className="view-content ag-fresh">
  						<AgGridReact
  							onGridReady={this.onGridReady.bind(this)}
  							suppressCellSelection={true}
						    showToolPanel={false}
						    enableFilter={false}
						    enableColResize={true}
                enableSorting={true}
						    columnDefs={columnDefs}
                rowData={rowData}
						    rowSelection="single"
						    rowHeight={22}
							/>
  					</div>
  					<div style={{height: '37px', display: 'flex', alignItems: 'center'}}>
  						<div style={{display: 'inline-block', marginRight: '20px'}}><input type="checkbox" defaultChecked={false} value="explorer_kits" /> Explode Kits</div>
  						<div style={{display: 'inline-block'}}><input type="checkbox" defaultChecked={false} value="expanded_view" /> Explanded View</div>
  					</div>
  				</div>
  			</div>
  		</div>
  	);
  }
}
