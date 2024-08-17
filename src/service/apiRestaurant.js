const API_URL = "https://react-fast-pizza-api.onrender.com/api";

// Fetches the menu from the API
export async function getMenu() {
  const res = await fetch(`${API_URL}/menu`);

  // Check if the response is not OK (e.g., status 400 or 500)
  if (!res.ok) throw Error("Failed getting menu");

  const { data } = await res.json();
  return data;
}

// Fetches a specific order by its ID from the API
export async function getOrder(id) {
  const res = await fetch(`${API_URL}/order/${id}`);
  
  // Check if the response is not OK (e.g., status 400 or 500)
  if (!res.ok) throw Error(`Couldn't find order #${id}`);

  const { data } = await res.json();
  return data;
}

// Creates a new order by sending a POST request to the API
export async function createOrder(newOrder) {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the response is not OK (e.g., status 400 or 500)
    if (!res.ok) throw Error();
    const { data } = await res.json();
    return data;
  } catch {
    throw Error("Failed creating your order");
  }
}

// Updates an existing order by sending a PATCH request to the API
export async function updateOrder(id, updateObj) {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateObj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the response is not OK (e.g., status 400 or 500)
    if (!res.ok) throw Error();
    // No need to return data as we're only updating
  } catch (err) {
    throw Error("Failed updating your order");
  }
}
