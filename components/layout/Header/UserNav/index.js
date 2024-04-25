"use client";
import React from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logout, login } from "@/store/auth/authActions";
import { useRouter } from "next/navigation";
import Avatar from "@/components/layout/Avatar";

const UserNav = () => {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    dispatch(logout());
  };
  const loginHandler = async (e) => {
    e.preventDefault();
    dispatch(login("admin@admin.com", "123123"));
  };
  if (isLoading) return <></>;
  return (
    <ul className="navbar-nav  ">
      {isAuthenticated && user ? (
        <li className="nav-item dropdown">
          <a
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <Avatar user={user} size={36} />
          </a>
          <ul className="dropdown-menu  dropdown-menu-end">
            <li>
              <Link className="dropdown-item" href={"/@" + user.username}>
                Profil
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" href={"/settings/account"}>
                Hesap Ayarları
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="#" onClick={logoutHandler}>
                Çıkış yap
              </a>
            </li>
          </ul>
        </li>
      ) : (
        <>
          <a onClick={loginHandler} className="btn btn-info me-2">
            Quick Login
          </a>
          <Link href="/login" className="btn btn-primary">
            Giriş
          </Link>
        </>
      )}
    </ul>
  );
};

export default UserNav;
