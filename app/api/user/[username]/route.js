import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const { username } = params;
    const response = await fetch(
      `${process.env.API_URL}/api/users/user/${username}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );
    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { detail: "Bir şeyler ters gitti.Lütfen daha sonra deneyiniz" },
      { status: 500 }
    );
  }
}
