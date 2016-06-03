import React, {Component} from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import numeral from 'numeral';
import moment from 'moment';
import {BarHorizontalChart, LineChart} from 'react-d3-basic';
import {Table, Thead, Tr, Th, Td} from 'reactable';
import {FaLongArrowUp, FaLongArrowDown} from 'react-icons/lib/fa';

import {Meter, NumberWidget, DashboardSection} from '../';

const mock_performance_data = [
  { indicator: 'Number of Overdue Inspection Tasks', period: 'This Month vs. Last Month' },
  { indicator: 'Number of Overdue Calibration Tasks', period: 'This Month vs. Last Month' },
  { indicator: 'Number of Pending Service Requests', period: 'Today vs. 30-Day AVerage', current: 138 },
  { indicator: 'Number of Work Orders Created', period: 'Today vs. 30-Day AVerage', current: 0, previous: 0 }
];

var serviceRequestsAvgTime = [
  { date: moment().subtract(4, 'months').format('M/D'), value: 0 },
  { date: moment().subtract(3, 'months').format('M/D'), value: 5 },
  { date: moment().subtract(2, 'months').format('M/D'), value: 5 },
  { date: moment().subtract(1, 'months').format('M/D'), value: 0 }
];

var workOrdersByCategory = [
  { name: 'Backhoe', value: 42 },
  { name: 'Vehicles', value: 28 },
  { name: 'Adhesive Gun Tool Only', value: 19 },
  { name: 'Compressors', value: 9 },
  { name: 'Drills, Hammer', value: 5 },
  { name: 'Skid Steer', value: 3 },
  { name: 'Drill Motor', value: 3 },
  { name: 'Cutters', value: 3 },
  { name: 'Crimpers', value: 1 },
  { name: 'Air compresso/ Compresseur air', value: 1 }
];

@connect(
  state => ({ content: state.content, sidemenu: state.sidemenu }),
  {}
)
export default class ServiceDashboard extends Component {
	constructor(props) {
		super(props);
  }

  componentDidMount() {
  }

  render() {
    const chartSeries = [
      {
        field: 'value',
        name: 'Service Dashboard Charts',
        color: 'blue',
        style: {
          'fill-opacity': .5
        }
      }
    ];
  	return (
  		<div className="dashboard">
        <div className="dashboard-sections">
    			<DashboardSection title={'Favorites'} style={{flex: 1.5}}>
            <div className="main-content">
              <a>Create Service Request</a>
              <a>Browse Work Orders</a>
              <a>Browse Service Requests</a>
              <a>Create Transfer</a>
            </div>
            <div className="footer-content">
              <a>Refresh</a>
              <a>Configure</a>
            </div>
          </DashboardSection>
          <DashboardSection title={'Message Center'} style={{flex: 1.5}}>
            <div className="main-content">
            </div>
            <div className="footer-content">
              <a>Refresh</a>
            </div>
          </DashboardSection>
          <DashboardSection title={'Avg. Age of Overdue WOs'} style={{flex: 1}}>
            <div className="main-content" style={{textAlign: 'center', padding: '0 10px'}}> 
              <NumberWidget value={0} length={8} />
            </div>
            <div className="footer-content">
              <a>Recalculate</a>
            </div>
          </DashboardSection>
        </div>
        <div className="dashboard-sections">
          <DashboardSection title={'Key Performance Indicators'} style={{flex: 1}}>
            <div className="main-content" style={{height: '200px', overflow: 'auto'}}>
              <Table className="performance-table" id="key_performance_indicators_table">
                <Thead>
                  <Th column="Indicator" className="indicator">Indicator</Th>
                  <Th column="Period" className="period">Period</Th>
                  <Th column="Current" className="current">Current</Th>
                  <Th column="Previous" className="previous">Previous</Th>
                  <Th column="Change" className="change">Change</Th>
                </Thead>
                {mock_performance_data.map((data, i) => {
                  return (
                    <Tr key={i}>
                      <Td column="Indicator">{mock_performance_data[i].indicator}</Td>
                      <Td column="Period">{mock_performance_data[i].period}</Td>
                      <Td column="Current" style={{textAlign: 'right'}}>{_.isNumber(mock_performance_data[i].current) ? mock_performance_data[i].current : '-'}</Td>
                      <Td column="Previous" style={{textAlign: 'right'}}>{_.isNumber(mock_performance_data[i].previous) ? mock_performance_data[i].previous : '-'}</Td>
                      <Td column="Change" style={{textAlign: 'right'}}>
                        {_.isNumber(mock_performance_data[i].change_percent) ? 
                          <div style={{color: 'darkgreen'}}>
                            {mock_performance_data[i].change_percent > 0 ? <FaLongArrowUp size={15} /> : <FaLongArrowDown size={15} />}
                            <span style={{color: 'black', marginLeft: '20px'}}>{mock_performance_data[i].change_percent}%</span>
                          </div> 
                        : '-'}
                      </Td>
                    </Tr>
                  );
                })}
              </Table>
            </div>
            <div className="footer-content">
              <a>Recalculate</a>
            </div>
          </DashboardSection>
        </div>
        <div className="dashboard-sections">
          <DashboardSection title={'Avg. Time For Handling Service Requests'} style={{flex: 1}}>
            <div className="main-content chart">
              <LineChart
                width={620}
                height={250}
                showLegend={false}
                margins={{left: 120, top: 25, right: 20, bottom: 25}}
                data={serviceRequestsAvgTime}
                chartSeries={chartSeries}
                xScale="ordinal"
                x={(d) => d.date}
                xBandPaddingInner={20}
                yScale="linear"
                yTicks={[5]}
                yDomain={[0, 100]}
                showYGrid={false}
              />
            </div>
            <div className="footer-content">
              <a>Recalculate</a>
            </div>
          </DashboardSection>
          <DashboardSection title={'Overdue Work Orders By Category'} style={{flex: 1}}>
            <div className="main-content chart">
              <BarHorizontalChart
                width={620}
                height={300}
                margins={{left: 200, top: 15, right: 20, bottom: 25}}
                showLegend={false}
                data={_.orderBy(workOrdersByCategory, ['value'], ['asc'])}
                chartSeries={chartSeries}
                y={(d) => d.name}
                yScale="ordinal"
                xScale="linear"
                xDomain={[0, _.maxBy(workOrdersByCategory, (x) => x.value).value * 1.1]}
                xTicks={[5]}
                showXGrid={false}
              />
            </div>
            <div className="footer-content">
              <a>Recalculate</a>
            </div>
          </DashboardSection>
        </div>
  		</div>
  	);
  }
}
