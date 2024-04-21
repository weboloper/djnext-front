export const get_user_by_username = async (username) => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/users/user/${username}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        next: { revalidate: 0 },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    return { detail: "Bir şeyler ters gitti.Lütfen daha sonra deneyiniz" };
    throw new Error("Bir şeyler ters gitti.Lütfen daha sonra deneyiniz");
  }

  // if (!response.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error("Failed to fetch data");
  // }

  // const data = await response.json();
  // return data;
};
