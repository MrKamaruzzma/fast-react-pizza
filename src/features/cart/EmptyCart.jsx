// Import necessary module for navigation
import { Link } from 'react-router-dom';

// EmptyCart component to display when the cart is empty
function EmptyCart() {
  return (
    <div className='px-6 py-4'>
      {/* Link to navigate back to the menu */}
      <Link to="/menu" className="text-lg hover:text-blue-600 hover:underline text-blue-500">
        &larr; Back to menu
      </Link>

      {/* Message to encourage adding items to the cart */}
      <p className='mt-7 font-semibold'>
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
