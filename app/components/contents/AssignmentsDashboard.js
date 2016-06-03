import React, {Component} from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import numeral from 'numeral';
import {BarHorizontalChart} from 'react-d3-basic';
import {Table, Thead, Tr, Th, Td} from 'reactable';
import {FaLongArrowUp, FaLongArrowDown} from 'react-icons/lib/fa';

import {Meter, DashboardSection} from '../';

const mock_performance_data = [
  { indicator: 'Average Value Per Transfer (T&E)', period: 'This Month vs. Last Month', current: 0, previous: 0 },
  { indicator: 'Total Value of Transfers (T&E)', period: 'This Month vs. Last Month', current: 0, previous: 0 },
  { indicator: 'Average Value Per Transfer (M&C)', period: 'This Month vs. Last Month', current: 0, previous: 0 },
  { indicator: 'Total Value of Transfers (M&C)', period: 'This Month vs. Last Month', current: 0, previous: 0 },
];

var transfersByAssignee = [
  { name: 'Sigma Warehouse', value: 2000 },
  { name: 'Anderson, Tim', value: 1800 },
  { name: 'Allentown, April', value: 1500 },
  { name: 'Henry, chris', value: 1400 },
  { name: 'Kafka, Don', value: 1300 },
  { name: 'Admin, Sigma', value: 1000 },
  { name: '5566 - Job C', value: 900 },
  { name: 'BOLTON, STEVE-O', value: 800 },
  { name: '33441 - Job A', value: 700 },
  { name: '45783 - DIA', value: 700 }
];

var transfersByCategory = [
  { name: 'Adhesive Gun Tool Only', value: 850 },
  { name: 'Drills, Hammer', value: 580 },
  { name: 'Backhoe', value: 550 },
  { name: 'Compressors', value: 350 },
  { name: 'Bending Equipment', value: 330 },
  { name: 'Vehicles', value: 250 },
  { name: 'Bits, Drill', value: 200 },
  { name: 'Grinders', value: 180 },
  { name: 'Extension Cords', value: 180 },
  { name: 'Air Filters Materials Only', value: 150 }
];

@connect(
  state => ({ content: state.content, sidemenu: state.sidemenu }),
  {}
)
export default class AssignmentsDashboard extends Component {
	constructor(props) {
		super(props);
  }

  componentDidMount() {
  }

  render() {
    const chartSeries = [
      {
        field: 'value',
        name: 'Assignments Dashboard Charts',
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
              <a>Create Transfer</a>
              <a>Create Pick Ticket</a>
              <a>Create Kit</a>
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
          <DashboardSection title={'% of Pick Ticket Lines Filled'} style={{flex: 1}}>
            <div className="main-content" style={{textAlign: 'center', padding: '0px 50px'}}> 
              <Meter min={0} max={100} value={30} />
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
          <DashboardSection title={'Number of Transfers By Assignee - Top 10'} style={{flex: 1}}>
            <div className="main-content chart">
              <BarHorizontalChart
                width={620}
                height={300}
                margins={{left: 200, top: 15, right: 20, bottom: 25}}
                showLegend={false}
                data={_.orderBy(transfersByAssignee, ['value'], ['asc'])}
                chartSeries={chartSeries}
                y={(d) => d.name}
                yScale="ordinal"
                xScale="linear"
                xDomain={[0, _.maxBy(transfersByAssignee, (x) => x.value).value * 1.1]}
                xTicks={[4]}
                showXGrid={false}
              />
            </div>
            <div className="footer-content">
              <a>Recalculate</a>
            </div>
          </DashboardSection>
          <DashboardSection title={'Number of Transfers By Category - Top 10'} style={{flex: 1}}>
            <div className="main-content chart">
              <BarHorizontalChart
                width={620}
                height={300}
                margins={{left: 200, top: 15, right: 20, bottom: 25}}
                showLegend={false}
                data={_.orderBy(transfersByCategory, ['value'], ['asc'])}
                chartSeries={chartSeries}
                y={(d) => d.name}
                yScale="ordinal"
                xScale="linear"
                xDomain={[0, _.maxBy(transfersByCategory, (x) => x.value).value * 1.1]}
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
