//I want to return a specific list of menu itmes depending on the router path.
// eg. Virtual Terminal should have its own set of links in the nav menu


const Main = [
  {
    text: "Home",
    path: "/home",
    icon: "home"
  },
  {
    text: "Datacom",
    path: "/datacom",
    icon: "material-icons domain"
  },
  {
    text: "Partners",
    path: "/partner",
    icon: "mdi mdi-office-building"
  },
  {
    text: "Merchants",
    path: "/merchant",
    icon: "material-icons storefront"
  },
  {
    text: "Employees",
    path: "/employee",
    icon: "mdi mdi-account-group"
  },
  {
    text: "Sales Offices",
    path: "/sales-office",
    icon: "mdi mdi-city-variant-outline"
  },
  {
    text: "Warehouse",
    icon: "mdi mdi-garage-variant",
    items: [
			{
        text: "Warehouses",
        path: "/warehouse",
        icon: "mdi mdi-garage"
      },
      {
        text: "Inventory",
        path: "/inventory",
        icon: "mdi mdi-package-variant"
      },
    ]
  },
  {
    text: "Test Page",
    path: "/test-page",
    icon: "mdi mdi-function-variant"
  },
];

const Datacom = [
  {
    text: "Home",
    path: "/home",
    icon: "home"
  },
  {
    text: "Datacom",
    path: "/datacom",
    icon: "mdi mdi-office-building"
  },
  {
    text: "Partners",
    path: "/partner",
    icon: "mdi mdi-office-building"
  },
  {
    text: "Merchants",
    path: "/merchant",
    icon: "mdi mdi-office-building"
  },
  {
    text: "Employees",
    path: "/employee",
    icon: "mdi mdi-account-group"
  },
  {
    text: "Sales Offices",
    path: "/sales-offices",
    icon: "mdi mdi-city-variant-outline"
  },
  {
    text: "Warehouses",
    path: "/warehouses",
    icon: "mdi mdi-garage-variant",
    items: [
      {
        text: "Inventory",
        path: "/inventory",
        icon: "mdi mdi-package-variant"
      },
    ]
  },
  {
    text: "Colors",
    path: "/colors",
    icon: "mdi mdi-palette"
  },
  {
    text: "Icons",
    path: "/icons",
    icon: "mdi mdi-emoticon-excited-outline"
  },
]

const Partner = [
  {
    text: "Home",
    path: "/home",
    icon: "home"
	},
  {
    text: "Partners",
    path: "/partner",
    icon: "mdi mdi-office-building"
  },
  {
    text: "Merchants",
    path: "/merchant",
    icon: "mdi mdi-office-building"
  },
  {
    text: "Employees",
    path: "/employee",
    icon: "mdi mdi-account-group"
  },
  {
    text: "Sales Offices",
    path: "/sales-offices",
    icon: "mdi mdi-city-variant-outline"
  },
  {
    text: "Warehouses",
    path: "/warehouses",
    icon: "mdi mdi-garage-variant",
    items: [
      {
        text: "Inventory",
        path: "/inventory",
        icon: "mdi mdi-package-variant"
      },
    ]
  },
  {
    text: "Shipping",
    path: "/shipping",
    icon: "mdi mdi-truck-delivery-outline"
  },
  {
    text: "Payment Methods",
    path: "/payment-methods",
    icon: "mdi mdi-credit-card-outline"
  },
  {
    text: "Reporting",
    path: "/reporting",
    icon: "mdi mdi-newspaper-variant-outline"
  },
];
const Merchant = [
  {
    text: "Home",
    path: "/home",
    icon: "home"
  },
  {
    text: "Employees",
    path: "/employee",
    icon: "mdi mdi-account-group"
  },
  {
    text: "Sales Offices",
    path: "/sales-offices",
    icon: "mdi mdi-city-variant-outline"
  },
  {
    text: "Warehouses",
    path: "/warehouses",
    icon: "mdi mdi-garage-variant",
    items: [
      {
        text: "Inventory",
        path: "/inventory",
        icon: "mdi mdi-package-variant"
      },
    ]
  },
  {
    text: "Shipping",
    path: "/shipping",
    icon: "mdi mdi-truck-delivery-outline"
  },
  {
    text: "Payment Methods",
    path: "/payment-methods",
    icon: "mdi mdi-credit-card-outline"
  },
  {
    text: "Reporting",
    path: "/reporting",
    icon: "mdi mdi-newspaper-variant-outline"
  },
];
const SalesOffice = [
  {
    text: "Home",
    path: "/home",
    icon: "home"
  },
  {
    text: "Employees",
    path: "/employee",
    icon: "mdi mdi-account-group"
  },
  {
    text: "Warehouses",
    path: "/warehouses",
    icon: "mdi mdi-garage-variant",
    items: [
      {
        text: "Inventory",
        path: "/inventory",
        icon: "mdi mdi-package-variant"
      },
    ]
  },
  {
    text: "Shipping",
    path: "/shipping",
    icon: "mdi mdi-truck-delivery-outline"
  },
  {
    text: "Payment Methods",
    path: "/payment-methods",
    icon: "mdi mdi-credit-card-outline"
  },
  {
    text: "Reporting",
    path: "/reporting",
    icon: "mdi mdi-newspaper-variant-outline"
  },
  {
    text: "Quotes / Invoices",
    icon: "folder",
    items: [
      {
        text: "Sales Quotes",
        path: "/quotes"
      },
      {
        text: "Work Orders",
        path: "/work-order"
      },
      {
        text: "Invoices",
        path: "/invoices"
      },
    ]
  }
];
const Warehouse = [
  {
    text: "Home",
    path: "/home",
    icon: "home"
  },
  {
    text: "Employees",
    path: "/employee",
    icon: "mdi mdi-account-group"
  },
  {
    text: "Sales Offices",
    path: "/sales-offices",
    icon: "mdi mdi-city-variant-outline"
  },
  {
    text: "Warehouses",
    path: "/warehouses",
    icon: "mdi mdi-garage-variant",
    items: [
      {
        text: "Inventory",
        path: "/inventory",
        icon: "mdi mdi-package-variant"
      },
    ]
  },
  {
    text: "Shipping",
    path: "/shipping",
    icon: "mdi mdi-truck-delivery-outline"
  },
  {
    text: "Payment Methods",
    path: "/payment-methods",
    icon: "mdi mdi-credit-card-outline"
  },
  {
    text: "Reporting",
    path: "/reporting",
    icon: "mdi mdi-newspaper-variant-outline"
  },
  {
    text: "SO's and PO's",
    icon: "folder",
    items: [
      {
        text: "Sales Orders",
        path: "/quotes"
      },
      {
        text: "Purchase Orders",
        path: "/work-order"
      },
      {
        text: "Backordered",
        path: "/invoices"
      },
      {
        text: "Receive Inventory",
        path: "/invoices"
      },
    ]
  }
];
const Employee = [
  {
    text: "Home",
    path: "/home",
    icon: "home"
  },
  {
    text: "Employees",
    path: "/employee",
    icon: "mdi mdi-account-group"
  },
  {
    text: "Sales Offices",
    path: "/sales-offices",
    icon: "mdi mdi-city-variant-outline"
  },
  {
    text: "Warehouses",
    path: "/warehouses",
    icon: "mdi mdi-garage-variant",
    items: [
      {
        text: "Inventory",
        path: "/inventory",
        icon: "mdi mdi-package-variant"
      },
    ]
  },
  {
    text: "Shipping",
    path: "/shipping",
    icon: "mdi mdi-truck-delivery-outline"
  },
  {
    text: "Payment Methods",
    path: "/payment-methods",
    icon: "mdi mdi-credit-card-outline"
  },
  {
    text: "Reporting",
    path: "/reporting",
    icon: "mdi mdi-newspaper-variant-outline"
  },
];
const Customer = [
  {
    text: "Home",
    path: "/home",
    icon: "home"
  },
  {
    text: "Shipping",
    path: "/shipping",
    icon: "mdi mdi-truck-delivery-outline"
  },
  {
    text: "Payment Methods",
    path: "/payment-methods",
    icon: "mdi mdi-credit-card-outline"
  },
  {
    text: "Reporting",
    path: "/reporting",
    icon: "mdi mdi-newspaper-variant-outline"
  },
];
const Inventory = [
  {
    text: "Home",
    path: "/home",
    icon: "home"
  },
  {
    text: "Employees",
    path: "/employee",
    icon: "mdi mdi-account-group"
  },
  {
    text: "Sales Offices",
    path: "/sales-offices",
    icon: "mdi mdi-city-variant-outline"
  },
  {
    text: "Warehouses",
    path: "/warehouses",
    icon: "mdi mdi-garage-variant",
    items: [
      {
        text: "Inventory",
        path: "/inventory",
        icon: "mdi mdi-package-variant"
      },
    ]
  },
  {
    text: "Shipping",
    path: "/shipping",
    icon: "mdi mdi-truck-delivery-outline"
  },
  {
    text: "Payment Methods",
    path: "/payment-methods",
    icon: "mdi mdi-credit-card-outline"
  },
  {
    text: "Reporting",
    path: "/reporting",
    icon: "mdi mdi-newspaper-variant-outline"
  },
];

export { Main }
export { Datacom }
export { Partner }
export { Merchant }
export { SalesOffice }
export { Warehouse }
export { Employee }
export { Customer }
export { Inventory }