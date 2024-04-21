export async function getAccessTokenServer() {
  const cookies = require("next/headers").cookies;
  const cookieList = cookies();
  const { value } = cookieList.get("access") ?? { value: null };
  return value;
}

export async function getRefreshTokenServer() {
  const cookies = require("next/headers").cookies;
  const cookieList = cookies();
  const { value } = cookieList.get("refresh") ?? { value: null };
  return value;
}

export async function verifyUserFromServer() {
  const value = await getAccessTokenServer();
  const body = JSON.stringify({
    token: value,
  });

  const apiRes = await fetch(
    `${process.env.API_URL}/api/token/verify`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    },
    { cache: "no-store" }
  );
  const data = await apiRes.json();
  return data;
}

export async function getUserFromServer() {
  try {
    const value = await getAccessTokenServer();

    const apiRes = await fetch(
      `${process.env.API_URL}/api/users/me`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${value}`,
        },
      },
      { cache: "no-store" }
    );
    const data = await apiRes.json();

    if (apiRes.status === 200) {
      return data;
    }

    return null;
  } catch (err) {
    return null;
  }
}
