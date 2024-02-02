import { getAPIURL, setHeaders } from "../utils";

export async function fetchPostCategories() {
  const res = await fetch(`${getAPIURL()}/postCategories`, {
    headers: setHeaders(),
  });

  const data = res.json();

  return data;
}

export async function updatePostCategory(id, body) {
  const response = await fetch(`${getAPIURL()}/postCategories/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: setHeaders({
      "Content-Type": "application/json",
    }),
  });

  const data = await response.json();

  return data;
}

export async function deletePostCategory(id) {
  const response = await fetch(`${getAPIURL()}/postCategories/${id}`, {
    method: "DELETE",
    headers: setHeaders(),
  });

  const data = await response.json();

  return data;
}

export async function createPostCategory(body) {
  const response = await fetch(`${getAPIURL()}/postCategories`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: setHeaders({
      "Content-Type": "application/json",
    }),
  });

  const data = await response.json();

  return data;
}
