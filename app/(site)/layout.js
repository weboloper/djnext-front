import React from "react";
import Header from "@/components/layout/Header";
const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="container">{children}</div>
    </>
  );
};

export default MainLayout;
