"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.scss";
import { verify_email_request } from "@/store/auth/authActions";
import toast from "react-hot-toast";

const VerifyBar = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [close, setClose] = useState(false);
  const dispatch = useDispatch();

  const handleClose = (e) => {
    setClose(true);
  };
  const handleRequest = async (e) => {
    e.preventDefault();
    setClose(true);
    try {
      const data = await dispatch(verify_email_request(user?.email));
      console.log(data);
      if (data?.message)
        toast.success(
          "Eposta gönderildi bağlantısı eposta adresinize gönderildi."
        );
    } catch (error) {
      console.error("Uncaught Error:", error);
    }
  };

  if (!isAuthenticated) return <></>;
  if (close) return <></>;
  if (user && !user.is_verified)
    return (
      <div className={styles.verifybar + " bg-warning w-100"}>
        <div className="container  d-flex justify-content-between ">
          <span className="me-md-5 me-2">
            Lütfen <b>{user?.email}</b> adresine gönderilen e-postadaki
            bağlantıya tıklayın.
          </span>
          <a href="#" className="text-black me-2" onClick={handleRequest}>
            Yeniden gönder
          </a>
          <button
            type="button"
            className="btn-close ms-auto"
            aria-label="Close"
            onClick={handleClose}
          ></button>
        </div>
      </div>
    );
  return <></>;
};

export default VerifyBar;
