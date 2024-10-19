import { api } from "./PostItemSlice";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const CartSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createCart: builder.mutation({
      async queryFn(cartData) {
        try {
          localStorage.removeItem("cartId");
          await addDoc(collection(db, "nicroCart"), {
            carts: [cartData],
          });

          const cart = query(collection(db, "nicroCart"));
          const querySnapshot = await getDocs(cart);
          querySnapshot.forEach((doc) => {
            const docExists = doc
              .data()
              .carts.find((c) => c.id === cartData?.id);
            if (docExists) {
              localStorage.setItem("cartId", JSON.stringify(doc.id));
            }
          });

          return { data: "success", error: "Something went Wrong" };
        } catch (error) {
          throw new Error({
            message: error.message || error.code,
            status: 500,
          });
        }
      },
    }),
    updateSingleCart: builder.mutation({
      async queryFn({ docId, allCarts, newCart }) {
        try {
          if (newCart) {
            let prevcarts = [...allCarts];
            const existedItemIndex = prevcarts.findIndex(
              (cart) => cart.id === newCart.id
            );

            const SingleItem = prevcarts[existedItemIndex];
            if (SingleItem) {
              const newItem = {
                ...SingleItem,
                quantity: SingleItem.quantity + newCart.quantity,
                total: (SingleItem.quantity + newCart.quantity) * newCart.price,
              };

              prevcarts[existedItemIndex] = newItem;

              const docRef = doc(db, "nicroCart", docId);
              const info = { carts: prevcarts };
              await updateDoc(docRef, info);
            } else {
              const carts = [...allCarts];
              if (!allCarts || !docId) return;
              const docRef = doc(db, "nicroCart", docId);
              const info = { carts };
              //    console.log(info);
              await updateDoc(docRef, info);
              return { data: "success", error: "Something went Wrong" };
            }

            return;
          }

          const carts = [...allCarts];
          if (!allCarts || !docId) return;
          const docRef = doc(db, "nicroCart", docId);
          const info = { carts };
          await updateDoc(docRef, info);
          return { data: "success", error: "Something went Wrong" };
        } catch (e) {
          throw new Error({ message: e.message || e.code, status: 500 });
        }
      },
    }),
    getSingleCart: builder.mutation({
      async queryFn(docId) {
        try {
          const cartDb = query(collection(db, "nicroCart"));
          let temp = {};
          const querySnapshot = await getDocs(cartDb);
          querySnapshot.forEach((doc) => {
            if (doc.id === docId) {
              temp = Object.assign({}, { docID: doc.id, ...doc.data() });
            }
          });

          if (temp.carts.length === 0) {
            const docRef = doc(db, "nicroCart", docId);
            await deleteDoc(docRef);
            localStorage.removeItem("cartId");
          }
          return { data: temp };
        } catch (error) {
          throw new Error({
            message: error.message || error.code,
            status: 500,
          });
        }
      },
    }),
    cancelSingleCart: builder.mutation({
      async queryFn({ cartId, allCart, docid }) {
        try {
          let temp = [...allCart];

          temp = temp.filter((cart) => cart.id !== cartId);

          const docRef = doc(db, "nicroCart", docid);
          const info = { carts: temp };
          console.log(info);
          await updateDoc(docRef, info);
          return { data: "success" };
        } catch (error) {
          throw new Error({
            message: error.message || error.code,
            status: 500,
          });
        }
      },
    }),
  }),
});
export const {
  useUpdateSingleCartMutation,
  useCancelSingleCartMutation,
  useCreateCartMutation,
  useGetSingleCartMutation,
} = CartSlice;
