import React, {Component} from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import numeral from 'numeral';
import moment from 'moment';
import {LineChart} from 'react-d3-basic';
import {Table, Thead, Tr, Th, Td} from 'reactable';
import {FaLongArrowUp, FaLongArrowDown} from 'react-icons/lib/fa';

import {Meter, DashboardSection} from '../';

const mock_performance_data = [
  { indicator: 'Total Tool Value', period: 'This Month vs. Last Month', current: 6267805 },
  { indicator: 'Tools In Stock', period: 'This Month vs. Last Month', current: 2193376 },
  { indicator: 'Total Value of Transfers (T&E)', period: 'This Month vs. Last Month', current: 61920, previous: 200, change_percent: 30860 },
  { indicator: 'Total Value of Transfers (M&C)', period: 'This Month vs. Last Month', current: 0, previous: 0 }
];

var ticketsData = [
  { date: moment().subtract(10, 'months').format('M/D'), value: 100 },
  { date: moment().subtract(9, 'months').format('M/D'), value: 100 },
  { date: moment().subtract(8, 'months').format('M/D'), value: 100 },
  { date: moment().subtract(7, 'months').format('M/D'), value: 100 },
  { date: moment().subtract(6, 'months').format('M/D'), value: 100 },
  { date: moment().subtract(5, 'months').format('M/D'), value: 100 },
  { date: moment().subtract(4, 'months').format('M/D'), value: 100 },
  { date: moment().subtract(3, 'months').format('M/D'), value: 0 },
  { date: moment().subtract(2, 'months').format('M/D'), value: 0 },
  { date: moment().subtract(1, 'months').format('M/D'), value: 0 },
  { date: moment().format('M/D'), value: 0 }
];

var toolsData = [
  
  { date: moment().subtract(10, 'months').format('M/D'), value: 0 },
  { date: moment().subtract(9, 'months').format('M/D'), value: 0 },
  { date: moment().subtract(8, 'months').format('M/D'), value: 0 },
  { date: moment().subtract(7, 'months').format('M/D'), value: 11 },
  { date: moment().subtract(6, 'months').format('M/D'), value: 0 },
  { date: moment().subtract(5, 'months').format('M/D'), value: 0 },
  { date: moment().subtract(4, 'months').format('M/D'), value: 0 },
  { date: moment().subtract(3, 'months').format('M/D'), value: 0 },
  { date: moment().subtract(2, 'months').format('M/D'), value: 0 },
  { date: moment().subtract(1, 'months').format('M/D'), value: 0 },
  { date: moment().format('M/D'), value: 0 }
];

@connect(
  state => ({ content: state.content, sidemenu: state.sidemenu }),
  {}
)
export default class SystemDashboard extends Component {
	constructor(props) {
		super(props);
  }

  componentDidMount() {
  }

  render() {
    const chartSeries = [
      {
        field: 'value',
        name: 'System Dashboard Charts',
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
              <a>Create Transfer</a>
              <a>Browse Tools</a>
              <a>Create Pick Ticket</a>
              <a>Browse Materials</a>
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
          <DashboardSection title={'% of Total Tool Value Out'} style={{flex: 1}}>
            <div className="main-content" style={{textAlign: 'center', padding: '0px 50px'}}> 
              <Meter min={0} max={100} value={70} />
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
                      <Td column="Current" style={{textAlign: 'right'}}>{mock_performance_data[i].current ? numeral(mock_performance_data[i].current).format('$0,0') : '-'}</Td>
                      <Td column="Previous" style={{textAlign: 'right'}}>{mock_performance_data[i].previous ? numeral(mock_performance_data[i].previous).format('$0,0') : '-'}</Td>
                      <Td column="Change" style={{textAlign: 'right'}}>
                        {mock_performance_data[i].change_percent ? 
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
          <DashboardSection title={'% of Pick Ticket Lines Filled'} style={{flex: 1}}>
            <div className="main-content chart">
              <LineChart
                width={620}
                height={250}
                showLegend={false}
                margins={{left: 60, top: 15, right: 20, bottom: 30}}
                data={ticketsData}
                chartSeries={chartSeries}
                xScale="ordinal"
                x={(d) => d.date}
                xBandPaddingInner={20}
                yScale="linear"
                yTicks={[5]}
                yTickFormat={(v) => `${v} %`}
              />
            </div>
            <div className="footer-content">
              <a>Recalculate</a>
            </div>
          </DashboardSection>
          <DashboardSection title={'Values of Tools Lost'} style={{flex: 1}}>
            <div className="main-content chart">
              <LineChart
                width={620}
                height={250}
                showLegend={false}
                margins={{left: 60, top: 15, right: 20, bottom: 30}}
                data={toolsData}
                chartSeries={chartSeries}
                xScale="ordinal"
                x={(d) => d.date}
                xBandPaddingInner={20}
                yScale="linear"
                yTicks={[5]}
                yTickFormat={(v) => numeral(v).format('$0,0')}
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
