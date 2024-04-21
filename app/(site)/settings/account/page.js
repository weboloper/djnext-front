"use client";
import React, { useState } from "react";
import ModalContainer from "@/components/layout/ModalContainer";
import ChangeUsernameModal from "./components/ChangeUsernameModal";
import ChangeEmailModal from "./components/ChangeEmailModal";
import ChangePasswordModal from "./components/ChangePasswordModal";
import { useSelector, useDispatch } from "react-redux";

const SettingsUsername = () => {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center w-100 border-bottom mb-4">
        <div>
          <h6>Kullanıcı Adı</h6>
          <p>{user?.username}</p>
        </div>
        <div>
          <button
            className="btn btn-sm btn-outline-primary round"
            data-bs-toggle="modal"
            data-bs-target="#ChangeUsernameModal"
          >
            Değiştir
          </button>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center w-100 border-bottom mb-4">
        <div>
          <h6>E-posta</h6>
          <p>{user?.email}</p>
        </div>
        <div>
          <button
            className="btn btn-sm btn-outline-primary round"
            data-bs-toggle="modal"
            data-bs-target="#ChangeEmailModal"
          >
            Değiştir
          </button>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center w-100 border-bottom  mb-4">
        <div>
          <h6>Şifre</h6>
          <p>Password must be at least 8 characters long</p>
        </div>
        <div>
          <button
            className="btn btn-sm btn-outline-primary round"
            data-bs-toggle="modal"
            data-bs-target="#ChangePasswordModal"
          >
            Değiştir
          </button>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center w-100 border-bottom ">
        <div>
          <h6>Hesabı kapat</h6>
          <p>Password must be at least 8 characters long</p>
        </div>
        <div>
          <button className="btn btn-sm btn-outline-danger round">
            Hesabınızı kapayın
          </button>
        </div>
      </div>
      <ModalContainer id="ChangeUsernameModal">
        <ChangeUsernameModal />
      </ModalContainer>
      <ModalContainer id="ChangeEmailModal">
        <ChangeEmailModal />
      </ModalContainer>
      <ModalContainer id="ChangePasswordModal">
        <ChangePasswordModal />
      </ModalContainer>
    </div>
  );
};

export default SettingsUsername;
