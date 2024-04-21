import React from "react";
import SettingsNav from "./components/SettingsNav";
const SettingsLayout = ({ children }) => {
  return (
    <div className="flex flex-column mx-auto" style={{ maxWidth: 800 }}>
      <div className="py-2">
        <h1 className="h4">Ayarlar</h1>
        <p></p>
      </div>
      <SettingsNav />
      <div style={{ maxWidth: 500 }}>{children}</div>
    </div>
  );
};

export default SettingsLayout;
