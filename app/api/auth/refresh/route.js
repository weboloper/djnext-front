import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getRefreshTokenServer } from "@/lib/server";

export async function GET(request, res) {
  try {
    const refresh = await getRefreshTokenServer();
    if (!refresh)
      return NextResponse.json(
        { detail: "Kullanıcı girişi bulunamadı" },
        { status: 401 }
      );
    const body = JSON.stringify({
      refresh: refresh,
    });
    const response = await fetch(`${process.env.API_URL}/api/token/refresh/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    });

    const data = await response.json();

    if (response.status === 200) {
      cookies().set({
        name: "access",
        value: data.access,
        httpOnly: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 30,
      });
      cookies().set({
        name: "refresh",
        value: data.refresh,
        httpOnly: true,
        sameSite: "strict",
        path: "/",
        axAge: 60 * 60 * 24,
      });
    } else {
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

    return NextResponse.json({ ...data }, { status: response.status });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ detail: error.message }, { status: 500 });
  }
}
