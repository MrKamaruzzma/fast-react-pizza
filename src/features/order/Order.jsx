// Import necessary hooks and utilities
import { getOrder } from "../../service/apiRestaurant";
import { useFetcher, useLoaderData } from "react-router-dom";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";
import { useEffect } from "react";

function Order() {
  // Everyone can search for all orders, so for privacy reasons we're excluding names or addresses. These are only for the restaurant staff.

  // Load order data using the loader function
  const order = useLoaderData();

  // Fetcher hook to load additional data if needed (e.g., menu items)
  const fetcher = useFetcher();

  // Effect hook to load menu data if not already loaded
  useEffect(() => {
    if (!fetcher.data && fetcher.state === 'idle') {
      fetcher.load('/menu');
    }
  }, [fetcher]);

  // Destructure order details from the loaded order data
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  // Calculate minutes left for delivery
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="px-4 py-6 space-y-8">
      {/* Order header displaying order ID, status, and priority */}
      <div className="flex justify-between items-center gap-2 flex-wrap">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>
        <div className="space-x-2">
          {priority && (
            <span className="font-semibold uppercase tracking-wide bg-red-500 rounded-full text-sm px-3 py-1 text-red-50">
              Priority
            </span>
          )}
          <span className="font-semibold uppercase tracking-wide bg-green-500 rounded-full text-sm px-3 py-1 text-red-50">
            {status} order
          </span>
        </div>
      </div>

      {/* Estimated delivery time and remaining minutes */}
      <div className="flex justify-between items-center gap-2 flex-wrap bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${deliveryIn} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      {/* List of ordered items */}
      <ul className="divide-stone-200 divide-y border-b border-t">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            isIngredientLoading={fetcher?.state === 'loading'}
            ingredient={fetcher?.data?.find((el) => el.id === item.pizzaId)?.ingredient ?? []}
          />
        ))}
      </ul>

      {/* Pricing details */}
      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}

// Loader function to fetch order data based on the order ID
export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
