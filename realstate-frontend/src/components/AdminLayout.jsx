import AdminSidebar from './Sidebar';
import AdminDashboardHeader from './DashboardHeader';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminDashboardHeader />
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;