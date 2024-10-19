import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import userimg from "../../asset/icons8-user-24.png";
import { UiActions } from "../../store/uiActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { UserActions } from "../../store/SingleUser";
import NavLinks from "../../component/NavLinks";
const AdminNav = () => {
  const dispatch = useDispatch();

  const toggleModalOn = () => {
    dispatch(UiActions.updateModalToggle(true));
  };

  const toggleModalOff = () => {
    dispatch(UiActions.updateModalToggle(false));
  };
  const { data } = useSelector((s) => s.userSlice);
  const navigate = useNavigate();
  const LoggedOut = () => {
    dispatch(UserActions.updateUser({ data: {} }));
    navigate("/");

    localStorage.removeItem("userId");
    dispatch(
      UiActions.notifierHandler({
        display: true,
        message: "Logged out Successfully",
        info: "green",
      })
    );
  };
  const { modalToggle } = useSelector((s) => s.uiSlice);
  //alert(modalToggle);
  return (
    <main
      className="fixed
     bg-white text-pink-900  top-0 w-full  pr-8 z-[100]  px-4 py-1 shadow "
    >
      <nav className="flex  items-center justify-between overflow-hidden h-[10vh]">
        {modalToggle && (
          <button className="text-3xl lg:hidden" onClick={toggleModalOff}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        )}
        {!modalToggle && (
          <button className="text-3xl lg:hidden" onClick={toggleModalOn}>
            ☰
          </button>
        )}

        <h1 className="text-3xl ">NICRO</h1>

        <div className="lg:flex hidden  list-none gap-5 pl-4">
          <NavLinks />
        </div>

        <div className="lg:block hidden">
          {!data?.id && (
            <Link
              to="/authorize"
              className="h-fit w-fit  p-1 border-2 border-white border-solid rounded-[0.5rem] flex items-center"
            >
              <p className="px-4 text-xl">login</p>
              <div className=" w-7 h-7  overflow-hidden">
                {" "}
                <img src={userimg} alt="login" className="w-full h-full" />
              </div>
            </Link>
          )}

          {data?.id && (
            <li className="list-none flex gap-3">
              <Link onClick={LoggedOut} className="">
                <FontAwesomeIcon icon={faArrowLeft} />
                <span className="ml-2"> logout</span>
              </Link>
              <span>|</span>
              <Link className="" to={`/nicro/${data?.id}/admin`}>
                <span className="mr-2">Admin</span>
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </li>
          )}
        </div>
      </nav>
      <nav
        className={`bg-white lg:hidden  duration-500 transition-all ${
          modalToggle ? "h-fit" : "h-0 overflow-hidden"
        }`}
      >
        <NavLinks cls={true} close={toggleModalOff} />
        {!data?.id && (
          <NavLink
            onClick={toggleModalOff}
            to="/authorize"
            className="  list-none text-2xl ml-5 [&.active]:border-pink-800 [&.active]:border-b-2  [&.active]:border-solid"
          >
            login
          </NavLink>
        )}

        {data?.id && (
          <>
            <NavLink
              className="  list-none text-2xl ml-5 [&.active]:border-pink-800 [&.active]:border-b-2  [&.active]:border-solid"
              to={`/nicro/${data?.id}/admin`}
              onClick={toggleModalOff}
            >
              Admin
            </NavLink>
            <li
              onClick={() => {
                toggleModalOff();
                LoggedOut();
              }}
              className="  my-3 list-none text-2xl ml-5 [&.active]:border-pink-800 [&.active]:border-b-2  [&.active]:border-solid"
            >
              logout
            </li>
          </>
        )}
      </nav>
    </main>
  );
};
export default AdminNav;
