import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const location = useLocation();
  const renderNavbar = location.pathname !== "/auth";

  return (
    <div>
      {renderNavbar && <Navbar />}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
