import { formatCurrency } from "../../utils/helpers";
import PropTypes from 'prop-types';

function OrderItem({ item, ingredient, isIngredientLoading }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-3">
      <div className="flex items-center justify-between px-4 text-sm py-2">
        <p className="font-bold">
          <span>{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-sm capitalize italic text-slate-500">
        {isIngredientLoading ? "Loading..." : ingredient.join(", ")}
      </p>
    </li>
  );
}

OrderItem.propTypes = {
  item: PropTypes.shape({
    quantity: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    totalPrice: PropTypes.number.isRequired,
  }).isRequired,
  ingredient: PropTypes.arrayOf(PropTypes.string).isRequired,
  isIngredientLoading: PropTypes.bool.isRequired,
};

export default OrderItem;
