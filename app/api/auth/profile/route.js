import { NextResponse } from "next/server";
import { getAccessTokenServer } from "@/lib/server";

export async function POST(request, res) {
  const access = await getAccessTokenServer();
  if (!access)
    return NextResponse.json(
      { detail: "Kullanıcı girişi bulunamadı" },
      { status: 401 }
    );

  const formData = await request.formData();

  const response = await fetch(
    `${process.env.API_URL}/api/users/me/profile_update/`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${access}` },
      body: formData,
    }
  );

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
