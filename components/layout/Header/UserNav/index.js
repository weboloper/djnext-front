"use client";
import React from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/auth/authActions";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Avatar from "@/components/layout/Avatar";

const UserNav = () => {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const logoutHandler = async () => {
    const check_logout = await dispatch(logout());
    router.refresh();
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
        <Link href="/login" className="btn btn-primary">
          Giriş
        </Link>
      )}
    </ul>
  );
};

export default UserNav;
