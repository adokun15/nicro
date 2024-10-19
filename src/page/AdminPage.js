import Wrapper from "./Wrapper";
import { Outlet } from "react-router-dom";
const Admin = () => {
  return (
    <Wrapper cls="px-10 pb-10">
      <h1 className="text-2xl text-center my-6 text-pink-800">
        Admin DashBoard
      </h1>
      <div>
        <Outlet />
      </div>
    </Wrapper>
  );
};
export default Admin;
