import { Outlet, useLoaderData, useRouteLoaderData } from "react-router-dom";
import MainNavigation from "../component/MainNavigation";
//import SideBar from "../component/Sidebar";

import Notification from "../component/Notification";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { userThunk } from "../store/SingleUser";
import {
  useGetSingleCartMutation,
  useUpdateSingleCartMutation,
} from "../store/CartSlice";

import { useLoggedInMutation } from "../store/AuthSlice";

import { CartAction } from "../store/cart";
import AdminNav from "./AdminUtil/AdminNav";
import ModalCover from "../component/Modal";

const Root = () => {
  const user = useLoaderData();
  const [getUser] = useLoggedInMutation();
  const dispatch = useDispatch();
  //console.log(user);

  //Check if data is Existing

  //cart
  const cartId = useRouteLoaderData("cart");
  const { carts } = useSelector((s) => s.carts);
  const [triggerCart] = useGetSingleCartMutation();
  const [updateCartList] = useUpdateSingleCartMutation();

  const someFunc = useCallback(async () => {
    await getUser(user)
      .then((d) => {
        dispatch(
          userThunk({
            data: d?.data || {},
          })
        );
      })
      .catch((e) => console.log(e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, getUser, user]);
  useEffect(() => {
    someFunc();
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
  }, [someFunc]);
  const { data } = useSelector((s) => s.userSlice);

  let tempnav = <MainNavigation />;

  if (data.isAdmin) {
    tempnav = <AdminNav />;
  }

  const { modalDelete, modalEdit } = useSelector((s) => s.uiSlice);

  return (
    <div className="relative">
      {tempnav}
      <div className="mt-[5.5rem]">
        <Notification />
        {(modalDelete || modalEdit) && <ModalCover />}

        <Outlet />
      </div>
    </div>
  );
};
export default Root;
