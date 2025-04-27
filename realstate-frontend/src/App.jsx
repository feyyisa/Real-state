import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/adminpage/Dashboard';
import OwnerManage from './pages/adminpage/OwnerManage';
import UserManage from './pages/adminpage/UserManage';
import PropertyManage from './pages/adminpage/PropertyManage';
import FedbackManage from './pages/adminpage/FedbackManage';
import Navbar from './components/navbar';
import Footer from './components/footer';
import DashboardHeader from './components/DashboardHeader';
import Authcontext from './context/AuthContext';
import AddPropertyForm from './pages/owner/AddPropertyForm';
import Contact from './pages/Contact';
import Pricing from './pages/Pricing';
import Service from './pages/Service';
import About from './pages/About';
import { useEffect } from 'react';
import PropertySearch from './pages/costumer/PropertySearch';
import CustomerDashboard from './pages/costumer/CustomerDashboard';
import CustSidebar from './components/CustSidebar';
import CustDasboardHeader from './components/CustDasboardHeader';
import OwnerDashboard from './pages/owner/OwnerDashboard';

function AppContent() {
  const location = useLocation();

  // Detect admin or customer dashboard routes
  const isDashboard = location.pathname.startsWith("/dashboard");
  const isCustomerDashboard = location.pathname.startsWith("/costumer/customerdashboard");

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on route change
  }, [location]);

  const hideGlobalNav = isDashboard || isCustomerDashboard;

  return (
    <>
      {/* Conditionally render navbar/footer */}
      {!hideGlobalNav && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/service" element={<Service />} />
        <Route path="/about" element={<About />} />
        <Route path="/properties" element={<PropertySearch />} />

        {/* Protected and admin routes */}
        <Route path="/protected" element={<ProtectedRoute />} />
        <Route path="/authcontext" element={<Authcontext />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/custsidebar" element={<CustSidebar />} />
        <Route path="/custdasboardheader" element={<CustDasboardHeader />} />
        <Route path="/dashboardheader" element={<DashboardHeader />} />
      

        <Route path="/costumer/customerdashboard" element={<CustomerDashboard />} />
        
        <Route path="/owner/ownerdashboard" element={<OwnerDashboard/>}>
        <Route path="addpropertyform" element={<AddPropertyForm />} />
        </Route>

        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="manageuser" element={<UserManage />} />
          <Route path="manageproperty" element={<PropertyManage />} />
          <Route path="managefedback" element={<FedbackManage />} />
          <Route path="ownermanage" element={<OwnerManage />} />
        </Route>
      </Routes>

      {!hideGlobalNav && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
