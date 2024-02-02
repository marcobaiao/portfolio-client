import { getAPIURL, setHeaders } from "../utils";

export async function fetchInformation() {
  const res = await fetch(`${getAPIURL()}/information`);
  const data = await res.json();
  return data;
}

export async function updateInformation(id, body) {
  const res = await fetch(`${getAPIURL()}/information/${id}`, {
    method: "PATCH",
    body: body,
    headers: setHeaders(),
  });

  const data = await res.json();
  return data;
}
