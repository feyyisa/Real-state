import OwnerSidebar from './OwnerSidebar';
import OwnerDashboardHeader from './OwnerDashboardHeader';

const OwnerLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <OwnerSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <OwnerDashboardHeader />
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default OwnerLayout;