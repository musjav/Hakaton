

export const formConfigs = {
  branches: {
    collection: "branches",
    fields: [
      { name: "name", label: "Branch Name", type: "text", required: true },
      { name: "location", label: "Location", type: "text", required: true },
      { name: "managerId", label: "Manager ID", type: "text", required: true },
      { name: "type", label: "Branch Type", type: "text", required: true }
    ]
  },
  products: {
    collection: "products",
    fields: [
      { name: "name", label: "Product Name", type: "text", required: true },
      { name: "category", label: "Category", type: "text", required: true },
      { name: "price", label: "Price", type: "number", required: true },
      { name: "stock", label: "Stock", type: "number", required: true },
      { name: "description", label: "Description", type: "text", required: true },

    ]
  },
  inventory: {
    collection: "inventory",
    fields: [
      { name: "productId", label: "Product ID", type: "text", required: true },
      { name: "branchId", label: "Branch ID", type: "text", required: true },
      { name: "quantity", label: "Quantity", type: "number", required: true },
      { name: "lastUpdated", label: "Last Updated", type: "date", required: true }
    ]
  },
  branchmanagerdashboard: {
    collection: "branchmanagerdashboard",
    fields: [
      { name: "firstName", label: "First Name", type: "text", required: true },
      { name: "lastName", label: "Last Name", type: "text", required: true, },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "Phone", label: "Phone", type: "tel", required: true },
      { name: "gender", label: "Gender", type: "radio", options: ["male", "female"], required: true },
      { name: "branchId", label: "Branch ID", type: "text", required: true },
      { name: "password", label: "Password", type: "text", required: true },
      { name: "managerId", label: "Manager Id", type: "text", required: true },

    ]
  },
  employees: {
    collection: "employees",
    fields: [
      { name: "firstName", label: "First Name", type: "text", required: true },
      { name: "lastName", label: "Last Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "position", label: "Position", type: "text", required: true },
      { name: "branchId", label: "Branch ID", type: "text", required: true }
    ]
  },
  offers: {
    collection: "offers",
    fields: [
      { name: "title", label: "Offer Title", type: "text", required: true },
      { name: "description", label: "Description", type: "text", required: true },
      { name: "discount", label: "Discount (%)", type: "number", required: true },
      { name: "validity", label: "Validity Date", type: "date", required: true }
    ]
  },
  stock: {
    collection: "stock",
    fields: [
      { name: "productId", label: "Product ID", type: "text", required: true },
      { name: "branchId", label: "Branch ID", type: "text", required: true },
      { name: "quantity", label: "Quantity", type: "number", required: true },
      { name: "lastUpdated", label: "Last Updated", type: "date", required: true }
    ]
  },
  reviews: {
    collection: "reviews",
    fields: [
      { name: "Name", label: "User Name", type: "text", required: true },
      { name: "useremail", label: "User Email", type: "text", required: true },
        { name: "location", label: "Branch", type: "radio", options: ["Gulshan", "FB-Area","Johar","Nazimabad"], required: true },

      { name: "rating", label: "Rating (1-5)", type: "number", required: true, min: 1, max: 5 },
      { name: "comment", label: "Comment", type: "text", required: false }
    ]
  }

};
