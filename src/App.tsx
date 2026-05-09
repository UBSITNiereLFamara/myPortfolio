import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Portfolio from './components/Portfolio';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import Contact from './pages/Contact';

import './Portfolio.css';

const App: React.FC = () => {
  // =========================
  // PROTECTED ROUTE
  // =========================
  const ProtectedRoute = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    const token = localStorage.getItem('adminToken');

    if (!token) {
      return <Navigate to="/admin-login" replace />;
    }

    return <>{children}</>;
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* HOME */}
          <Route
            path="/"
            element={<Portfolio />}
          />

          {/* CONTACT PAGE */}
          <Route
            path="/contact"
            element={<Contact />}
          />

          {/* ADMIN LOGIN */}
          <Route
            path="/admin-login"
            element={<AdminLogin />}
          />

          {/* ADMIN DASHBOARD */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* UNKNOWN ROUTES */}
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;