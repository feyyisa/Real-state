import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar is fixed with width 15vw */}
      <Sidebar />
      <div
        className="flex-1 flex flex-col"
        style={{ marginLeft: "15vw", minWidth: 0 }} // Push content right by sidebar width, prevent overflow
      >
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
