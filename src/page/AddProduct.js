import { useNavigate } from "react-router-dom";
import AddProductItem from "../admin/PostItems";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { UiActions } from "../store/uiActions";

const AddProduct = () => {
  const { data: admin } = useSelector((s) => s.userSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const adminIsAvailable = localStorage.getItem("isAdmin");
  useEffect(() => {
    if (!admin.isAdmin && !adminIsAvailable) {
      navigate("/");
      dispatch(
        UiActions.notifierHandler({
          display: true,
          message: `Unauthorized Access`,
          info: "red",
        })
      );
    }
  }, [admin.isAdmin, adminIsAvailable, dispatch, navigate]);

  return (
    <>
      <h1 className="lg:text-5xl text-3xl text-center text-pink-800 my-8">
        Add Product
      </h1>
      <AddProductItem />
    </>
  );
};
export default AddProduct;
