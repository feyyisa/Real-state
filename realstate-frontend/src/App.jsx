// React Router DOM
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

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
import RealEstateChat from './RealEstateChat';
// Admin Pages
import Dashboard from './pages/adminpage/Dashboard';
import UserManage from './pages/adminpage/UserManage';
import PropertyManage from './pages/adminpage/PropertyManage';
import FedbackManage from './pages/adminpage/FedbackManage';
import AdminAnnouncements from './pages/adminpage/AdminAnnouncement';
// Owner Pages
import AddPropertyForm from './pages/owner/AddPropertyForm';
import EditPropertyForm from './pages/owner/EditPropertyForm';
import OwnerDashboard from './pages/owner/OwnerDashboard';
import PropertySearch from './pages/owner/PropertySearch';
import OwnerPropertyManager from './pages/owner/OwnerPropertyManager';
import OwnerBookingManager from './pages/owner/OwnerBookingManager';
import FeedbackList from './pages/owner/FeedbackList';

// Components
import Navbar from './components/navbar';
import Footer from './components/footer';
import UserProfileUpdate from './components/UserProfileUpdate';
import ProtectedRoute from './components/ProtectedRoute';
import Checkout from './components/Checkout';
import MyMessege from './components/MyMessege';
import SocialMediaShare from './components/SocialMediaShare';
import LanguageSwitcher from './components/LanguageSwitcher';
import BookingSummary from './components/BookingSummary';
import FAQPage from './components/FAQPage';
import OwnerLayout from './components/OwnerLayout';
import AdminLayout from './components/AdminLayout';
import CustomerAnnouncements from './components/CustomerAnnouncements';
function AppContent() {
  const location = useLocation();
  const hideFooterForRoutes = [
    '/admin', '/owner'
  ];

  // Checks if the current route starts with /admin or /owner
  const shouldHideFooter = hideFooterForRoutes.some(prefix => location.pathname.startsWith(prefix));

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<><LanguageSwitcher /><Login /></>} />
        <Route path="/register" element={<><LanguageSwitcher /><Register /></>} />

        {/* Customer Routes */}
        <Route path="/" element={<><Navbar /><LanguageSwitcher /><Home /></>} />
        <Route path="/contact" element={<><Navbar /><LanguageSwitcher /><Contact /></>} />
        <Route path="/pricing" element={<><Navbar /><LanguageSwitcher /><Pricing /></>} />
        <Route path="/service" element={<><Navbar /><LanguageSwitcher /><Service /></>} />
        <Route path="/about" element={<><Navbar /><LanguageSwitcher /><About /></>} />
        <Route path="/faq" element={<><Navbar /><LanguageSwitcher /><FAQPage /></>} />

        {/* Customer Protected Routes */}
        <Route path="/announcements" element={<ProtectedRoute allowedRoles={['customer']}><Navbar /><LanguageSwitcher /><CustomerAnnouncements /></ProtectedRoute>} />
        <Route path="/bookingSummary" element={<ProtectedRoute allowedRoles={['customer']}><Navbar /><LanguageSwitcher /><BookingSummary /></ProtectedRoute>} />
        <Route path="/socialmedia" element={<ProtectedRoute allowedRoles={['customer']}><Navbar /><LanguageSwitcher /><SocialMediaShare /></ProtectedRoute>} />
        <Route path="/userprofileupdate" element={<ProtectedRoute allowedRoles={['customer']}><Navbar /><LanguageSwitcher /><UserProfileUpdate /></ProtectedRoute>} />
        <Route path="/paymentsuccess/:id" element={<ProtectedRoute allowedRoles={['customer']}><Navbar /><LanguageSwitcher /><PaymentSuccess /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute allowedRoles={['customer']}><Navbar /><LanguageSwitcher /><Checkout /></ProtectedRoute>} />
        <Route path="/paymentpage" element={<ProtectedRoute allowedRoles={['customer']}><Navbar /><LanguageSwitcher /><PaymentPage /></ProtectedRoute>} />
        <Route path="/bookhouse/:id" element={<ProtectedRoute allowedRoles={['customer']}><Navbar /><LanguageSwitcher /><BookingHouse /></ProtectedRoute>} />
        <Route path="/mymessage" element={<ProtectedRoute allowedRoles={['customer']}><Navbar /><LanguageSwitcher /><MyMessege /></ProtectedRoute>} />
        <Route path="/feedbackform" element={<ProtectedRoute allowedRoles={['customer']}><Navbar /><LanguageSwitcher /><FeedbackForm /></ProtectedRoute>} />
        <Route path="/costumer/customerdashboard" element={<ProtectedRoute allowedRoles={['customer']}><CustomerDashboard /></ProtectedRoute>}>
          <Route path="feedbackform" element={<FeedbackForm />} />
          <Route path="realestatechat" element={<RealEstateChat />} />
        </Route>

        {/* Admin Protected Routes */}
        <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminLayout><LanguageSwitcher /><Dashboard /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/manageuser" element={<ProtectedRoute allowedRoles={['admin']}><AdminLayout><LanguageSwitcher /><UserManage /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/manageproperty" element={<ProtectedRoute allowedRoles={['admin']}><AdminLayout><LanguageSwitcher /><PropertyManage /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/managefedback" element={<ProtectedRoute allowedRoles={['admin']}><AdminLayout><LanguageSwitcher /><FedbackManage /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/announcements" element={<ProtectedRoute allowedRoles={['admin']}><AdminLayout><LanguageSwitcher /><AdminAnnouncements /></AdminLayout></ProtectedRoute>} />
        {/* Owner Protected Routes */}
        <Route path="/owner/dashboard" element={<ProtectedRoute allowedRoles={['owner']}><OwnerLayout><LanguageSwitcher /><OwnerDashboard /></OwnerLayout></ProtectedRoute>} />
        <Route path="/owner/addpropertyform" element={<ProtectedRoute allowedRoles={['owner']}><OwnerLayout><LanguageSwitcher /><AddPropertyForm /></OwnerLayout></ProtectedRoute>} />
        <Route path="/owner/editpropertyform/:id" element={<ProtectedRoute allowedRoles={['owner']}><OwnerLayout><LanguageSwitcher /><EditPropertyForm /></OwnerLayout></ProtectedRoute>} />
        <Route path="/owner/ownerpropertymanager" element={<ProtectedRoute allowedRoles={['owner']}><OwnerLayout><LanguageSwitcher /><OwnerPropertyManager /></OwnerLayout></ProtectedRoute>} />
        <Route path="/owner/ownerbookingmanager" element={<ProtectedRoute allowedRoles={['owner']}><OwnerLayout><LanguageSwitcher /><OwnerBookingManager /></OwnerLayout></ProtectedRoute>} />
        <Route path="/owner/searchproperty" element={<ProtectedRoute allowedRoles={['owner']}><OwnerLayout><LanguageSwitcher /><PropertySearch /></OwnerLayout></ProtectedRoute>} />
        <Route path="/owner/feedbacklist" element={<ProtectedRoute allowedRoles={['owner']}><OwnerLayout><LanguageSwitcher /><FeedbackList /></OwnerLayout></ProtectedRoute>} />
      </Routes>

      {/* Only show Footer for non-admin and non-owner routes */}
      {!shouldHideFooter && <Footer />}
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
