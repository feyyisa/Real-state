// React Router DOM
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Auth Context Provider
import { AuthProvider } from './context/AuthContext';

// Pages
import Home from './pages/costumer/Home';
import Login from './pages/commonshare/Login';
import Register from './pages/commonshare/Register';
import Contact from './pages/costumer/Contact';
import Pricing from './pages/costumer/Pricing';
import Service from './pages/costumer/Service';
import About from './pages/costumer/About';
import CustomerDashboard from './pages/costumer/CustomerDashboard';
import FeedbackForm from './pages/costumer/FeedbackForm';
import PaymentSuccess from './pages/costumer/PaymentSuccess';
import PaymentPage from './pages/costumer/PaymentPage';
import BookingHouse from './pages/costumer/BookingHouse';

// Admin Pages
import Dashboard from './pages/adminpage/Dashboard';
import OwnerManage from './pages/adminpage/OwnerManage';
import UserManage from './pages/adminpage/UserManage';
import PropertyManage from './pages/adminpage/PropertyManage';
import FedbackManage from './pages/adminpage/FedbackManage';
import AnalyticsDashboard from './pages/adminpage/AnalyticsDashboard';
import FeedbackList from './pages/adminpage/FeedbackList';

// Owner Pages
import AddPropertyForm from './pages/owner/AddPropertyForm';
import OwnerDashboard from './pages/owner/OwnerDashboard';
import PropertySearch from './pages/owner/PropertySearch';
import OwnerPropertyManager from './pages/owner/OwnerPropertyManager';
import OwnerBookingManager from './pages/owner/OwnerBookingManager';
import OwnerPayments from './pages/owner/OwnerPayment';
import Payment from './pages/owner/Payment';

// Components
import Navbar from './components/navbar';
import Footer from './components/footer';
import UserProfileUpdate from './components/UserProfileUpdate';
import ProtectedRoute from './components/ProtectedRoute';
import Checkout from './components/Checkout';
import MyMessege from './components/MyMessege';
import SocialMediaShare from './components/SocialMediaShare';
import LanguageSwitcher from './components/LanguageSwitcher';

function AppContent() {
  return (
    <>
      <Routes>
        {/* 🔓 Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 👤 Customer Routes */}
        <Route path="/" element={<><Navbar /><LanguageSwitcher /><Home /></>} />
        <Route path="/contact" element={<><Navbar /><LanguageSwitcher /><Contact /></>} />
        <Route path="/pricing" element={<><Navbar /><LanguageSwitcher /><Pricing /></>} />
        <Route path="/service" element={<><Navbar /><LanguageSwitcher /><Service /></>} />
        <Route path="/about" element={<><Navbar /><LanguageSwitcher /><About /></>} />

        {/* 🔒  Customer Protected Routes */}

        <Route path="/socialmedia" element={<ProtectedRoute allowedRoles={['customer']}><Navbar /><LanguageSwitcher /><SocialMediaShare /></ProtectedRoute>} />
        <Route path="/userprofileupdate" element={<ProtectedRoute allowedRoles={['customer']}><Navbar /><LanguageSwitcher /><UserProfileUpdate /></ProtectedRoute>} />
        <Route path="/payment" element={<ProtectedRoute allowedRoles={['customer']}><Navbar /><LanguageSwitcher /><Payment /></ProtectedRoute>} />
        <Route path="/paymentsuccess/:id" element={<ProtectedRoute allowedRoles={['customer']}><Navbar /><LanguageSwitcher /><PaymentSuccess /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute allowedRoles={['customer']}><Navbar /><LanguageSwitcher /><Checkout /></ProtectedRoute>} />
        <Route path="/paymentpage" element={<ProtectedRoute allowedRoles={['customer']}><Navbar /><LanguageSwitcher /><PaymentPage /></ProtectedRoute>} />
        <Route path="/bookhouse" element={<ProtectedRoute allowedRoles={['customer']}><Navbar /><LanguageSwitcher /><BookingHouse /></ProtectedRoute>} />
        <Route path="/mymessage" element={<ProtectedRoute allowedRoles={['customer']}><Navbar /><LanguageSwitcher /><MyMessege /></ProtectedRoute>} />

        <Route path="/costumer/customerdashboard" element={<ProtectedRoute allowedRoles={['customer']}><CustomerDashboard /></ProtectedRoute>}>
          <Route path="feedbacklist" element={<FeedbackList />} />
          <Route path="costumer" element={<Payment />} />
          <Route path="feedbackform" element={<FeedbackForm />} />
        </Route>


        {/* 🔒 Admin Protected Routes */}
        <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><Dashboard /></ProtectedRoute>} />
        <Route path="/admin/manageuser" element={<ProtectedRoute allowedRoles={['admin']}><UserManage /></ProtectedRoute>} />
        <Route path="/admin/manageproperty" element={<ProtectedRoute allowedRoles={['admin']}><PropertyManage /></ProtectedRoute>} />
        <Route path="/admin/managefedback" element={<ProtectedRoute allowedRoles={['admin']}><FedbackManage /></ProtectedRoute>} />
        <Route path="/admin/ownermanage" element={<ProtectedRoute allowedRoles={['admin']}><OwnerManage /></ProtectedRoute>} />
        <Route path="/admin/analythicsdashboard" element={<ProtectedRoute allowedRoles={['admin']}><AnalyticsDashboard /></ProtectedRoute>} />

        {/* 🔒 Owner Protected Routes */}
        <Route path="/owner/dashboard" element={<ProtectedRoute allowedRoles={['owner']}><OwnerDashboard /></ProtectedRoute>} />
        <Route path="/owner/addpropertyform" element={<ProtectedRoute allowedRoles={['owner']}><AddPropertyForm /></ProtectedRoute>} />
        <Route path="/owner/ownerpropertymanager" element={<ProtectedRoute allowedRoles={['owner']}><OwnerPropertyManager /></ProtectedRoute>} />
        <Route path="/owner/ownerbookingmanager" element={<ProtectedRoute allowedRoles={['owner']}><OwnerBookingManager /></ProtectedRoute>} />
        <Route path="/owner/ownerpayments" element={<ProtectedRoute allowedRoles={['owner']}><OwnerPayments /></ProtectedRoute>} />
        <Route path="/owner/searchproperty" element={<ProtectedRoute allowedRoles={['owner']}><PropertySearch /></ProtectedRoute>} />
      </Routes>

      <Footer />
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