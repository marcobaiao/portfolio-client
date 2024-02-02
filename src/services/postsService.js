import { getAPIURL, setHeaders } from "../utils";

export async function fetchPosts(
  page = 1,
  limit = 6,
  categories = null,
  title = null
) {
  let searchParams = { page: page, limit: limit };

  if (categories) searchParams.categories = JSON.stringify(categories);
  if (title) searchParams.title = title;

  const res = await fetch(
    `${getAPIURL()}/posts?` + new URLSearchParams(searchParams)
  );

  const data = await res.json();
  return data;
}

export async function fetchPost(id) {
  const res = await fetch(`${getAPIURL()}/posts/${id}`);
  const data = await res.json();
  return data;
}

export async function createPost(body) {
  const res = await fetch(`${getAPIURL()}/posts`, {
    method: "POST",
    body: body,
    headers: setHeaders(),
  });
  const data = await res.json();
  return data;
}

export async function deletePost(id) {
  const res = await fetch(`${getAPIURL()}/posts/${id}`, {
    method: "DELETE",
    headers: setHeaders(),
  });
  const data = await res.json();
  return data;
}

export async function updatePost(id, body, isFormDataBody = false) {
  const headers = !isFormDataBody
    ? {
        "Content-Type": "application/json",
      }
    : {};

  const res = await fetch(`${getAPIURL()}/posts/${id}`, {
    method: "PATCH",
    body: isFormDataBody ? body : JSON.stringify(body),
    headers: setHeaders(headers),
  });
  const data = await res.json();
  return data;
}
