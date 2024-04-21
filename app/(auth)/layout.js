"use client";
import React from "react";
import { useSelector } from "react-redux";
import { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.scss";

const AuthLayout = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const router = useRouter();

  useLayoutEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [router, isAuthenticated]);

  return (
    <div
      className={
        styles.container +
        " d-flex justify-content-center align-items-center mx-auto"
      }
    >
      <div
        className={
          styles.wrapper + " d-flex rounded flex-column flex-md-row border "
        }
      >
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
