import _ from 'lodash';

import {LOCAL_STORAGE_TOKEN_KEY, ActionTypes} from '../../constants';

let initialState = {
	lists: [
	  {
	    name: 'Tools & Materials',
	    children: [
	      { name: 'Categories' },
	      { name: 'Certifications' },
	      { name: 'Classes' },
	      { name: 'Contractors' },
	      { name: 'Customers' },
	      { name: 'Departments' },
	      { name: 'Employees' },
	      { name: 'Employee Types' },
	      { name: 'Locations' },
	      { name: 'Manufacturers' },
	      { name: 'Number Blocks.' },
	      { name: 'Shipping Methods' },
	      { name: 'Status Codes' },
	      { name: 'Units of Measure' }
	    ]
	  },
	  {
	    name: 'Purchasing & Receiving',
	    children: [
	      { name: 'Vendors' }
	    ]
	  },
	  {
	    name: 'Job Cost & Billing',
	    children: [
	      { name: 'Cost Centers' },
	      { name: 'Cost Codes' }
	    ]
	  },
	  {
	    name: 'List Utilities',
	    children: [
	      { name: 'Data Merge Utility' }
	    ]
	  },
	  {
	    name: 'Service',
	    children: [
	      { name: 'Service Classes' }
	    ]
	  }
	],
	navigators: [
	  { name: 'System Dashboard', tabType: 'dashboard', tabTitle: 'System Dashboard' },
	  {
	    name: 'Tools & Equipment',
	    tabType: 'dashboard',
	    tabTitle: 'Tools Dashboard',
	    children: [
	      { name: 'Tools', tabType: 'tool_browser', tabTitle: 'Tool Browser' },
	      { name: 'Tool Models', tabType: 'tool_model_records', tabTitle: 'Tool Model Records' },
	      { name: 'Tool Kits', tabType: 'kit_browser', tabTitle: 'Kit Browser' },
	      { name: 'Manage Retired Tools', tabType: 'retired_tools', tabTitle: 'Retired Tools' },
	      { name: 'Reports', tabType: 'report', tabTitle: 'Reporting' }
	    ]
	  },
	  {
	    name: 'Materials & Consumables',
	    tabType: 'dashboard',
	    tabTitle: 'Materials Dashboard',
	    children: [
	      { name: 'Materials', tabType: 'material_browser', tabTitle: 'Material Browser' },
	      { name: 'Material Models', tabType: 'material_model_records', tabTitle: 'Material Model Records' },
	      { name: 'Low Level Browser', tabType: 'low_level_browser', tabTitle: 'Low Level Browser' },
	      { name: 'Reports', tabType: 'report', tabTitle: 'Reporting' }
	    ]
	  },
	  {
	    name: 'Pick Tickets & Transfers',
	    tabType: 'dashboard',
	    tabTitle: 'Assignments Dashboard',
	    children: [
	      { name: 'Transfer Tickets', tabType: 'transfer_browser', tabTitle: 'Transfer Browser' },
	      { name: 'Pick Tickets', tabType: 'pick_ticket_browser', tabTitle: 'Pick Ticket Browser' },
	      { name: 'Templates', tabType: 'template_browser', tabTitle: 'Template Browser' },
	      { name: 'Count Inventory', tabType: 'count_ticket_browser', tabTitle: 'Count Ticket Browser' },
	      { name: 'Reports', tabType: 'report', tabTitle: 'Reporting' }
	    ]
	  },
	  {
	    name: 'Service & Calibration',
	    tabType: 'dashboard',
	    tabTitle: 'Service Dashboard',
	    children: [
	      { name: 'Service Requests', tabType: 'service_request_browser', tabTitle: 'Service Request Browser' },
	      { name: 'Work Orders', tabType: 'work_orders_browser', tabTitle: 'Work Orders Browser' },
	      { name: 'Browse Service Schedule', tabType: 'service_scheule', tabTitle: 'Service Schedule' },
	      { name: 'Reports', tabType: 'report', tabTitle: 'Reporting' }
	    ]
	  },
	  {
	    name: 'Purchasing & Receiving',
	    tabType: 'dashboard',
	    tabTitle: 'Purchasing Dashboard',
	    children: [
	      { name: 'Purchase Orders', tabType: 'purchase_order_browser', tabTitle: 'Purchase Order Browser' },
	      { name: 'Receiving Tickets', tabType: 'receiving_browser', tabTitle: 'Receiving Browser' },
	      { name: 'Reports', tabType: 'report', tabTitle: 'Reporting' }
	    ]
	  },
	  {
	    name: 'Job Cost & Billing',
	    children: [
	      { name: 'Billing Browser', tabType: 'billing_browser', tabTitle: 'Billing Browser' },
	      { name: 'Rate Sheets', tabType: 'ratesheet_browser', tabTitle: 'RateSheet Browser' },
	      { name: 'Equipment Usage Log' },
	      { name: 'Export Templates' },
	      { name: 'Export Data' },
	      { name: 'Invoice Browser', tabType: 'invoice_browser', tabTitle: 'Invoice Browser' },
	      { name: 'Reports', tabType: 'report', tabTitle: 'Reporting' }
	    ]
	  },
	  {
	    name: 'Reports & Graphs',
	    tabType: 'report',
	    tabTitle: 'Reporting'
	  },
	  {
	    name: 'Administration',
	    children: [
	      { name: 'Change My Password' },
	      { name: 'Change My Security Qustion' },
	      { name: 'Configure User Roles' },
	      { name: 'Company Calendar' }
	    ]
	  },
	  {
	    name: 'Recycle Bin',
	    tabType: 'recycle_bin',
	    tabTitle: 'Recycle Bin'
	  }
	],
	org_trees: [
	  {
	    name: 'Sigma Warehouse',
	    children: [
	      { name: '123' },
	      { name: 'Auburn2' },
	      { name: 'CSR tr1' },
	      { name: 'Farrington' },
	      { name: 'Farrington Warehouse' },
	      { name: 'Kristina\'s House' },
	      {
	        name: 'LK Comstock',
	        children: [
	          { name: 'Dunderfunk' }
	        ]
	      },
	      { name: 'NewMech test' },
	      {
	        name: 'Portland Warehouse',
	        children: [
	          { name: 'Trailer1' }
	        ]
	      },
	      { name: 'Receipt Inspection' },
	      { name: 'Sarah\'s Office' },
	      { name: 'Syracuse Branch' },
	      { name: 'SYRACUSE WAREHOUSE' },
	      { name: 'Toolwatch for cage' },
	      {
	        name: 'ToolWatch Tool Crib',
	        children: [
	          { name: 'La Porte Warehouse' }
	        ]
	      },
	      { name: 'Westlake High School' },
	      { name: 'Westlake High School' }
	    ]
	  }
	],
	tool_browser_categories: [
		{
	    name: 'Categories',
	    children: [
	    	{
	    		name: 'All Categories',
	    		children: [
	    			{ name: 'All Tools' },
	    			{
	    				name: 'Employees',
	    				children: [
	    					{ name: 'Admin, Sigma' },
	    					{ name: 'Bartley, Bruce' },
	    					{ name: 'Battaia, Jake' }
	    				]
	    			},
	    			{
	    				name: 'Locations',
	    				children: [
	    					{ name: '09105 Kissing Camel' },
	    					{ name: '10411 - Legacy' },
	    					{ name: '33441 - Job A' },
	    					{ name: '4455 - Job B' }
	    				]
	    			}
	    		]
	    	},
	    	{
	    		name: 'Adhesive Gun Tool Only',
	    		children: [
	    			{ name: 'All All Adhesive Gun Tool Only' },
	    			{
	    				name: 'Employees',
	    				children: [
	    					{ name: 'Admin, Sigma' },
	    					{ name: 'Bartley, Bruce' },
	    					{ name: 'Battaia, Jake' }
	    				]
	    			},
	    			{
	    				name: 'Locations',
	    				children: [
	    					{ name: '09105 Kissing Camel' },
	    					{ name: '10411 - Legacy' },
	    					{ name: '33441 - Job A' },
	    					{ name: '4455 - Job B' }
	    				]
	    			}
	    		]
	    	}
	    ]
	  }
	],

	tool_model_records: [
		{
	    name: 'Categories',
	    children: [
	    	{
	    		name: 'All Categories',
	    		children: [
	    			{ name: 'All Model Records' },
	    			{
	    				name: 'Manufacturers',
	    				children: [
	    					{ name: '2M New' },
	    					{ name: '3M New' },
	    					{ name: '3M PRODUCTS' }
	    				]
	    			}
	    		]
	    	},
	    	{
	    		name: 'Adhesive Gun Tool Only',
	    		children: [
	    			{ name: 'All Adhesive Gun Tool Only' },
	    			{
	    				name: 'Manufacturers',
	    				children: [
	    					{ name: '2M New' },
	    					{ name: '3M New' },
	    					{ name: '3M PRODUCTS' }
	    				]
	    			}
	    		]
	    	}
	    ]
	  }
	],

	tool_kits_categories: [
		{
	    name: 'Categories',
	    children: [
	    	{
	    		name: 'All Categories',
	    		children: [
	    			{ name: 'All Tools' },
	    			{
	    				name: 'Employees',
	    				children: [
	    					{ name: 'Admin, Sigma' },
	    					{ name: 'Bartley, Bruce' },
	    					{ name: 'Battaia, Jake' }
	    				]
	    			},
	    			{
	    				name: 'Locations',
	    				children: [
	    					{ name: '09105 Kissing Camel' },
	    					{ name: '10411 - Legacy' },
	    					{ name: '33441 - Job A' },
	    					{ name: '4455 - Job B' }
	    				]
	    			}
	    		]
	    	},
	    	{
	    		name: 'Adhesive Gun Tool Only',
	    		children: [
	    			{ name: 'All All Adhesive Gun Tool Only' },
	    			{
	    				name: 'Employees',
	    				children: [
	    					{ name: 'Admin, Sigma' },
	    					{ name: 'Bartley, Bruce' },
	    					{ name: 'Battaia, Jake' }
	    				]
	    			},
	    			{
	    				name: 'Locations',
	    				children: [
	    					{ name: '09105 Kissing Camel' },
	    					{ name: '10411 - Legacy' },
	    					{ name: '33441 - Job A' },
	    					{ name: '4455 - Job B' }
	    				]
	    			}
	    		]
	    	}
	    ]
	  }
	],

	material_browser_categories: [
		{
	    name: 'Categories',
	    children: [
	    	{
	    		name: 'All Categories',
	    		children: [
	    			{ name: 'All Materials' },
	    			{
	    				name: 'Stock Locations',
	    				children: [
	    					{ name: '123' },
	    					{ name: '282136 - Spiritwood' },
	    					{ name: 'Auburn2' }
	    				]
	    			}
	    		]
	    	},
	    	{
	    		name: '6" Lg. Sawsall Blades 18 TPI',
	    		children: [
	    			{ name: 'All 6" Lg.Sawsall Blades 18 TPI' },
	    			{
	    				name: 'Stock Locations',
	    				children: [
	    					{ name: '123' },
	    					{ name: '282136 - Spiritwood' },
	    					{ name: 'Auburn2' }
	    				]
	    			}
	    		]
	    	}
	    ]
	  }
	],

	material_model_records: [
		{
	    name: 'Categories',
	    children: [
	    	{
	    		name: 'All Categories',
	    		children: [
	    			{ name: 'All Materials' },
	    			{
	    				name: 'Manufacturers',
	    				children: [
	    					{ name: '2M New' },
	    					{ name: '3M New' },
	    					{ name: '3M PRODUCTS' }
	    				]
	    			}
	    		]
	    	},
	    	{
	    		name: '6" Lg. Sawsall Blades 18 TPI',
	    		children: [
	    			{ name: 'All 6" Lg. Sawsall Blades 18 TPI' },
	    			{
	    				name: 'Manufacturers',
	    				children: [
	    					{ name: '2M New' },
	    					{ name: '3M New' },
	    					{ name: '3M PRODUCTS' }
	    				]
	    			}
	    		]
	    	}
	    ]
	  }
	]
};

export default function sidemenu(state = initialState, action) {
	const {type, result} = action;
	switch(type) {
	}
	return state;
}
