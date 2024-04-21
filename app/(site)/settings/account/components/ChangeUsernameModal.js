"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { z } from "zod";
import { update_me, set_error } from "@/store/auth/authActions";
import toast from "react-hot-toast";
import { UsernameContraint, PasswordContraint } from "@/lib/validators";

const schema = z.object({
  username: UsernameContraint,
  password: PasswordContraint,
});

const ChangeUsernameModal = () => {
  const closeButtonRef = React.useRef(null);
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = { username, password };
      schema.parse(formData); //
      const data = await dispatch(update_me(formData));
      if (data?.message) {
        toast.success(data?.message);
        setPassword("");
        setUsername("");
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
            Kullanıcı adı değiştirin
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
            <label htmlFor="password_username" className="form-label">
              Mevcut Şifreniz
            </label>
            <input
              type="password"
              className="form-control"
              id="password_username"
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
            <label htmlFor="username" className="form-label">
              Yeni kullanıcı adınız
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            {error?.username && (
              <span className="invalid-feedback d-block mb-2">
                {error.username}
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

export default ChangeUsernameModal;
