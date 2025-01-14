// Import necessary functions from Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

// Define the initial state of the cart
const initialState = {
  cart: [],
  // Example structure for the cart:
  // cart: [
  //   {
  //     pizzaId: 12,
  //     name: 'Mediterranean',
  //     quantity: 2,
  //     unitPrice: 16,
  //     totalPrice: 32,
  //   },
  // ],
};

// Create the cart slice using createSlice from Redux Toolkit
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Action to add an item to the cart
    addItem(state, action) {
      // payload = newItem
      state.cart.push(action.payload);
    },
    
    // Action to delete an item from the cart
    deleteItem(state, action) {
      state.cart = state.cart.filter(item => item.pizzaId !== action.payload);
    },
    
    // Action to increase the quantity of an item in the cart
    increaseItemQuantity(state, action) {
      const item = state.cart.find(item => item.pizzaId === action.payload);
      if (item) {
        item.quantity++;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    
    // Action to decrease the quantity of an item in the cart
    decreaseItemQuantity(state, action) {
      const item = state.cart.find(item => item.pizzaId === action.payload);
      if (item && item.quantity > 1) {
        item.quantity--;
        item.totalPrice = item.quantity * item.unitPrice;
      } else if (item && item.quantity === 1) {
        state.cart = state.cart.filter(item => item.pizzaId !== action.payload);
      }
    },
    
    // Action to clear the entire cart
    clearCart(state) {
      state.cart = [];
    },
  },
});

// Export the actions generated by the slice
export const { addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, clearCart } = cartSlice.actions;

// Export the reducer to be used in the store
export default cartSlice.reducer;

// Selectors to get data from the state
export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

export const getCart = (state) => state.cart.cart;
