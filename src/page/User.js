import Wrapper from "./Wrapper";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const User = () => {
  const { data } = useSelector((s) => s.userSlice);
  return (
    <Wrapper cls="px-10 pb-10">
      <h1 className="text-2xl text-center my-6 text-pink-800">
        {data?.firstName && `Hi, ${data?.firstName}`}
      </h1>
      <div>
        <Outlet />
      </div>
    </Wrapper>
  );
};
export default User;
