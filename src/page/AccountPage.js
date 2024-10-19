import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../component/Loader";

const AccountPage = () => {
  const { user } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((s) => s.userSlice);
  const isAdmin = localStorage.getItem("isAdmin");
  const userAvailable = localStorage.getItem("userId");
  useEffect(() => {
    setTimeout(() => {
      if (!data || user !== data.id) {
        if (isAdmin || userAvailable) return;
        navigate("/");
      }
    }, 3500);
  }, [user, navigate, data, dispatch, isAdmin, userAvailable]);
  if (loading) return <Loader />;
  if (error.isError) return <h1>{error?.error}</h1>;
  return <Outlet />;
};
export default AccountPage;
