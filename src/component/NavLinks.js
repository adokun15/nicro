import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
const NavLinks = ({ cls, close }) => {
  const { data } = useSelector((s) => s.userSlice);
  //  const { user } = useParams();
  const [isAdmin, setAdmin] = useState(false);
  useEffect(() => {
    if (data?.isAdmin) {
      setAdmin(true);
    }
  }, [data.isAdmin]);
  return (
    <>
      <li className={cls ? `${cls} list-none my-3 text-2xl ml-5` : ""}>
        <NavLink
          onClick={close}
          to="/"
          className="[&.active]:border-pink-800 [&.active]:border-b-2  [&.active]:border-solid"
          end={true}
        >
          Home
        </NavLink>
      </li>
      <li className={cls ? `${cls} list-none my-3 text-2xl ml-5` : ""}>
        <NavLink
          className="[&.active]:border-pink-800 [&.active]:border-b-2  [&.active]:border-solid"
          to={isAdmin ? "/shop/edit" : "/shop"}
          onClick={close}
        >
          {isAdmin ? "Edit Products" : "Shop"}
        </NavLink>
      </li>

      <li className={cls ? `${cls} list-none my-3 text-2xl ml-5` : ""}>
        <NavLink
          className="[&.active]:border-pink-800 [&.active]:border-b-2  [&.active]:border-solid"
          to={isAdmin ? `/shop/add` : "/cart"}
          onClick={close}
        >
          {isAdmin ? "Add Product" : "Cart"}
        </NavLink>
      </li>
    </>
  );
};
export default NavLinks;
