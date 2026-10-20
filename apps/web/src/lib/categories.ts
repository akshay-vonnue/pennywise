export async function getCategories() {
  const result = await fetch(`${import.meta.env.VITE_API_BASE_URL}/expense/category`, {
    method: "GET",
  });

  let categories = await result.json();

  localStorage.setItem("categories", JSON.stringify(categories));
}
