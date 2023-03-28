export default async function handleResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw await res.json();
  }
}
