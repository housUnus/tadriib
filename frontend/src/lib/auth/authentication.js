import { jwtDecode } from "jwt-decode";


export async function get_me(access_token) {
  const response = await fetch(
    `${process.env.AUTH_SERVER_BASE_URL}/dj-auth/user`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  const user = await response.json();
  return user;
}

export async function refreshAccessToken(token) {
  const response = await fetch(
    `${process.env.AUTH_SERVER_BASE_URL}/dj-auth/token/refresh/`,
    {
      method: "POST",
      body: JSON.stringify({
        "refresh": token.refresh_token
      }),
      headers: {
        "Content-Type": "application/json",
      },

    }
  );

  const new_token = await response.json();

  if (!response.ok) {
    throw new_token;
  }

  return {
    ...token,
    access_token: new_token.access,
    refresh_token: token.refresh_token,
    expiry: {
      access:jwtDecode(new_token.access).exp * 1000,
      refresh:jwtDecode(token.refresh_token).exp * 1000,
    }
  };
}