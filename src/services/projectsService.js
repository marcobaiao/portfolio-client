import { getAPIURL, setHeaders } from "../utils";

export async function fetchProjects(
  page = 1,
  limit = 6,
  categories = null,
  name = null
) {
  let searchParams = { page: page, limit: limit };

  if (categories) searchParams.categories = JSON.stringify(categories);
  if (name) searchParams.name = name;

  const res = await fetch(
    `${getAPIURL()}/projects?` + new URLSearchParams(searchParams)
  );

  const data = await res.json();

  return data;
}

export async function fetchProject(id) {
  const res = await fetch(`${getAPIURL()}/projects/${id}`);

  const data = await res.json();

  return data;
}

export async function deleteProject(id) {
  const res = await fetch(`${getAPIURL()}/projects/${id}`, {
    method: "DELETE",
    headers: setHeaders(),
  });

  const data = await res.json();

  return data;
}

export async function createProject(body) {
  const response = await fetch(`${getAPIURL()}/projects`, {
    method: "POST",
    body: body,
    headers: setHeaders(),
  });

  const data = await response.json();

  return data;
}

export async function updateProject(id, body, isFormDataBody = false) {
  const headers = !isFormDataBody
    ? {
        "Content-Type": "application/json",
      }
    : {};

  const res = await fetch(`${getAPIURL()}/projects/${id}`, {
    method: "PATCH",
    body: isFormDataBody ? body : JSON.stringify(body),
    headers: setHeaders(headers),
  });
  const data = await res.json();
  return data;
}
