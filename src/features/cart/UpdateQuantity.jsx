// Import necessary modules and hooks
import { useDispatch } from "react-redux";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";
import PropTypes from 'prop-types';
import Button from "../../ui/Button";

// UpdateQuantity component to handle increasing and decreasing the quantity of a cart item
function UpdateQuantity({ pizzaId, currentQuantity }) {
  // Initialize the dispatch function from Redux
  const dispatch = useDispatch();

  // Render buttons to decrease and increase item quantity, along with the current quantity display
  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button type="round" onClick={() => dispatch(decreaseItemQuantity(pizzaId))}>
        -
      </Button>
      <span>{currentQuantity}</span>
      <Button type="round" onClick={() => dispatch(increaseItemQuantity(pizzaId))}>
        +
      </Button>
    </div>
  );
}

// Define the prop types for the UpdateQuantity component
UpdateQuantity.propTypes = {
  pizzaId: PropTypes.number.isRequired,
  currentQuantity: PropTypes.number.isRequired,
};

export default UpdateQuantity;
