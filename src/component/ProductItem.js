import { useDispatch, useSelector } from "react-redux";
//import { UiActions } from "../store/uiActions";
import { useRef } from "react";
import { CartAction } from "../store/cart";
import {
  useCreateCartMutation,
  useUpdateSingleCartMutation,
} from "../store/CartSlice";
import { UiActions } from "../store/uiActions";
import BtnLoader from "./btnLoader";
//import { useLoaderData, useRouteLoaderData } from "react-router-dom";
//import CartList from "./CartList";

const ProductItem = ({ item }) => {
  const dispatch = useDispatch();
  const qtyRef = useRef();

  //const [freshCarts, setFreshCarts] = useState([]);

  const { carts } = useSelector((S) => S.carts);
  const [addtoCartList, { isLoading: creatingLoading }] =
    useCreateCartMutation();
  const [updateCartList, { isLoading: updatedLoading }] =
    useUpdateSingleCartMutation();

  const addToCart = async () => {
    const temp = localStorage.getItem("cartId");
    const tempId = JSON.parse(temp);

    const cartdetail = {
      id: item.id,
      name: item.name,
      quantity: +qtyRef.current.value || 1,
      price: +item.price,
      productImage: item.productImage,
    };

    const successCartInfo = () => {
      dispatch(
        UiActions.notifierHandler({
          display: true,
          message: `${qtyRef.current.value} unit of ${item.name} has been added to your Cart`,
          info: "green",
        })
      );
      dispatch(CartAction.addToCart({ ...cartdetail }));
    };
    const failCartInfo = (e) => {
      dispatch(
        UiActions.notifierHandler({
          display: true,
          message: `${e || e.code || e.message || "Something went Wrong"}`,
          info: "red",
        })
      );
    };

    if (tempId) {
      await updateCartList({
        docId: tempId,
        allCarts: carts,
        newCart: cartdetail,
      })
        .then(() => successCartInfo())
        .catch((e) => failCartInfo(e));
      return;
    }

    await addtoCartList({
      id: item.id,
      name: item.name,
      quantity: +qtyRef.current.value || 1,
      price: +item.price,
      productImage: item.productImage,
    })
      .then(() => successCartInfo())
      .catch((e) => failCartInfo(e));
  };

  return (
    <div className=" lg:w-3/5  w-full mx-auto lg:my-12 my-8 lg:flex block">
      <h2 className="lg:text-5xl lg:hidden block text-[1.2rem] mb-3 lg:text-center text-start">
        {item?.name}
      </h2>
      <div className="w-2/4  lg:w-1/4  lg:max-h-[13rem] h-[12rem] m-auto">
        <img
          className="scale-y-25  lg:hidden block w-full h-full"
          src={item?.productImage}
          alt={item?.name}
        />
        <img
          className="lg:block hidden w-full h-full"
          src={item?.productImage}
          alt={item?.name}
        />
      </div>
      <div className="px-4 lg:w-2/4 w-full ">
        <h2 className="lg:text-4xl lg:block hidden text-[1.2rem] lg:text-center text-start">
          {item?.name}
        </h2>
        <div className="block w-full  px-2">
          <p className=" text-3xl font-medium lg:my-10 m-4 text-center">
            <span className="lg:inline hidden ">Price: </span>₦{item?.price}
          </p>

          <div className="flex lg:block items-center my-2 gap-5">
            <span className="font-medium text-xl">Quantity: </span>
            <input
              defaultValue={1}
              type="number"
              ref={qtyRef}
              className="border-2 lg:w-1/5 lg:block border-black bg-none border-solid w-full my-4"
            />
          </div>
        </div>
        <div className="lg:flex lg:justify-start justify-center">
          <button
            onClick={addToCart}
            className="bg-pink-800 w-full text-white lg:w-fit px-6 py-2 rounded-[0.8rem]"
          >
            {creatingLoading || updatedLoading ? <BtnLoader /> : "Add To Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductItem;
