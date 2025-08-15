import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

// Main layout component for authenticated dashboard pages
const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);
  return (
    <div className="">
      {/* Top navigation bar */}
      <Navbar activeMenu={activeMenu} />

      {/* Main content area - only render when user is authenticated */}
      {user && (
        <div className="flex">
          {/* Side navigation menu - hidden on small screens */}
          <div className="max-[1080px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>
          {/* Main content container with responsive margins */}
          <div className="grow mx-5">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
