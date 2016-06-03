var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var _ = require('lodash');
var moment = require('moment');

const app = express();
const port = process.env.NODE_ENV == 'development' ? 3001 : 8081;

const server = new http.Server(app);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/tools', function(req, res) {
	const start = req.query.start;
	const end = req.query.end;
	const sort_by = req.query.sort_by;
	const sort_order = req.query.sort_order;
	const filter_by = req.query.filter_by;
	const filter_value = req.query.filter_value;
	const mockData = [
    {category: 'Adhesive Gun Tool Only', number: 51515685, bar_code: 62, serial_number: '12345', kit: '', t: 'T', description: 'test', model: '1230123b', qty: 1, status: 'AWS', assignment: 'Sigma Warehouse', pl: false, owner: 'Sigma Warehouse', manager: 'Sigma Warehouse', department: 'Excavating Dept.', supervisor: 'abcdefgh'},
  	{category: 'Air compresso/ compresseur air', number: 501423, bar_code: 804476, serial_number: '', kit: '', t: 'T', description: 'test', model: '1230123b', qty: 1, status: 'AWS', assignment: 'Sigma Warehouse', pl: false, owner: 'Sigma Warehouse', manager: 'Sigma Warehouse', department: 'Excavating Dept.', supervisor: 'abcdefgh'},
  	{category: 'Air Tanks', number: 51515757, bar_code: 148, serial_number: '', kit: '', t: 'T', description: 'test', model: '1230123b', qty: 1, status: 'AWS', assignment: 'Sigma Warehouse', pl: false, owner: 'Sigma Warehouse', manager: 'Sigma Warehouse', department: 'Excavating Dept.', supervisor: 'abcdefgh'},
  	{category: 'Backhoe', number: 5198, bar_code: 54621, serial_number: '1235-abkd-45544', kit: '', t: 'T', description: 'test', model: '1230123b', qty: 1, status: 'AWS', assignment: 'Sigma Warehouse', pl: false, owner: 'Sigma Warehouse', manager: 'Sigma Warehouse', department: 'Excavating Dept.', supervisor: 'abcdefgh'},
  	{category: 'Bending Equipment', number: 834, bar_code: 834, serial_number: '', kit: '', t: 'T', description: 'test', model: '1230123b', qty: 1, status: 'AWS', assignment: 'Sigma Warehouse', pl: false, owner: 'Sigma Warehouse', manager: 'Sigma Warehouse', department: 'Excavating Dept.', supervisor: 'abcdefgh'}
  ];
  var data = _.flatten(_.fill(Array((end - start) / 5), mockData));
  if (!!filter_by) {
  	data = _.filter(data, function(o) {
  		return o[filter_by].toString().toLowerCase().indexOf((filter_value || '').toString().toLowerCase()) >= 0;
  	});
  }
  if (!!sort_by) {
  	data = _.orderBy(data, [sort_by], [sort_order]);
  }
 	res.json({data: data, total: 100000});
});

app.get('/toolmodels', function(req, res) {
  const start = req.query.start;
  const end = req.query.end;
  const sort_by = req.query.sort_by;
  const sort_order = req.query.sort_order;
  const filter_by = req.query.filter_by;
  const filter_value = req.query.filter_value;
  const mockData = [
    {image: '/assets/images/meter.png', category: 'Drill Motor', t: 'T', model_record_id: '1', manufacturer: 'AMERICAN TOOL COMPAN', model: '556-17' , description: 'Drill, 1/2'},
    {image: '/assets/images/meter.png', category: 'Chicken Cooker', t: 'T', model_record_id: '1', manufacturer: 'Bobcat', model: 'kas 2-23 test' , description: '2-23 test new unique tool'},
    {image: '/assets/images/meter.png', category: 'End Loaders', t: 'T', model_record_id: '1', manufacturer: 'Sinoway Industrial', model: 'SWL50E' , description: 'Front End Loader'},
    {image: '/assets/images/meter.png', category: 'Fusion Equipment', t: 'T', model_record_id: '1', manufacturer: 'McEIroy', model: '28' , description: 'MAC 28'},
    {image: '/assets/images/meter.png', category: 'Chicken Cooker', t: 'T', model_record_id: '1', manufacturer: 'ALLEGRO INDUSTRIES', model: '24 bolts' , description: '24 bolt cutter'}
  ];
  var data = _.flatten(_.fill(Array((end - start) / 5), mockData));
  if (!!filter_by) {
    data = _.filter(data, function(o) {
      return o[filter_by].toString().toLowerCase().indexOf((filter_value || '').toString().toLowerCase()) >= 0;
    });
  }
  if (!!sort_by) {
    data = _.orderBy(data, [sort_by], [sort_order]);
  }
  res.json({data: data, total: 100000});
});

app.get('/toolkits', function(req, res) {
  const start = req.query.start;
  const end = req.query.end;
  const sort_by = req.query.sort_by;
  const sort_order = req.query.sort_order;
  const filter_by = req.query.filter_by;
  const filter_value = req.query.filter_value;
  const mockData = [
    {category: 'Adhesive Gun Tool Only', number: 12006, bar_code: 62, serial_number: '12345', kit: '', t: 'T', description: 'test', model: '1230123b', qty: 1, status: 'AWS', assignment: 'Sigma Warehouse', pl: false, owner: 'Sigma Warehouse', manager: 'Sigma Warehouse', department: 'Excavating Dept.', supervisor: 'abcdefgh'},
    {category: 'Air compresso/ compresseur air', number: 501423, bar_code: 804476, serial_number: '', kit: '', t: 'T', description: 'test', model: '1230123b', qty: 1, status: 'AWS', assignment: 'Sigma Warehouse', pl: false, owner: 'Sigma Warehouse', manager: 'Sigma Warehouse', department: 'Excavating Dept.', supervisor: 'abcdefgh'},
    {category: 'Air Tanks', number: 51515757, bar_code: 148, serial_number: '', kit: '', t: 'T', description: 'test', model: '1230123b', qty: 1, status: 'AWS', assignment: 'Sigma Warehouse', pl: false, owner: 'Sigma Warehouse', manager: 'Sigma Warehouse', department: 'Excavating Dept.', supervisor: 'abcdefgh'},
    {category: 'Backhoe', number: 5198, bar_code: 54621, serial_number: '1235-abkd-45544', kit: '', t: 'T', description: 'test', model: '1230123b', qty: 1, status: 'AWS', assignment: 'Sigma Warehouse', pl: false, owner: 'Sigma Warehouse', manager: 'Sigma Warehouse', department: 'Excavating Dept.', supervisor: 'abcdefgh'},
    {category: 'Bending Equipment', number: 834, bar_code: 834, serial_number: '', kit: '', t: 'T', description: 'test', model: '1230123b', qty: 1, status: 'AWS', assignment: 'Sigma Warehouse', pl: false, owner: 'Sigma Warehouse', manager: 'Sigma Warehouse', department: 'Excavating Dept.', supervisor: 'abcdefgh'}
  ];
  var data = _.flatten(_.fill(Array((end - start) / 5), mockData));
  if (!!filter_by) {
    data = _.filter(data, function(o) {
      return o[filter_by].toString().toLowerCase().indexOf((filter_value || '').toString().toLowerCase()) >= 0;
    });
  }
  if (!!sort_by) {
    data = _.orderBy(data, [sort_by], [sort_order]);
  }
  res.json({data: data, total: 100000});
});

app.get('/transfers', function(req, res) {
  const transferFromNo = req.query.transferFromNo;
  const transferToNo = req.query.transferToNo;
  const transferredFrom = req.query.transferredFrom;
  const transferredTo = req.query.transferredTo;
  const assignmentFromDate = req.query.assignmentFromDate;
  const assignmentToDate = req.query.assignmentToDate;
  const isOffline = req.query.isOffline;
  const start = req.query.start;
  const end = req.query.end;

  const sort_by = req.query.sort_by;
  const sort_order = req.query.sort_order;
  const filter_by = req.query.filter_by;
  const filter_value = req.query.filter_value;

  const mockData = [
    {transfer_date: '03/30/2016', assignment_date: '03/30/2016', number: 1, transferred_from: 'Henry, Chris', transferred_to: 'Admin, Sigma', transferred_by: 'Admin, Sigma', delivered_by: '', document_no: '', offline: true},
    {transfer_date: '03/29/2016', assignment_date: '03/29/2016', number: 2, transferred_from: 'Contanzo, Frank', transferred_to: 'McDonald, Craig', transferred_by: 'Admin, Sigma', delivered_by: '', document_no: '', offline: false},
    {transfer_date: '03/17/2016', assignment_date: '03/17/2016', number: 3, transferred_from: 'Wright, Tami', transferred_to: 'Fish, Ron', transferred_by: 'Admin, Sigma', delivered_by: '', document_no: '', offline: true},
    {transfer_date: '03/16/2016', assignment_date: '03/16/2016', number: 4, transferred_from: 'Donovan, Tom', transferred_to: 'Testing duplicate', transferred_by: 'Admin, Sigma', delivered_by: '', document_no: '', offline: false},
    {transfer_date: '03/15/2016', assignment_date: '03/15/2016', number: 5, transferred_from: 'Bob, Jim', transferred_to: 'Battia, Jake', transferred_by: 'Admin, Sigma', delivered_by: '', document_no: '', offline: true},
  ];

  filteredData = _.filter(mockData, function(o) {
    var result = true;
    var assignemntDate = moment(o.assignment_date, 'MM/DD/YYYY');
    if (!!transferFromNo) { result = result && (o.number >= _.toNumber(transferFromNo)); }
    if (!!transferToNo) { result = result && (o.number <= _.toNumber(transferToNo)); }
    if (!!transferredFrom) { result = result && (o.transferred_from == transferredFrom); }
    if (!!transferredTo) { result = result && (o.transferred_to == transferredTo); }
    if (!!assignmentFromDate) { var target = moment(assignmentFromDate, 'MM/DD/YYYY'); result = result && (assignemntDate.isSameOrAfter(target)); }
    if (!!assignmentToDate) { var target = moment(assignmentToDate, 'MM/DD/YYYY'); result = result && (assignemntDate.isSameOrBefore(target));  }
    if (!!isOffline) { result = result && (o.offline == JSON.parse(isOffline)); }

    return result;
  });
  var data = filteredData.length > 0 ? _.flatten(_.fill(Array(Math.ceil((end - start) / filteredData.length)), filteredData)).slice(0, (end - start)) : [];
  
  if (!!sort_by) {
    data = _.orderBy(data, [sort_by], [sort_order]);
  }
  res.json({data: data, total: data.length > 0 ? filteredData.length * 100000 / 5 : 0});
});

app.get('/materialbrowser', function(req, res) {
  const start = req.query.start;
  const end = req.query.end;
  const sort_by = req.query.sort_by;
  const sort_order = req.query.sort_order;
  const filter_by = req.query.filter_by;
  const filter_value = req.query.filter_value;
  const mockData = [
    {category: 'Pipe, Copper', number: '1-1/4 CP', bar_code: 'q751443', description: '1 1/4" Copper Pipe', model: '1510high', qty: '-1', location: 'Sigma Warehouse'},
    {category: 'Pipe, Copper', number: '1 CP', bar_code: 'a7514429', description: '1" Copper Pipe', model: '912', qty: '17', location: 'Sigma Warehouse'},
    {category: 'Sanding Cloths', number: '36035', bar_code: '751424', description: '1.5" x 10yds. Sanding Colth', model: '36035', qty: '3', location: 'Sigma Warehouse'},
    {category: 'Acid Brushes Materia', number: '41034', bar_code: '779443', description: '1/4" Acid Brushes', model: '145MO', qty: '10', location: 'Sigma Warehouse'},
    {category: 'Acid Brushes Materia', number: '36037', bar_code: '751426', description: '1/4" Acid Brushes', model: '36037', qty: '345', location: 'Sigma Warehouse'}
  ];
  var data = _.flatten(_.fill(Array((end - start) / 5), mockData));
  if (!!filter_by) {
    data = _.filter(data, function(o) {
      return o[filter_by].toString().toLowerCase().indexOf((filter_value || '').toString().toLowerCase()) >= 0;
    });
  }
  if (!!sort_by) {
    data = _.orderBy(data, [sort_by], [sort_order]);
  }
  res.json({data: data, total: 100000});
});

app.get('/materialmodels', function(req, res) {
  const start = req.query.start;
  const end = req.query.end;
  const sort_by = req.query.sort_by;
  const sort_order = req.query.sort_order;
  const filter_by = req.query.filter_by;
  const filter_value = req.query.filter_value;
  const mockData = [
    {image: '/assets/images/meter.png', category: '9" LG. Sawsall Blades 18 TPI', manufacturer: 'DeWALT', model: 'kas 360' , description: '9" LG. Saw Blade kas', model_record_id: '159176'},
    {image: '/assets/images/meter.png', category: '9" LG. Sawsall Blades 18 TPI', manufacturer: '3M New', model: '3241' , description: 'test4', model_record_id: '634825'},
    {image: '/assets/images/meter.png', category: '12 V Lithium Batteries', manufacturer: 'Bosch', model: 'A200' , description: '12 V Lithium Batteries', model_record_id: '127122'},
    {image: '/assets/images/meter.png', category: '12-volt Lithium Charger', manufacturer: 'Bosch', model: '24low' , description: '12-volt', model_record_id: '87095'},
    {image: '/assets/images/meter.png', category: 'Acid Brushes Material Only', manufacturer: '3M PRODUCTS', model: '145MO' , description: '1/4" Acid Brushes', model_record_id: '188580'}
  ];
  var data = _.flatten(_.fill(Array((end - start) / 5), mockData));
  if (!!filter_by) {
    data = _.filter(data, function(o) {
      return o[filter_by].toString().toLowerCase().indexOf((filter_value || '').toString().toLowerCase()) >= 0;
    });
  }
  if (!!sort_by) {
    data = _.orderBy(data, [sort_by], [sort_order]);
  }
  res.json({data: data, total: 100000});
});

app.listen(port, function(err) {
  if (err) {
    console.error(err);
  }
  console.info('----\n==> 🌎  API is running on port %s', port);
  console.info('==> 💻  Send requests to http://localhost:%s', port);
});