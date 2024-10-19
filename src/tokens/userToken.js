export function getToken() {
  const token = localStorage.getItem("userId");
  const data = JSON.parse(token);

  if (!data) {
    return null;
  }
  return data;
}

export function getUserToken() {
  return getToken();
}
