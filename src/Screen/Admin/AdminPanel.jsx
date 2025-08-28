import { React } from 'react';
import SideNav from '../../Components/SideNav';

const Admin = () => {
  const stats = [
    { title: 'Branches', description: 'Manage all branches', bg: 'bg-yellow-600/80' },
    { title: 'Products', description: 'Add/Edit/Delete products', bg: 'bg-yellow-600/80' },
    { title: 'Inventory', description: 'View/Add stock', bg: 'bg-yellow-600/80' },
    { title: 'Employees', description: 'View branch employees', bg: 'bg-yellow-600/80' },
    { title: 'Offers', description: 'Manage global offers', bg: 'bg-yellow-600/80' },
  ];

  return (
    <div className="flex min-h-screen bg-black text-white">
      <SideNav />

      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-yellow-400 mb-4">Admin Dashboard</h1>
        <p className="text-yellow-200 mb-6">
          Overview of branches, products, and activities. Use the cards below to quickly access management sections.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`${stat.bg} p-6 rounded-2xl shadow-lg hover:shadow-yellow-500 transition-shadow cursor-pointer`}
            >
              <h2 className="text-xl font-bold mb-2">{stat.title}</h2>
              <p className="text-black">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
