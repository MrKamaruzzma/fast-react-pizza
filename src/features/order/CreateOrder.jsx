// Import necessary hooks and utilities
import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../service/apiRestaurant";
import Button from "../../ui/Button";
import { useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";

// Helper function to validate phone numbers
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

// Main component for creating an order
function CreateOrder() {
  // Local state to manage priority checkbox
  const [withPriority, setWithPriority] = useState(false);

  // Navigation hook to check submission state
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // Get form errors (if any)
  const formErrors = useActionData();

  // Get cart details and user information from Redux store
  const cart = useSelector(getCart);
  const username = useSelector((state) => state.user.username);
  const totalCartPrice = useSelector(getTotalCartPrice);

  // Calculate total price including priority if selected
  const priority = withPriority ? 0.2 * totalCartPrice : 0;
  const totalPrice = totalCartPrice + priority;

  // If cart is empty, show the EmptyCart component
  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let’s go!</h2>

      <Form method="POST">
        {/* Customer Name Input */}
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            defaultValue={username}
            required
          />
        </div>

        {/* Phone Number Input with Validation */}
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
          </div>
          {formErrors?.phone && (
            <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
              {formErrors.phone}
            </p>
          )}
        </div>

        {/* Address Input */}
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              required
            />
          </div>
        </div>

        {/* Priority Checkbox */}
        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            checked={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">
            Want to give your order priority?
          </label>
        </div>

        {/* Hidden Cart Data and Submit Button */}
        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting} type="primary">
            {isSubmitting
              ? "Placing order"
              : `Order now ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// Action function to handle form submission
export async function action({ request }) {
  // Parse form data
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // Construct the order object
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  // Validate the phone number
  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone =
      "Please provide a correct phone number. We might need it to contact you.";
  }

  // Return errors if validation fails
  if (Object.keys(errors).length > 0) return errors;

  // Clear the cart in Redux store
  store.dispatch(clearCart());

  // Create the order using API and redirect to order confirmation
  const newOrder = await createOrder(order);
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
