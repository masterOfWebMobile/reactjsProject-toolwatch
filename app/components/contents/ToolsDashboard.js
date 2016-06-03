import React, {Component} from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import numeral from 'numeral';
import {BarHorizontalChart} from 'react-d3-basic';
import {Table, Thead, Tr, Th, Td} from 'reactable';
import {FaLongArrowUp, FaLongArrowDown} from 'react-icons/lib/fa';

import {Meter, DashboardSection} from '../';

const mock_performance_data = [
  { indicator: 'Total Tool Value', period: 'This Month vs. Last Month', current: 6267805 },
  { indicator: 'Tools In Stock', period: 'This Month vs. Last Month', current: 2193376 },
  { indicator: 'Tools Out', period: 'This Month vs. Last Month', current: 4074429 },
  { indicator: 'Tools Retired', period: 'This Month vs. Last Month', current: 0, previous: 0 },
  { indicator: 'Tools Beyond Return Date', period: 'This Month vs. Last Month', current: 395}
];

var toolsDataByCategory = [
  { name: 'Backhoe', value: 4500000 },
  { name: 'Generators', value: 3000000 },
  { name: 'Adhesive Gun Tool Only', value: 2500000 },
  { name: 'Vehicles', value: 2400000 },
  { name: 'Bulldozers', value: 1200000 },
  { name: 'Compaction Equipment', value: 1200000 },
  { name: 'Office Chair', value: 1200000 },
  { name: 'Concrete Equipment', value: 1000000 },
  { name: 'Bits, Drill', value: 800000 },
  { name: 'Loaders', value: 600000 }
];

var toolsDataByAssignment = [
  { name: '09105 Kissing Camels', value: 2000000 },
  { name: 'Sigma Warehouse', value: 1800000 },
  { name: 'Fingers, Freddie', value: 1600000 },
  { name: '123', value: 600000 },
  { name: 'Kitchen Job', value: 600000 },
  { name: 'Battaia, Jake', value: 600000 },
  { name: 'Peterson, Larry', value: 400000 },
  { name: 'Rig1', value: 300000 },
  { name: 'Admin, Sigma', value: 300000 },
  { name: '33441 - Job A', value: 300000 }
];

@connect(
  state => ({ content: state.content, sidemenu: state.sidemenu }),
  {}
)
export default class ToolsDashboard extends Component {
	constructor(props) {
		super(props);
  }

  componentDidMount() {
  }

  render() {
    const chartSeries = [
      {
        field: 'value',
        name: 'Tools Dashboard Charts',
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
              <a>Browse Pick Tickets</a>
              <a>Browse Tools</a>
              <a>Browse Tool Model Records</a>
              <a>Create Transfer</a>
              <a>Browse Materials</a>
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
          <DashboardSection title={'Tool Loss % over 90 Days'} style={{flex: 1}}>
            <div className="main-content" style={{textAlign: 'center', padding: '0px 50px'}}> 
              <Meter min={0} max={100} value={10} />
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
          <DashboardSection title={'Tools & Equipment By Category - Top 10'} style={{flex: 1}}>
            <div className="main-content chart">
              <BarHorizontalChart
                width={620}
                height={300}
                margins={{left: 200, top: 15, right: 20, bottom: 25}}
                showLegend={false}
                data={_.orderBy(toolsDataByCategory, ['value'], ['asc'])}
                chartSeries={chartSeries}
                y={(d) => d.name}
                yScale="ordinal"
                xScale="linear"
                xDomain={[0, _.maxBy(toolsDataByCategory, (x) => x.value).value * 1.1]}
                xTicks={[2]}
                xTickFormat={(v) => numeral(v).format('$0,0')}
                showXGrid={false}
              />
            </div>
            <div className="footer-content">
              <a>Recalculate</a>
            </div>
          </DashboardSection>
          <DashboardSection title={'Tools & Equipment By Assignment - Top 10'} style={{flex: 1}}>
            <div className="main-content chart">
              <BarHorizontalChart
                width={620}
                height={300}
                margins={{left: 200, top: 15, right: 20, bottom: 25}}
                showLegend={false}
                data={_.orderBy(toolsDataByAssignment, ['value'], ['asc'])}
                chartSeries={chartSeries}
                y={(d) => d.name}
                yScale="ordinal"
                xScale="linear"
                xDomain={[0, _.maxBy(toolsDataByAssignment, (x) => x.value).value * 1.1]}
                xTicks={[2]}
                xTickFormat={(v) => numeral(v).format('$0,0')}
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
