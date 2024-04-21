import React from "react";
import { getUserFromServer } from "@/lib/server";
import Link from "next/link";
const index = async () => {
  const user = await getUserFromServer();
  return (
    <div className="text-white">
      {user?.username ? (
        <h1>Welcome, {user.username}!</h1>
      ) : (
        <Link href="/login" className="btn btn-primary">
          Giriş
        </Link>
      )}
    </div>
  );
};

export default index;
