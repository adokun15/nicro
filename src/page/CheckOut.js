import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartList from "../component/CartList";
import CheckOutForm from "../component/CheckOutForm";
import Wrapper from "./Wrapper";
import { faNairaSign } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";
import { UiActions } from "../store/uiActions";
import OrderSuccess from "../component/OrderSuccess";

const CheckoutPage = () => {
  const { carts, totalPrice } = useSelector((s) => s.carts);

  const [orderIsSuccess, setsuccess] = useState(false);

  const dispatch = useDispatch();

  const showPopUp = () => {
    setsuccess(true);
  };

  async function removeCart() {
    const sometEXT = localStorage.getItem("cartId");
    const id = JSON.stringify(sometEXT);
    const docRef = doc(db, "nicroCart", id);
    try {
      await deleteDoc(docRef);
      localStorage.removeItem("cartId");
    } catch (e) {
      dispatch(
        UiActions.notifierHandler({
          display: true,
          message: `Something went wrong `,
          info: "red",
        })
      );
    }
  }

  return (
    <>
      {!orderIsSuccess && (
        <Wrapper
          cls={`w-full  m-auto ${
            carts.length >= 1
              ? "lg:flex block py-8 lg:px-10 gap-5 justify-between"
              : "block"
          } `}
        >
          <div
            className={`mb-5 ${
              carts.length === 0 ? "w-0" : "w-full px-10 lg:w-1/2"
            } font-medium text-xl `}
          >
            {carts.length >= 1 && (
              <>
                <h1 className="underline">Your Cart Summary</h1>
                <CartList
                  checkout={true}
                  cls="w-full text-[0.7rem] leading-[1rem] "
                />
                <div className="flex justify-between my-4">
                  <h2 className="font-medium text-[1.4rem]">TOTAL</h2>
                  <p>
                    <FontAwesomeIcon icon={faNairaSign} />
                    <span className="text-[1.4rem]">{totalPrice}</span>
                  </p>
                </div>
              </>
            )}
          </div>
          <div
            className={`${
              carts.length === 0
                ? "w-3/5 m-auto "
                : "lg:w-1/2 w-4/5 mx-auto lg:flex-start"
            } `}
          >
            <h2 className={`mb-5 font-medium text-xl underline`}>
              CheckOut Form
            </h2>
            <CheckOutForm popup={showPopUp} removecart={removeCart} />
          </div>
        </Wrapper>
      )}
      {orderIsSuccess && <OrderSuccess />}
    </>
  );
};
export default CheckoutPage;
