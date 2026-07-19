import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StaffLogin from './pages/StaffLogin';
import EmployeePortal from './pages/EmployeePortal';
import SignIn from './pages/SignIn';
import CreateAccount from './pages/CreateAccount';
import GlobalMembership from './pages/GlobalMembership';
import ContactPage from './pages/ContactPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

// Employee Module
import EmployeeLayout from './layouts/EmployeeLayout';
import Dashboard from './pages/employee/Dashboard';
import Attendance from './pages/employee/Attendance';

function App() {
  return (
    <Router>
      <Routes>
        {/* Existing Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/staff-login" element={<StaffLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/employee-portal" element={<EmployeePortal />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/global-membership" element={<GlobalMembership />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* New Employee Dashboard Routes */}
        <Route path="/employee-dashboard" element={<EmployeeLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="attendance" element={<Attendance />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
