import { getAPIURL } from "../utils";

export async function login(body) {
  const res = await fetch(`${getAPIURL()}/auth/login`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}

export async function refreshToken() {
  const res = await fetch(`${getAPIURL()}/auth/refresh`, {
    method: "POST",
  });

  const data = await res.json();
  return data;
}
