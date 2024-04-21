"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SettingsNav = () => {
  const pathname = usePathname();
  return (
    <>
      <ul className="nav nav-underline mb-4 border-bottom">
        <li className="nav-item">
          <Link
            className={pathname == "/settings" ? "nav-link active" : "nav-link"}
            aria-current="page"
            href="/settings"
          >
            Profil
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={
              pathname == "/settings/account" ? "nav-link active" : "nav-link"
            }
            aria-current="page"
            href="/settings/account"
          >
            Hesap Ayarları
          </Link>
        </li>
      </ul>
    </>
  );
};

export default SettingsNav;
