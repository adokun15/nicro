import { useEffect } from "react";
import ProductCategory from "../component/ProductCategory";
import Wrapper from "./Wrapper";
import { useRouteLoaderData } from "react-router-dom";
import {
  useGetSingleCartMutation,
  useUpdateSingleCartMutation,
} from "../store/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { CartAction } from "../store/cart";

const Shop = () => {
  const dispatch = useDispatch();
  const cartId = useRouteLoaderData("cart");

  const { carts } = useSelector((s) => s.carts);
  const [triggerCart] = useGetSingleCartMutation();
  const [updateCartList] = useUpdateSingleCartMutation();

  useEffect(() => {
    const cartCheck = async () => {
      if (cartId && (!carts || carts.length === 0)) {
        try {
          await triggerCart(cartId).then((data) => {
            dispatch(CartAction.refreshedCart({ carts: data?.data?.carts }));
          });
          return;
        } catch (e) {
          console.log(e);
        }
      }
      if (cartId && carts.length >= 1) {
        try {
          await updateCartList({
            docId: cartId,
            allCarts: carts || [],
          });
        } catch (e) {
          console.log(e);
        }
      }
    };
    cartCheck();
  }, []);
  return (
    <Wrapper cls="px-10">
      <h1 className="text-2xl text-center my-6 text-pink-800">Shop</h1>
      <ProductCategory />
    </Wrapper>
  );
};
export default Shop;
