import { getAPIURL, setHeaders } from "../utils";

export async function fetchProjectCategories() {
  const res = await fetch(`${getAPIURL()}/projectCategories`, {
    headers: setHeaders(),
  });

  const data = res.json();

  return data;
}

export async function updateProjectCategory(id, body) {
  const response = await fetch(`${getAPIURL()}/projectCategories/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: setHeaders({
      "Content-Type": "application/json",
    }),
  });

  const data = await response.json();

  return data;
}

export async function deleteProjectCategory(id) {
  const response = await fetch(`${getAPIURL()}/projectCategories/${id}`, {
    method: "DELETE",
    headers: setHeaders(),
  });

  const data = await response.json();

  return data;
}

export async function createProjectCategory(body) {
  const response = await fetch(`${getAPIURL()}/projectCategories`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: setHeaders({
      "Content-Type": "application/json",
    }),
  });

  const data = await response.json();

  return data;
}
