import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";
import axios from "axios";

const url = "https://course-api.com/react-useReducer-cart-project";
const initialState = {
  cartItems,
  amount: 1,
  total: 0,
  isLoading: true,
};
export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (name, ThunkApi) => {
    console.log(name);
    console.log(ThunkApi.getState().cart.cartItems);
    try {
      const res = await axios(url);
      return res.data;
    } catch (error) {}
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemID = action.payload;
      state.cartItems = state.cartItems.filter((s) => s.id !== itemID);
    },
    increase: (state, action) => {
      const CartItem = state.cartItems.find((s) => s.id === action.payload);
      CartItem.amount += 1;
    },
    decrese: (state, action) => {
      const CartItem = state.cartItems.find((s) => s.id === action.payload);
      // if (CartItem.amount === 1) return;
      CartItem.amount -= 1;
    },
    Total: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = Math.floor(total * 100) / 100;
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});
// console.log(cartSlice);
export const { clearCart, removeItem, increase, decrese, Total } =
  cartSlice.actions;

export default cartSlice.reducer;
