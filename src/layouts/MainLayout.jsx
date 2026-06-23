import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Responsive sticky navigation */}
      <Navbar />

      {/* Main page content area */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Dynamic footer based on page context */}
      <Footer />
    </div>
  );
}
