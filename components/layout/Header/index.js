import React from "react";
import UserNav from "@/components/layout/Header/UserNav";
import Image from "next/image";
import Link from "next/link";
import VerifyBar from "@/components/layout/Header/VerifyBar";
const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-md navbar-light border-bottom mb-4 flex-column">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" href="/">
            <Image src="/next_black.svg" alt="Logo" height={20} width={80} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">
                  Disabled
                </a>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <UserNav />
            </form>
          </div>
        </div>
      </nav>
      <VerifyBar />
    </>
  );
};

export default Header;
