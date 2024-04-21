"use client";
import { useEffect } from "react";
import { check_auth_status } from "./auth/authActions";
import { useDispatch } from "react-redux";

export default function ThemeProvider({ children, ...props }) {
  const dispatch = useDispatch();
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
    // require("bootstrap-icons/font/bootstrap-icons.min.css");

    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(check_auth_status());
    }
  }, [dispatch]);

  return <>{children}</>;
}
