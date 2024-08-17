// Import necessary modules and hooks
import { useDispatch } from "react-redux";
import { deleteItem } from "./cartSlice";
import Button from "../../ui/Button";
import PropTypes from 'prop-types';

// DeleteItem component to handle the deletion of a cart item
function DeleteItem({ pizzaId }) {
  // Initialize the dispatch function from Redux
  const dispatch = useDispatch();
  
  // Render the delete button with an onClick handler to dispatch the deleteItem action
  return (
    <Button type="small" onClick={() => dispatch(deleteItem(pizzaId))}>
      Delete
    </Button>
  );
}

// Define the prop types for the DeleteItem component
DeleteItem.propTypes = {
  pizzaId: PropTypes.number.isRequired,
};

export default DeleteItem;
