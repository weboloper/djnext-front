import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAccessTokenServer } from "@/lib/server";

export async function GET(req, res) {
  try {
    const access = await getAccessTokenServer();
    if (!access)
      return NextResponse.json(
        { detail: "Kullanıcı girişi bulunamadı" },
        { status: 401 }
      );
    const body = JSON.stringify({
      token: access,
    });
    const response = await fetch(`${process.env.API_URL}/api/token/verify/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    });
    if (!response.ok) {
      throw new Error("Not verified");
    }
    return NextResponse.json({}, { status: res.status });
  } catch (error) {
    return NextResponse.json(
      { detail: "Bir şeyler ters gitti.Lütfen daha sonra deneyiniz" },
      { status: 500 }
    );
  }
}
