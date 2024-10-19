export function getCartToken() {
  const token = localStorage.getItem("cartId");
  const data = JSON.parse(token);

  if (!data) {
    return null;
  }
  return data;
}
