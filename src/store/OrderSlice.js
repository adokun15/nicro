import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

import { api } from "./PostItemSlice";
const OrderSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    addToOrder: builder.mutation({
      async queryFn({ others, docID, orders }) {
        try {
          const newItem = [orders, ...others.orders];

          const docRef = doc(db, "nicroUserData", docID);
          const info = {
            orders: newItem,
          };
          await updateDoc(docRef, info);
          return { data: "success" };
        } catch (e) {
          throw new Error({ message: e.message || e.code, status: 500 });
        }
      },
    }),
  }),
});
export const { useAddToOrderMutation } = OrderSlice;
