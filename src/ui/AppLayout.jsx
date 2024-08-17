// Import necessary modules and components
import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import Loader from "./Loader";
import "../../src/index.css"; // Importing global styles

function AppLayout() {
  // Use the useNavigation hook to get navigation state
  const navigation = useNavigation();
  // Determine if the navigation state is 'loading' to show a loader
  const isLoading = navigation.state === "loading";

  return (
    // Define a grid layout with three rows: header, main content, and cart overview
    <div className="grid grid-rows-[auto_1fr_auto] h-screen">
      {/* Conditionally render the Loader component if navigation is loading */}
      {isLoading && <Loader />}
      
      {/* Render the Header component */}
      <Header />

      {/* Main content area with scrollable overflow */}
      <div className="overflow-scroll">
        <main className="mx-auto max-w-3xl">
          {/* Render nested routes using Outlet */}
          <Outlet />
        </main>
      </div>

      {/* Render the CartOverview component at the bottom */}
      <CartOverview />
    </div>
  );
}

export default AppLayout;
