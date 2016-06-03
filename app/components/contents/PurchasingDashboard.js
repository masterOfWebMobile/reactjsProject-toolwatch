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
  { indicator: 'Number of POs Past Expected Date', period: 'Today vs. Yesterday' },
  { indicator: 'Number of POs Waiting For Receipts', period: 'Today vs. Yesterday' },
  { indicator: 'Total Value of Open POs', period: 'Today vs. Yesterday' },
  { indicator: 'Value Of Items Received in Period', period: 'Today vs. 30-Day Average', current: 0, previous: 42 }
];

var totalPOsByVendor = [
  { name: 'Atlas Copco', value: 4500000 },
  { name: 'SUNBELT - HILLSBORO', value: 3500000 },
  { name: 'Hayness Supply', value: 900000 },
  { name: 'ACME Manufacturing', value: 800000 },
  { name: 'Calgary Fasteners', value: 700000 },
  { name: 'Fastenal', value: 500000 },
  { name: 'GTS - PORTLAND', value: 300000 },
  { name: 'Hughes Supply', value: 300000 },
  { name: 'Alcoa', value: 100000 },
  { name: 'White Cap', value: 100000 }
];

var uniquePOsByVendor = [
  { name: 'ACME Manufacturing', value: 55 },
  { name: 'Atlas Copco', value: 50 },
  { name: 'Grainger', value: 35 },
  { name: 'Fastenal', value: 25 },
  { name: 'SUNBELT - HILLSBORO', value: 22 },
  { name: 'Calgary Fasteners', value: 15 },
  { name: 'Hughes Supply', value: 10 },
  { name: 'Alcoa', value: 10 },
  { name: 'Hayness Supply', value: 8 },
  { name: 'GTS - PORTLAND', value: 8 }
];

@connect(
  state => ({ content: state.content, sidemenu: state.sidemenu }),
  {}
)
export default class PurchasingDashboard extends Component {
	constructor(props) {
		super(props);
  }

  componentDidMount() {
  }

  render() {
    const chartSeries = [
      {
        field: 'value',
        name: 'Purchasing Dashboard Charts',
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
              <a>Browse Purchase Orders</a>
              <a>Browse Receipts</a>
              <a>Create Purchase Orders</a>
            </div>
            <div className="footer-content">
              <a>Refresh</a>
              <a>Configure</a>
            </div>
          </DashboardSection>
          <DashboardSection title={'Message Center'} style={{flex: 1.5}}>
            <div className="main-content">
              <a>There are tools out past their return date</a>
              <a>There are assets with low levels</a>
              <a>There are tools needing to be serviced</a>
              <a>There are locations to be decommissioned</a>
            </div>
            <div className="footer-content">
              <a>Refresh</a>
            </div>
          </DashboardSection>
          <DashboardSection title={'Avg. Age of Overdue POs'} style={{flex: 1}}>
            <div className="main-content" style={{textAlign: 'center', padding: '0 10px'}}> 
              <NumberWidget value={2351} length={8} />
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
                      <Td column="Current" style={{textAlign: 'right'}}>{_.isNumber(mock_performance_data[i].current) ? numeral(mock_performance_data[i].current).format('$0,0') : '-'}</Td>
                      <Td column="Previous" style={{textAlign: 'right'}}>{_.isNumber(mock_performance_data[i].previous) ? numeral(mock_performance_data[i].previous).format('$0,0') : '-'}</Td>
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
          <DashboardSection title={'Total Value of POs By Vendor'} style={{flex: 1}}>
            <div className="main-content chart">
              <BarHorizontalChart
                width={620}
                height={300}
                margins={{left: 200, top: 15, right: 20, bottom: 25}}
                showLegend={false}
                data={_.orderBy(totalPOsByVendor, ['value'], ['asc'])}
                chartSeries={chartSeries}
                y={(d) => d.name}
                yScale="ordinal"
                xScale="linear"
                xDomain={[0, _.maxBy(totalPOsByVendor, (x) => x.value).value * 1.1]}
                xTicks={[3]}
                showXGrid={false}
              />
            </div>
            <div className="footer-content">
              <a>Recalculate</a>
            </div>
          </DashboardSection>
          <DashboardSection title={'Unique POs By Vendor'} style={{flex: 1}}>
            <div className="main-content chart">
              <BarHorizontalChart
                width={620}
                height={300}
                margins={{left: 200, top: 15, right: 20, bottom: 25}}
                showLegend={false}
                data={_.orderBy(uniquePOsByVendor, ['value'], ['asc'])}
                chartSeries={chartSeries}
                y={(d) => d.name}
                yScale="ordinal"
                xScale="linear"
                xDomain={[0, _.maxBy(uniquePOsByVendor, (x) => x.value).value * 1.1]}
                xTicks={[3]}
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
