"use client";
import React from "react";
// import { getUserFromServer } from "@/lib/server";
import ProfileForm from "./components/ProfileForm";
import { useDispatch, useSelector } from "react-redux";

const SettingsPage = () => {
  // const user = await getUserFromServer();
  // if (!user) return <></>;
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );
  if (!user) return <></>;

  return (
    <div>
      <ProfileForm user={user} />
    </div>
  );
};

export default SettingsPage;
