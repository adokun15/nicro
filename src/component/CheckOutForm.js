import { useDispatch, useSelector } from "react-redux";
import { UiActions } from "../store/uiActions";
import { useState } from "react";
import { useAddToOrderMutation } from "../store/OrderSlice";
import { Link } from "react-router-dom";
import BtnLoader from "./btnLoader";

const CheckOutForm = ({ popup, removecart }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Ibadan");

  const [formError, setFormErr] = useState("");

  const { data } = useSelector((s) => s.userSlice);

  const [isNotLoggedIn, setLoggedIn] = useState(false);

  const timerErr = () => {
    setTimeout(() => {
      setFormErr("");
    }, 3500);
  };
  const { carts } = useSelector((s) => s.carts);
  const [addOrder, { isLoading }] = useAddToOrderMutation();

  const postOrder = async (e) => {
    e.preventDefault();
    if (!data.id) {
      setLoggedIn(true);
      return;
    } else {
      setLoggedIn(false);
    }

    if (carts.length === 0) {
      setFormErr("Empty Cart!");
      timerErr();
      return;
    }
    if (name?.length <= 3) {
      setFormErr("Length Of fullName must be greater than 3");
      timerErr();
      return;
    }
    if (phone.length <= 5) {
      setFormErr("Phone number must equal 11 digits");
      timerErr();
      return;
    }
    if (address?.length <= 3) {
      setFormErr("Length Of Address must be greater than 3");
      timerErr();
      return;
    }
    const newDate = new Date();
    const orderedStuffs = {
      others: { ...data },
      docID: data.docID,
      orders: {
        orderDate: newDate.toISOString(),
        orderList: carts,
        orderId: Math.trunc(Math.random() * 10000000000),
        orderStatus: "pending",
        shippingInfo: {
          fullName: name,
          phone,
          address,
          state: city || "Ibadan",
        },
      },
      prevOrders: data.orders,
    };
    //console.log(orderedStuffs);
    try {
      if (data && carts)
        await addOrder(orderedStuffs).then(async () => {
          //remove cart from db
          //remove from localstorage
          await removecart();
          //setup Pop Animation
          popup();
        });
    } catch (e) {
      console.log(e);
    }
  };

  //console.log(data);
  return (
    <div className="w-full">
      {isNotLoggedIn && (
        <p className="text-center font-medium my-4">
          Please Login Before Proceeding, click{" "}
          <span
            className="underline cursor-pointer text-pink-800 "
            onClick={() => {
              dispatch(UiActions.updateModalAuth(true));
            }}
          >
            <Link to="/authorize?from=checkout"> here to continue</Link>
          </span>
        </p>
      )}
      <form>
        <p>{formError}</p>
        <label>Receiver's Full Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block border-gray-400 border-2 py-1 w-full border-solid  mb-3"
        />
        <label>Receiver's Phone Number </label>
        <input
          required
          className="block border-gray-400 border-2 py-1 w-full border-solid  mb-3"
          onChange={(e) => setPhone(e.target.value)}
        />

        <label>Receiver's House Address</label>

        <input
          required
          className="block border-gray-400 border-2 py-1 w-full border-solid  mb-3"
          onChange={(e) => setAddress(e.target.value)}
        />
        <label>Select State</label>
        <select
          className="block border-gray-400 border-2 py-1 w-full border-solid  mb-3"
          onChange={(e) => setCity(e.target.value)}
        >
          <option>Ibadan</option>
          <option>Ogun</option>
          <option>Lagos</option>
        </select>

        <div className="flex justify-center my-4">
          <button
            onClick={postOrder}
            className=" cursor-pointer bg-pink-800 px-6 py-1 text-white text-[1rem] px-5 rounded-[5px] transition-all hover:bg-pink-900 m-auto "
          >
            {isLoading ? <BtnLoader /> : "Place Order"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckOutForm;
