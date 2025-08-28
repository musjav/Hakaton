import React from 'react'
import ManagerSideNav from '../../Components/ManagrSideNav'

const BM = () => {
  return (
    <div className="min-h-screen flex bg-black text-yellow-200">
      {/* Sidebar */}
      <ManagerSideNav />

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-yellow-400 mb-4">Branch Manager Dashboard</h1>
        <p className="text-yellow-300">
          Welcome! Here you can manage branch activities, view employees, track inventory, and oversee operations.
        </p>
      </main>
    </div>
  )
}

export default BM
