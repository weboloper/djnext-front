import React from "react";
import ProfileCard from "@/components/layout/ProfileCard";
import { get_user_by_username } from "@/lib/userService";
import { notFound } from "next/navigation";

const UserPage = async ({ params }) => {
  const user = await get_user_by_username(params.slug);

  if (user.detail) {
    return notFound();
  }

  return (
    <main className="row">
      <div className="col-md-3">
        <ProfileCard user={user} />
      </div>
      <div className="col-md-9">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">
              Profil
            </a>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default UserPage;
