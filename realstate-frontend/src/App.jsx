import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Only import once
import Home from './pages/costumer/Home';
import Login from './pages/commonshare/Login';
import Register from './pages/commonshare/Register';
import ProtectedRoute from './components/ProtectedRoute';
//import Sidebar from './components/Sidebar';
import Dashboard from './pages/adminpage/Dashboard';
import OwnerManage from './pages/adminpage/OwnerManage';
import UserManage from './pages/adminpage/UserManage';
import PropertyManage from './pages/adminpage/PropertyManage';
import FedbackManage from './pages/adminpage/FedbackManage';
import Navbar from './components/navbar';
import Footer from './components/footer';
import UserProfileUpdate from './components/UserProfileUpdate';
//import DashboardHeader from './components/DashboardHeader';
import AddPropertyForm from './pages/owner/AddPropertyForm';
import Contact from './pages/costumer/Contact';
import Pricing from './pages/costumer/Pricing';
import Service from './pages/costumer/Service';
import About from './pages/costumer/About';
import { useEffect } from 'react';
import PropertySearch from './pages/owner/PropertySearch';
import CustomerDashboard from './pages/costumer/CustomerDashboard';
//import CustSidebar from './components/CustSidebar';
//import CustDasboardHeader from './components/CustDasboardHeader';
import OwnerDashboard from './pages/owner/OwnerDashboard';
import Payment from './pages/owner/Payment';
import PaymentSuccess from './pages/costumer/PaymentSuccess';
import SocialMediaShare from './components/SocialMediaShare';
import LanguageSwitcher from './components/LanguageSwitcher';
import PaymentPage from './pages/costumer/PaymentPage';
import FeedbackForm from './pages/costumer/FeedbackForm';
import FeedbackList from './pages/adminpage/FeedbackList';
import Checkout from './components/Checkout';
import AnalyticsDashboard from './pages/adminpage/AnalyticsDashboard';
import OwnerPropertyManager from './pages/owner/OwnerPropertyManager';
import OwnerBookingManager from './pages/owner/OwnerBookingManager';
import OwnerPayments from './pages/owner/OwnerPayment';
import BookingHouse from './pages/costumer/BookingHouse';
import MyMessege from './components/MyMessege';
//import OwnerAnalytics from './pages/owner/OwnerAnalytics';
function AppContent() {
  const location = useLocation();

  const isDashboard = location.pathname.startsWith("/dashboard");
  const isCustomerDashboard = location.pathname.startsWith("/costumer/customerdashboard");
  const isLogin = location.pathname.startsWith("/login");
  const isRegister = location.pathname.startsWith("/register");
  const isOwnerDashboard = location.pathname.startsWith("/owner/ownerdashboard");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const hideGlobalNav = isDashboard || isCustomerDashboard || isLogin || isRegister || isOwnerDashboard;

  return (
    <>
      {/* Conditionally render navbar/footer */}
      {!hideGlobalNav && <Navbar />}

      <div className="p-2">
        {!hideGlobalNav && (
          <div className="flex justify-end pr-6">
            <LanguageSwitcher />
          </div>
        )}
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/service" element={<Service />} />
        <Route path="/about" element={<About />} />
        <Route path="/socialmedia" element={<SocialMediaShare />} />
        <Route path="/userprofileupdate" element={<UserProfileUpdate />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/paymentsuccess/:id" element={<PaymentSuccess />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/paymentpage" element={<PaymentPage />} />
        <Route path="/bookhouse" element={<BookingHouse />} />
        <Route path="/mymessage"element={<MyMessege />} />
        {/* Protected and admin routes */}
        <Route path="/protectedroute" element={<ProtectedRoute />}>
          {/* Protected Routes */}
        </Route>
        
        {/*<Route path="/sidebar" element={<Sidebar />} />
        <Route path="/custsidebar" element={<CustSidebar />} />
        <Route path="/custdasboardheader" element={<CustDasboardHeader />} />
        <Route path="/dashboardheader" element={<DashboardHeader />} />*/}
        <Route path="costumer/customerdashboard" element={<CustomerDashboard />} >
        <Route path="feedbacklist" element={<FeedbackList />} />
        <Route path="costumer" element={<Payment />} />
        <Route path="feedbackform" element={<FeedbackForm />} />
            </Route>
        {/* Protected Admin Dashboard Routes */}
        <Route path="/dashboard"element={<ProtectedRoute allowedRoles={['admin']}><Dashboard /></ProtectedRoute> } >
          <Route path="manageuser" element={<UserManage />} />
          <Route path="manageproperty" element={<PropertyManage />} />
          <Route path="managefedback" element={<FedbackManage />} />
          <Route path="ownermanage" element={<OwnerManage />} />
          <Route path="analythicsdashboard" element={<AnalyticsDashboard />} />
        </Route>

        {/* Protected Owner Dashboard Routes */}
        <Route path="/owner/ownerdashboard"element={<ProtectedRoute allowedRoles={['owner']}><OwnerDashboard /></ProtectedRoute>}>
          <Route path="addpropertyform" element={<AddPropertyForm />} />
          <Route path="ownerpropertymanager" element={<OwnerPropertyManager />} />
          <Route path="ownerbookingmanager" element={<OwnerBookingManager/>} />
          
          <Route path="ownerpayments" element={<OwnerPayments />} />
          <Route path="searchproperty" element={<PropertySearch />} />
          
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
