//import React from "react";
import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";
// import { getTotalCartQuantity } from "../features/cart/cartSlice";
// import { useSelector } from "react-redux";
 
function Header() {

  // const totalCartQuantity = useSelector(getTotalCartQuantity)
  return (
    <header className="flex justify-between bg-yellow-500 uppercase px-4 py-3 border-b border-stone-400 sm:px-6 font-pizza">
      <Link to="/" className="tracking-widest">Fast React Pizza Co.</Link>
      {/* <Link to="/cart">  <span> {totalCartQuantity}</span> <i className="fa-solid fa-cart-shopping"></i></Link> */}
      <SearchOrder />
      <Username/>
    </header>
  );
}

export default Header;
