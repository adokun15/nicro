import { useDispatch, useSelector } from "react-redux";
import { CartAction } from "../store/cart";
import { useCancelSingleCartMutation } from "../store/CartSlice";
import { useEffect } from "react";
import { UiActions } from "../store/uiActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNairaSign } from "@fortawesome/free-solid-svg-icons";

const CartItem = ({ item, checkout }) => {
  const dispatch = useDispatch();
  const { carts } = useSelector((S) => S.carts);
  const [triggerChanges] = useCancelSingleCartMutation();
  const cartId = localStorage.getItem("cartId");

  const DeleteCART = async () => {
    dispatch(CartAction.removeFromCart({ id: item.id }));
    const someId = JSON.parse(cartId);
    await triggerChanges({ cartId: item.id, docid: someId, allCart: carts })
      .then(() => {
        dispatch(
          UiActions.notifierHandler({
            display: true,
            message: `${item.name} has been removed from your Cart!`,
            info: "red",
          })
        );
      })
      .catch(() =>
        dispatch(
          UiActions.notifierHandler({
            display: true,
            message: "Something went Wrong",
            info: "red",
          })
        )
      );
  };
  const increaseQty = async () => {
    dispatch(
      CartAction.updateSingleCart({
        status: "add",
        id: item.id,
      })
    );
  };
  const decreaseQty = async () => {
    //const someId = JSON.parse(cartId);
    dispatch(
      CartAction.updateSingleCart({
        status: "sub",
        id: item.id,
      })
    );
  };
  return (
    <main className="border-b-2 z-20 border-solid flex my-6 relative h-fit border-pink-800 ">
      <div className=" relative p-7 py-10 h-full  w-2/4">
        <img
          className="lg:scale-x-50 scale-y-25  h-[8rem] w-full"
          src={item?.productImage}
          alt={item?.name}
        />
      </div>
      <div className="w-2/4 absolute left-[50%] lg:leading-[2rem]  bottom-0">
        <h1 className="font-medium lg:text-[0.9rem] mb-5 lg:m-0 text[0.6rem]">
          {item?.name}
        </h1>
        <h2 className="my-2">
          Price: <FontAwesomeIcon icon={faNairaSign} />
          <span className="text-[1.2rem]">{item?.price}</span>
        </h2>
        <div className="flex lg:gap-5 gap-2 my-2 items-center">
          <h2>Qty: {item?.quantity}</h2>
          {!checkout && (
            <>
              <button
                onClick={decreaseQty}
                className="text-2xl bg-pink-800 h-fit px-2 rounded-[0.1rem] text-white "
              >
                -
              </button>
              <button
                onClick={increaseQty}
                className="text-2xl bg-pink-800 h-fit px-2 rounded-[0.1rem] text-white "
              >
                +
              </button>
            </>
          )}
        </div>
        <h2>
          Total: <FontAwesomeIcon icon={faNairaSign} />
          <span className="text-[1.2rem]">{item?.total}</span>
        </h2>
      </div>
      {!checkout && (
        <button
          onClick={() => DeleteCART()}
          className="absolute lg:right-0  font-medium text-2xl text-pink-800"
        >
          x
        </button>
      )}
    </main>
  );
};
export default CartItem;
