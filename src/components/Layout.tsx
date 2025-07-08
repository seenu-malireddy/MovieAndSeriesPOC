import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout