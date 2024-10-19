import CartList from "../component/CartList";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "./Wrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faNairaSign,
} from "@fortawesome/free-solid-svg-icons";
import { useLoaderData, useNavigate } from "react-router-dom";
import {
  useGetSingleCartMutation,
  useUpdateSingleCartMutation,
} from "../store/CartSlice";
import { useEffect } from "react";
import { CartAction } from "../store/cart";
import { UiActions } from "../store/uiActions";

const Cart = () => {
  const { totalPrice, carts } = useSelector((s) => s.carts);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [updateCartList, { isLoading }] = useUpdateSingleCartMutation();

  const updateList = async () => {
    await updateCartList({
      docId: cartId,
      allCarts: carts || [],
    }).catch(() =>
      dispatch(
        UiActions.notifierHandler({
          error: true,
          info: "red",
          message: "An Error Occured. Could not add Item to Cart",
        })
      )
    );
  };

  const ShopHandler = async () => {
    navigate("/shop");
    await updateList();
  };
  const CheckoutHandler = async () => {
    navigate("/checkout");
    await updateList();
  };

  const cartId = useLoaderData();
  const [triggerCart] = useGetSingleCartMutation();
  useEffect(() => {
    const cartCheck = async () => {
      if (cartId && (!carts || carts.length === 0)) {
        await triggerCart(cartId)
          .then((data) => {
            dispatch(
              CartAction.refreshedCart({ carts: data?.data?.carts || [] })
            );
          })
          .catch(() =>
            dispatch(
              UiActions.notifierHandler({
                error: true,
                info: "red",
                message: "An Error Occured. Could not Load Carts!",
              })
            )
          );
      }

      if (cartId && carts.length >= 1) {
        await updateCartList({
          docId: cartId,
          allCarts: carts || [],
        }).catch(() =>
          dispatch(
            UiActions.notifierHandler({
              error: true,
              info: "red",
              message: "An Error Occured. Could not add Item to Cart",
            })
          )
        );
      }
    };
    cartCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper cls="px-10">
      <div className="flex justify-between lg:px-12 items-center">
        <h1 className="text-2xl text-center my-6 text-pink-800">Cart</h1>
        {totalPrice !== 0 && (
          <p className=" text-xl">
            Total: <FontAwesomeIcon icon={faNairaSign} />
            <span className="text-[1.4rem]">
              {totalPrice !== 0 ? totalPrice : ""}
            </span>
          </p>
        )}
      </div>
      <CartList loading={isLoading} checkout={false} />
      {carts && carts.length >= 1 && (
        <div className="w-full gap-5  mt-5 flex justify-center">
          <button
            onClick={ShopHandler}
            className="bg-pink-800 text-white px-5 py-2 rounded-[3px]"
          >
            <article className="flex gap-3  items-center">
              <FontAwesomeIcon icon={faArrowLeft} />
              <p className="lg:block hidden">keep shopping</p>
            </article>
          </button>
          <button
            onClick={CheckoutHandler}
            className="bg-pink-800 text-white px-5 py-2 rounded-[3px]"
          >
            <article className="flex gap-3 items-center">
              <FontAwesomeIcon icon={faArrowRight} />
              <p className="lg:block hidden">proceed to Checkout</p>
            </article>
          </button>
        </div>
      )}
    </Wrapper>
  );
};
export default Cart;
