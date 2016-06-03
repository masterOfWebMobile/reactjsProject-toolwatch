import React, {Component} from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import numeral from 'numeral';
import moment from 'moment';
import {BarHorizontalChart, LineChart} from 'react-d3-basic';
import {Table, Thead, Tr, Th, Td} from 'reactable';
import {FaLongArrowUp, FaLongArrowDown} from 'react-icons/lib/fa';

import {Meter, DashboardSection} from '../';

const mock_performance_data = [
  { indicator: 'Materials In Stock', period: 'This Month vs. Last Month', current: 814156 },
  { indicator: 'Materials Out', period: 'This Month vs. Last Month', current: 1821 },
  { indicator: 'Total Material Value', period: 'This Month vs. Last Month', current: 815977 },
  { indicator: 'Materials Shrinkage', period: 'This Month vs. Last Month', current: 0, previous: 0 },
];

var inventoryInStock = [
  { date: moment().subtract(4, 'months').format('M/D'), value: 0 },
  { date: moment().subtract(3, 'months').format('M/D'), value: 10000 },
  { date: moment().subtract(2, 'months').format('M/D'), value: 10000 },
  { date: moment().subtract(1, 'months').format('M/D'), value: 0 }
];

var materialsInStockByCategory = [
  { name: 'Chicken Nugget', value: 795000 },
  { name: 'Wire', value: 700000 },
  { name: 'Air Filters Materials Only', value: 150000 },
  { name: '9" Lg, Sawsall Blades 18 TPI', value: 60000 },
  { name: 'Blades, Circular 7.5"', value: 100000 },
  { name: 'Acid Brushes Material Only', value: 100000 },
  { name: 'Sanding Cloths', value: 100000 },
  { name: 'Blades, Circular, 10"', value: 100000 },
  { name: '12-volt Lithium Charger', value: 0 },
  { name: 'Starter', value: 0 }
];

@connect(
  state => ({ content: state.content, sidemenu: state.sidemenu }),
  {}
)
export default class MaterialsDashboard extends Component {
	constructor(props) {
		super(props);
  }

  componentDidMount() {
  }

  render() {
    const chartSeries = [
      {
        field: 'value',
        name: 'Materials Dashboard Charts',
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
              <a>Create Pick Ticket</a>
              <a>Browse Receipts</a>
              <a>Create Material Item</a>
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
          <DashboardSection title={'% of Total Material Value Out'} style={{flex: 1}}>
            <div className="main-content" style={{textAlign: 'center', padding: '0px 50px'}}> 
              <Meter min={0} max={100} value={50} />
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
          <DashboardSection title={'Inventory In Stock - Average Cost'} style={{flex: 1}}>
            <div className="main-content chart">
              <LineChart
                width={620}
                height={250}
                showLegend={false}
                margins={{left: 120, top: 25, right: 20, bottom: 25}}
                data={inventoryInStock}
                chartSeries={chartSeries}
                xScale="ordinal"
                x={(d) => d.date}
                xBandPaddingInner={20}
                yScale="linear"
                yTicks={[2]}
                yDomain={[0, 1000000]}
                yTickFormat={(v) => numeral(v).format('$0,0')}
                showYGrid={false}
              />
            </div>
            <div className="footer-content">
              <a>Recalculate</a>
            </div>
          </DashboardSection>
          <DashboardSection title={'Materials In Stock By Category - Average Cost'} style={{flex: 1}}>
            <div className="main-content chart">
              <BarHorizontalChart
                width={620}
                height={300}
                margins={{left: 200, top: 15, right: 20, bottom: 25}}
                showLegend={false}
                data={_.orderBy(materialsInStockByCategory, ['value'], ['asc'])}
                chartSeries={chartSeries}
                y={(d) => d.name}
                yScale="ordinal"
                xScale="linear"
                xDomain={[0, _.maxBy(materialsInStockByCategory, (x) => x.value).value * 1.1]}
                xTickFormat={(v) => numeral(v).format('$0,0')}
                xTicks={[2]}
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
