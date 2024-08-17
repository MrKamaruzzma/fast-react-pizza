import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  // State to store the query entered by the user
  const [query, setQuery] = useState();
  // Hook to programmatically navigate to different routes
  const navigate = useNavigate();

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    // If the query is empty, do nothing
    if (!query) return;
    // Navigate to the order details page with the query as the order ID
    navigate(`/order/${query}`);
    // Clear the query input after submission
    setQuery("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search order"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="rounded-full px-4 py-2 bg-yellow-100 text-sm placeholder:text-stone-500 w-28 sm:w-64 transition-all duration-300 sm:focus:w-72 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50"
      />
    </form>
  );
}

export default SearchOrder;
