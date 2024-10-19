import Shop from "./Shop";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { UiActions } from "../store/uiActions";

const EditProduct = () => {
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
      <Shop />
    </>
  );
};
export default EditProduct;
