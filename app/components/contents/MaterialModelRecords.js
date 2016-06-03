import React, {Component} from 'react';
import { connect } from 'react-redux';
import Tree, {TreeNode} from 'rc-tree';
import {AgGridReact} from 'ag-grid-react';
import {reactCellRendererFactory} from 'ag-grid-react';
import {FaSearch, FaPlus, FaPencil, FaDatabase, FaClose, FaExternalLinkSquare, FaPrint} from 'react-icons/lib/fa';
import _ from 'lodash';
import request from 'superagent';

import ImageCellRenderer from './ImageCellRenderer.js';

@connect(
  state => ({ content: state.content, sidemenu: state.sidemenu }),
  {}
)
export default class MaterialModelRecords extends Component {
	constructor(props) {
		super(props);
		this.state = {
      currentCategory: '',
      columnDefs: [
        {headerName: 'Image', field: 'image', cellRenderer: reactCellRendererFactory(ImageCellRenderer)},
        {headerName: 'Category', field: 'category'},
        {headerName: 'Manufacturer', field: 'manufacturer'},
        {headerName: 'Model', field: 'model'},
        {headerName: 'Description', field: 'description'},
        {headerName: 'Model Record ID', field: 'model_record_id'}
      ],
      rowData: [],
      page: 0,
      pageSize: 100,
      total: 0
		};
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  componentDidMount() {
    this.loadPage(0);
  }

  loadPage(pagenum) {
    this.setState({page: pagenum, rowData: []}, () => {
      const {page, pageSize} = this.state;
      request
        .get('http://localhost:3001/materialmodels')
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
        let q = { start: params.startRow, end: params.endRow };
        if (params.sortModel && params.sortModel.length > 0) {
          Object.assign(q, {sort_by: params.sortModel[0].colId, sort_order: params.sortModel[0].sort});
        }
        if (params.filterModel && params.filterModel.length > 0) {
          Object.assign(q, {filter_by: params.filterModel[0].colId, filter_value: params.filterModel[0].filter});
        }
        request
          .get('http://localhost:3001/materialmodels')
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
    this.columnApi.autoSizeColumns();
  }

  render() {
    const {sidemenu: {material_model_records}} = this.props;
    const {page, pageSize, rowData, columnDefs, total} = this.state;
  	return (
  		<div className="material-model-records fit-screen">
  			<div className="toolbar" style={{paddingLeft: '10px'}}>
  				<a className="btn bg-white black"><FaPlus size={20} style={{color: 'darkgreen'}} /> <span className="vertical-center"> Add Item</span></a>
  				<a className="btn bg-white black"><FaPencil size={20} style={{color: 'orange'}} /> <span className="vertical-center"> Edit Item</span></a>
  				<a className="btn bg-white black"><FaClose size={22} style={{color: 'red'}} /> <span className="vertical-center"> Delete Item</span></a>
          <a className="btn bg-white black"><FaDatabase size={17} style={{color: 'gray'}} /> <span className="vertical-center"> Add Inventory Record</span></a>
          <a className="btn bg-white black"><FaSearch size={20} style={{color: 'black'}} /> <span className="vertical-center"> Browse DataSource</span></a>
          <a className="btn bg-white black"><FaExternalLinkSquare size={22} style={{color: 'green'}} /> <span className="vertical-center"> Export Data</span></a>
          <a className="btn bg-white black"><FaPrint size={20} /> <span className="vertical-center"> Print</span></a>  			
        </div>
  			<div className="content">
  				<div className="view" style={{flex: 0.2}}>
  					<p style={{fontWeight: 'bold'}}>Explorer</p>
  					<div className="view-content">
  						<Tree defaultExpandAll={false} showIcon={false} onSelect={this.handleCategoryChange} selectedKeys={[this.state.currentCategory]}>
                {this.renderBrowserCategories(material_model_records, 'material-model-records')}
              </Tree>
  					</div>
  					
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
  					
  				</div>
  			</div>
  		</div>
  	);
  }
}
