// Import necessary modules and hooks
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTotalCartQuantity, getTotalCartPrice } from "./cartSlice";
// import Button from "../../ui/Button";

function CartOverview() {
  // Retrieve the total quantity of items and the total price from the Redux store
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartTotalPrice = useSelector(getTotalCartPrice);

  // If there are no items in the cart, don't render the component
  if (!totalCartQuantity) return null;

  // Render the cart overview with the total quantity and total price
  return (
    <div className="flex items-center justify-between bg-stone-800 text-white uppercase px-4 py-4 sm:px-6 text-sm md:text-base">
      {/* Display the total quantity of pizzas and the total price */}
      <p className="text-stone-300 font-semibold space-x-4 sm:space-x-6">
        <span>{totalCartQuantity} pizzas</span>
        <span>${totalCartTotalPrice}</span>
      </p>

      {/* Link to open the cart */}
      {/* <Button to="/order/new" type="primary">Order pizzas</Button> */}
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
