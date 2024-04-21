import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req, res) {
  try {
    const body = await req.json();
    const response = await fetch(`${process.env.API_URL}/api/token/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
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
        maxAge: 60 * 60 * 24,
      });
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { detail: "Bir şeyler ters gitti.Lütfen daha sonra deneyiniz" },
      { status: 500 }
    );
  }
}
