import { Link } from "react-router-dom";
import MainNavigation from "../component/MainNavigation";
import { useSelector } from "react-redux";
import AdminNav from "../page/AdminUtil/AdminNav";
const ErrorPage = () => {
  const { data } = useSelector((s) => s.userSlice);
  let temp = <MainNavigation />;

  if (data.isAdmin) {
    temp = <AdminNav />;
  }
  return (
    <div className="relative">
      {temp}
      <div className="mt-[8.5rem]">
        <h1 className="text-2xl mt-10 text-center font-medium">
          Opps..., Something isn't Right...
        </h1>
        <Link
          to="/"
          className="text-pink-800 underline w-full block my-6 text-center"
        >
          {" "}
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
