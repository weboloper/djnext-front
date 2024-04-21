"use client";
import React from "react";
import { login, logout } from "@/store/auth/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.auth);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const check_login = await dispatch(login("admin@admin.com", "123123"));
    if (check_login === true) {
      router.refresh();
    }
  };
  const logoutHandler = async () => {
    const check_logout = await dispatch(logout());
    router.refresh();
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={handleSubmit}>
        Login
      </button>
      {user?.username && (
        <button className="btn btn-primary" onClick={logoutHandler}>
          logout {user?.username}
        </button>
      )}
      {error && <h1>finally error</h1>}
    </div>
  );
};

export default Home;
