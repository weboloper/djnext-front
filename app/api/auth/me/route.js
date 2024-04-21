import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAccessTokenServer } from "@/lib/server";

export async function GET(request, res) {
  try {
    const access = await getAccessTokenServer();
    if (!access)
      return NextResponse.json(
        { detail: "Kullanıcı girişi bulunamadı" },
        { status: 401 }
      );

    const response = await fetch(`${process.env.API_URL}/api/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    });

    const data = await response.json();
    if (response.status != 200) {
      cookies().set({
        name: "access",
        value: "",
        httpOnly: true,
        sameSite: "strict",
        path: "/",
        expires: new Date(0),
      });

      cookies().set({
        name: "refresh",
        value: "",
        httpOnly: true,
        sameSite: "strict",
        path: "/",
        expires: new Date(0),
      });
    }
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ detail: error.message }, { status: 500 });
  }
}

export async function POST(request, res) {
  try {
    const access = await getAccessTokenServer();
    if (!access)
      return NextResponse.json(
        { detail: "Kullanıcı girişi bulunamadı" },
        { status: 401 }
      );
    const body = await request.json();
    const response = await fetch(`${process.env.API_URL}/api/users/me/`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
      body: JSON.stringify(body),
      next: { revalidate: 0 },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { detail: "Bir şeyler ters gitti.Lütfen daha sonra deneyiniz" },
      { status: 500 }
    );
  }
}
