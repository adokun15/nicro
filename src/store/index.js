import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { api } from "./PostItemSlice";
import { UserSlice } from "./SingleUser";
import { CartSlice } from "./cart";
import { UiSlice } from "./uiActions";
import { configureStore } from "@reduxjs/toolkit";
export const store = configureStore({
  reducer: {
    uiSlice: UiSlice.reducer,
    carts: CartSlice.reducer,
    userSlice: UserSlice.reducer,
  },
  middleware: (gDm) => gDm().concat(api.middleware),
});
setupListeners(store.dispatch);
