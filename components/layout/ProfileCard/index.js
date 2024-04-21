"use client";
import React from "react";
import Avatar from "@/components/layout/Avatar";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
const ProfileCard = ({ user }) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  return (
    <div className="card w-100">
      <div className="card-header bg-light py-5"></div>
      <div className="card-body">
        <div className="d-flex mb-2 ">
          {currentUser?.id === user.id ? (
            <Avatar user={currentUser} size={60} />
          ) : (
            <Avatar user={user} size={60} />
          )}
        </div>

        <h5 className="card-title">@{user.username}</h5>
        <p className="card-text">{user.profile.bio}</p>
        {currentUser?.id === user.id && <Link href="/settings">Ayarlar</Link>}
      </div>
    </div>
  );
};

export default ProfileCard;
