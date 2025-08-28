// listConfig.js
export const listConfigs = {
  branches: {
    collection: "branches",
    columns: [
      { key: "name", label: "Branch Name" },
      { key: "location", label: "Location" },
      { key: "managerId", label: "Manager ID" },
      { key: "type", label: "Branch Type" }
    ]
  },
  products: {
    collection: "products",
    columns: [
      { key: "name", label: "Product Name" },
      { key: "category", label: "Category" },
      { key: "price", label: "Price" },
      { key: "stock", label: "Stock" }
      ,{ key: "description", label: "Description" }
    ]
  },
  inventory: {
    collection: "inventory",    
    columns: [
      { key: "productId", label: "Product ID" },
      { key: "branchId", label: "Branch ID" },
      { key: "quantity", label: "Quantity" },
      { key: "lastUpdated", label: "Last Updated" }
    ]
  },
  employees: {
    collection: "employees",
    columns: [
      { key: "firstName", label: "First Name" },
      { key: "lastName", label: "Last Name" },
      { key: "email", label: "Email" },
      { key: "position", label: "Position" },
      { key: "branchId", label: "Branch ID" }
    ]
  },
  branchmanagerdashboard: { 
    collection: "branchmanagerdashboard",
    columns: [
      { key: "firstName", label: "First Name" },
      { key: "lastName", label: "Last Name" },
      { key: "email", label: "Email" },
      { key: "branchId", label: "Branch ID" }
    ]
  },
  offers: {
    collection: "offers",
    columns: [
      { key: "title", label: "Offer Title" },
      { key: "description", label: "Description" },
      { key: "discount", label: "Discount (%)" },
      { key: "validity", label: "Validity Date" }
    ]
  },
  stock: {
    collection: "stock",
    columns: [
      { key: "productId", label: "Product ID" },
      { key: "branchId", label: "Branch ID" },
      { key: "quantity", label: "Quantity" },
      { key: "lastUpdated", label: "Last Updated" }
    ]
  }
  ,

};
