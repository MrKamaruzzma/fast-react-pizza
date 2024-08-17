// Import necessary utilities, components, and hooks
import { formatCurrency } from '../../utils/helpers';
import PropTypes from 'prop-types';
import DeleteItem from "./DeleteItem";
import UpdateQuantity from './UpdateQuantity';
import { useSelector } from 'react-redux';
import { getCurrentQuantityById } from './cartSlice';

// CartItem component to display each individual item in the cart
function CartItem({ item }) {
  // Destructure the item object to extract necessary properties
  const { pizzaId, name, quantity, totalPrice } = item;

  // Get the current quantity of the specific pizza from the Redux store
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  // Render the cart item
  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      {/* Display the quantity and name of the pizza */}
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      
      {/* Display the total price, update quantity component, and delete item button */}
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateQuantity pizzaId={pizzaId} currentQuantity={currentQuantity} />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

// Define the prop types for the CartItem component
CartItem.propTypes = {
  item: PropTypes.node.isRequired,
};

export default CartItem;
