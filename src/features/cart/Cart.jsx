// Import necessary components and hooks
import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { getCart, clearCart } from "./cartSlice";  // Import actions and selectors from cartSlice
import EmptyCart from "./EmptyCart";

// Main Cart component
function Cart() {
  // Retrieve the username from the Redux store
  const username = useSelector((state) => state.user.username);
  
  // Retrieve the cart data using a selector
  const totalcart = useSelector(getCart);
  const cart = totalcart;

  // Initialize the dispatch function from Redux
  const dispatch = useDispatch();

  // Handler function to clear the cart
  function handleClearCart() {
    dispatch(clearCart(cart));
  }

  // If the cart is empty, render the EmptyCart component
  if (!cart.length) return <EmptyCart />;

  // Render the Cart component UI
  return (
    <div>
      {/* Link to go back to the menu */}
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      {/* Display the username */}
      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

      {/* Display the list of cart items */}
      <ul className="mt-3 divide-y divide-stone-300 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      {/* Buttons for ordering pizzas or clearing the cart */}
      <div className="mt-6 space-x-2">
        <Button to="/order/new" type="primary">Order pizzas</Button>
        <Button type="secondary" onClick={handleClearCart}>Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
