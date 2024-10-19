import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "Cart",
  initialState: { carts: [], totalPrice: 0 },
  reducers: {
    refreshedCart(s, a) {
      if (!a.payload.carts) return;
      s.carts = a.payload.carts;

      s.totalPrice = a.payload.carts.reduce(
        (acc, newDigit) => acc + newDigit.price * newDigit.quantity,
        0
      );
    },
    addToCart(state, action) {
      state.totalPrice =
        state.totalPrice + action.payload.price * action.payload.quantity;
      const existedItemIndex = state.carts.findIndex(
        (cart) => cart.id === action.payload.id
      );

      const SingleItem = state.carts[existedItemIndex];
      if (SingleItem) {
        const newItem = {
          ...SingleItem,
          quantity: SingleItem.quantity + action.payload.quantity,
          total:
            (SingleItem.quantity + action.payload.quantity) *
            action.payload.price,
        };

        state.carts[existedItemIndex] = newItem;
      } else {
        let amt = action.payload.price * action.payload.quantity;
        state.carts = [{ ...action.payload, total: amt }, ...state.carts];
      }
    },
    removeFromCart(state, action) {
      const oldState = state.carts.find(
        (cart) => cart.id === action.payload.id
      );
      state.totalPrice = state.totalPrice - oldState.total;
      state.carts = state.carts.filter((cart) => cart.id !== action.payload.id);
    },
    updateSingleCart(state, action) {
      const oldState = state.carts.find(
        (cart) => cart.id === action.payload.id
      );

      let status = action.payload.status; //"add" / "minus"

      if (status === "add") {
        state.totalPrice = state.totalPrice + oldState.price;

        const newstate = state.carts.map((cart) => {
          return {
            ...cart,
            quantity:
              cart.id === action.payload.id ? cart.quantity + 1 : cart.quantity,
            total:
              cart.id === action.payload.id
                ? (cart.quantity + 1) * cart.price
                : cart.total,
          };
        });
        state.carts = [...newstate];
      }
      if (status === "sub") {
        if (oldState.quantity === 1) {
          const others = state.carts.filter((cart) => cart.id !== oldState.id);
          state.carts = [...others];
        }
        state.totalPrice = state.totalPrice - oldState.price;

        const newstate = state.carts.map((cart) => {
          return {
            ...cart,
            quantity:
              cart.id === action.payload.id ? cart.quantity - 1 : cart.quantity,
            total:
              cart.id === action.payload.id
                ? (cart.quantity - 1) * cart.price
                : cart.total,
          };
        });

        state.carts = [...newstate];
      }
    },
  },
});
export const CartAction = CartSlice.actions;
