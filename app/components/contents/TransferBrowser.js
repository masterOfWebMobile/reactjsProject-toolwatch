import React, {Component} from 'react';
import { connect } from 'react-redux';
import Tree, {TreeNode} from 'rc-tree';
import {AgGridReact} from 'ag-grid-react';
import {reactCellRendererFactory} from 'ag-grid-react';
import DatePicker from 'react-datepicker';
import {FaList, FaPlus, FaPencil, FaCut, FaExternalLinkSquare, FaPrint} from 'react-icons/lib/fa';
import _ from 'lodash';
import request from 'superagent';

import CheckboxCellRenderer from './CheckboxCellRenderer.js';
import {API_CONFIG} from '../../constants';

const transferredFromList = ['Henry, Chris', 'Contanzo, Frank', 'Wright, Tami', 'Donovan, Tom', 'Bob, Jim'];
const transferredToList = ['Admin, Sigma', 'McDonald, Craig', 'Fish, Ron', 'Testing duplicate', 'Battia, Jake'];

@connect(
  state => ({ content: state.content, sidemenu: state.sidemenu }),
  {}
)
export default class TransferBrowser extends Component {
	constructor(props) {
		super(props);
		this.state = {
      currentCategory: '',
      columnDefs: [
        {headerName: 'Transfer Date', field: 'transfer_date'},
        {headerName: 'Assignment Date', field: 'assignment_date'},
        {headerName: 'Number', field: 'number'},
        {headerName: 'Transferred From', field: 'transferred_from'},
        {headerName: 'Transferred To', field: 'transferred_to'},
        {headerName: 'Transferred By', field: 'transferred_by'},
        {headerName: 'Delivered By', field: 'delivered_by'},
        {headerName: 'Document No.', field: 'document_no'}
      ],
      rowData: [],
      transferFromNo: null,
      transferToNo: null,
      transferredFrom: '',
      transferredTo: '',
      assignmentFromDate: null,
      assignmentToDate: null,
      isOffline: null,
      searchParams: {
	      transferFromNo: null,
	      transferToNo: null,
	      transferredFrom: '',
	      transferredTo: '',
	      assignmentFromDate: null,
	      assignmentToDate: null,
	      isOffline: null,
      },
      page: 0,
      pageSize: 100,
      total: 0,
		};
		this.clearSearch = this.clearSearch.bind(this);
		this.doSearch = this.doSearch.bind(this);
  }

  componentDidMount() {
    // this.loadPage(0);
  }

  loadPage(pagenum) {
    this.setState({page: pagenum, rowData: []}, () => {
      const {searchParams: {transferFromNo, transferToNo, transferredFrom, transferredTo, assignmentFromDate, assignmentToDate, isOffline}, page, pageSize} = this.state;
      const q = {transferFromNo, transferToNo, transferredFrom, transferredTo, assignmentFromDate, assignmentToDate, isOffline, start: page * pageSize, end: (page + 1) * pageSize};
      request
        .get(API_CONFIG.baseUrl + '/transfers')
        .set('Content-Type', 'application/json')
        .query(q)
        .end((err, res) => {
          if (res && res.statusCode == 200) {
          	console.log('result: ', res.body);
            this.setState({rowData: res.body.data, total: res.body.total});
          }
        });
    });
  }

  clearSearch(e) {
  	this.setState({transferFromNo: null, transferToNo: null, transferredFrom: '', transferredTo: '', assignmentFromDate: null, assignmentToDate: null, isOffline: null},
  		() => this.doSearch(e));
  }

  doSearch(e) {
  	const {transferFromNo, transferToNo, transferredFrom, transferredTo, assignmentFromDate, assignmentToDate, isOffline, page, pageSize} = this.state;
  	this.setState({searchParams: {transferFromNo, transferToNo, transferredFrom, transferredTo, assignmentFromDate, assignmentToDate, isOffline, page, pageSize}},
  		() => this.loadPage(0));
  }

  onGridReady(params) {
    this.api = params.api;
    this.columnApi = params.columnApi;
    this.columnApi.autoSizeColumns();
    this.loadPage(0);
  }

  render() {
    const {sidemenu: {tool_browser_categories}} = this.props;
    const {page, pageSize, rowData, columnDefs, total, transferFromNo, transferToNo, transferredFrom, transferredTo, assignmentFromDate, assignmentToDate, isOffline} = this.state;
  	return (
  		<div className="transfer-browser fit-screen">
  			<div className="toolbar">
  				<a className="btn bg-white black"><FaPlus size={20} style={{color: 'darkgreen'}} /> Create Transfer</a>
  				<a className="btn bg-white black"><FaPencil size={20} style={{color: 'darkgoldenrod'}} /> View Transfer</a>
  				<a className="btn bg-white black"><FaCut size={20} style={{color: 'orange'}} /> Delete Transfer</a>
  				<a className="btn bg-white black"><FaExternalLinkSquare size={20} style={{color: 'green'}} /> Export Data</a>
  				<a className="btn bg-white black"><FaPrint size={20} /> Print</a>
  			</div>
  			<div className="parameter-form">
  				<div className="form-container">
	  				<div className="form-title">
	  					<p>Browse Transfers</p>
	  				</div>
	  				<div className="form-content">
	  					<div className="form-row">
	  						<p className="form-label">Transfer No.</p>
	  						<div className="form-control">
	  							<input type="number" value={transferFromNo} onChange={(e) => this.setState({transferFromNo: e.target.value})} />
	  							<p>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;</p>
	  							<input type="number" value={transferToNo} onChange={(e) => this.setState({transferToNo: e.target.value})} />
	  						</div>
	  						<div className="form-accessory">
	  							<div className="btn bg-gray black" onClick={this.doSearch}>Search</div>
	  						</div>
	  					</div>
	  					<div className="form-row">
	  						<p className="form-label">Transfer From</p>
	  						<div className="form-control">
	  							<select value={transferredFrom} onChange={(e) => this.setState({transferredFrom: e.target.value})}>
	  								<option value={''}> </option>
	  								{transferredFromList.map((v, i) => <option key={i} value={v}>{v}</option>)}
	  							</select>
	  						</div>
	  						<div className="form-accessory">
	  							<div className="btn bg-gray black" onClick={this.clearSearch}>Clear</div>
	  						</div>
	  					</div>
	  					<div className="form-row">
	  						<p className="form-label">Transfer To</p>
	  						<div className="form-control">
	  							<select value={transferredTo} onChange={(e) => this.setState({transferredTo: e.target.value})}>
	  								<option value={''}> </option>
	  								{transferredToList.map((v, i) => <option key={i} value={v}>{v}</option>)}
	  							</select>
	  						</div>
	  						<div className="form-accessory">
	  							<input type="radio" checked={isOffline === true} onChange={(e) => this.setState({isOffline: e.target.checked})} /> Offline
	  						</div>
	  					</div>
	  					<div className="form-row">
	  						<p className="form-label">Assignment Dates From</p>
	  						<div className="form-control">
	  							<DatePicker selected={assignmentFromDate} onChange={(date) => this.setState({assignmentFromDate: date})} />
	  							<p>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;</p>
	  							<DatePicker selected={assignmentToDate} onChange={(date) => this.setState({assignmentToDate: date})} />
	  						</div>
	  						<div className="form-accessory">
	  							<input type="radio" checked={isOffline === false} onChange={(e) => this.setState({isOffline: !e.target.checked})} /> Online
	  						</div>
	  					</div>
	  				</div>
  				</div>
  			</div>
  			<div className="content">
  				<div className="view" style={{flex: 1}}>
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
              <button disabled={page == (Math.floor(total / pageSize) - 1)} onClick={this.loadPage.bind(this, total / pageSize - 1)}>last</button>
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
  					<div style={{height: '37px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
  						<div style={{display: 'inline-block'}}>Transfers: {total}</div>
  					</div>
  				</div>
  			</div>
  		</div>
  	);
  }
}