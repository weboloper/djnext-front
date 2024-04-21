"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { z } from "zod";
import { update_me, set_error } from "@/store/auth/authActions";
import { PasswordContraint } from "@/lib/validators";
import toast from "react-hot-toast";

const schema = z
  .object({
    password: PasswordContraint,
    new_password: PasswordContraint,
    re_password: PasswordContraint,
  })
  .superRefine(({ new_password, re_password }, ctx) => {
    if (re_password !== new_password) {
      ctx.addIssue({
        code: "custom",
        path: ["re_password"],
        message: "Şifreler uyuşmuyor",
      });
    }
  });

const ChangePasswordModal = () => {
  const closeButtonRef = React.useRef(null);
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);
  const [password, setPassword] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [re_password, setRePassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = { password, new_password, re_password };
      schema.parse(formData); //
      const data = await dispatch(update_me(formData));
      if (data?.message) {
        toast.success(data?.message);
        setPassword("");
        setNewPassword("");
        setRePassword("");
        closeButtonRef.current.click();
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        dispatch(set_error(error));
      } else {
        console.error("Uncaught Error:", error);
      }
    }

    if (error?.detail) toast.error(error.detail);
  };

  return (
    <div className="modal-content">
      <form onSubmit={handleSubmit}>
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="myModal">
            Şifre değiştirme
          </h1>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Mevcut Şifreniz
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {error?.password && (
              <span className="invalid-feedback d-block mb-2">
                {error.password}
              </span>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="new_password" className="form-label">
              Yeni Şifreniz
            </label>
            <input
              type="password"
              className="form-control"
              id="new_password"
              name="new_password"
              onChange={(e) => setNewPassword(e.target.value)}
              value={new_password}
            />
            {error?.new_password && (
              <span className="invalid-feedback d-block mb-2">
                {error.new_password}
              </span>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="re_password" className="form-label">
              Yeni Şifreniz (tekrar)
            </label>
            <input
              type="password"
              className="form-control"
              id="re_password"
              name="re_password"
              onChange={(e) => setRePassword(e.target.value)}
              value={re_password}
            />
            {error?.re_password && (
              <span className="invalid-feedback d-block mb-2">
                {error.re_password}
              </span>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
            ref={closeButtonRef}
          >
            Vazgeç
          </button>
          <button type="submit" className="btn btn-primary">
            Değişiklikleri Kaydet
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordModal;
