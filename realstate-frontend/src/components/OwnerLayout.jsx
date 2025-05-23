import OwnerSidebar from "./OwnerSidebar";
import OwnerDashboardHeader from "./OwnerDashboardHeader";

const OwnerLayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <OwnerSidebar />
      <div
        className="flex-1 flex flex-col"
        style={{ marginLeft: "15vw", minWidth: "0" }} // margin-left to offset sidebar, minWidth 0 to prevent overflow
      >
        <OwnerDashboardHeader />
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default OwnerLayout;
