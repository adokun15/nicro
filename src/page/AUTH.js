import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  useAdminMutation,
  useLoggedInMutation,
  useLoginUserMutation,
  useSignupUserMutation,
} from "../store/AuthSlice";
import { UiActions } from "../store/uiActions";
import { userThunk } from "../store/SingleUser";
import BtnLoader from "../component/btnLoader";
const Auth = () => {
  // const { modalAuth } = useSelector((s) => s.uiSlice);

  const [mode] = useSearchParams();
  const [from] = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const [errMessage, setError] = useState("");
  const AuthMode =
    mode.get("mode") === "login"
      ? "login"
      : mode.get("mode") === "signup"
      ? "signup"
      : mode.get("mode") === "admin"
      ? "admin"
      : "login";

  // const [AuthMode, s] = useState("login");

  const navigate = useNavigate();
  //const isSubmitting = nav.state === "submitting";

  const [
    loginRefetch,
    { isLoading: loginLoad, isError: isLoggedError, error: loggedError },
  ] = useLoginUserMutation();
  const [
    signupRefetch,
    { isLoading: signupLoad, isError: isSignupError, error: signupError },
  ] = useSignupUserMutation();

  const [
    adminRefetch,
    { isLoading: adminLoad, isError: isAdminError, error: adminError },
  ] = useAdminMutation();
  //const [tempId, setTempId] = useState("");

  const [
    getUser,
    { isError: isUserError, error: getUserError, isLoading: userLoading },
  ] = useLoggedInMutation();

  useEffect(() => {
    if (isSignupError) {
      setError(signupError?.message || signupError?.code);
    }
    if (isLoggedError) {
      setError(loggedError?.message || loggedError?.code);
    }

    if (isUserError) {
      setError(getUserError?.message || getUserError?.code);
    }
    if (isAdminError) {
      setError(adminError?.message || adminError?.code);
    }
  }, [
    isSignupError,
    isLoggedError,
    loggedError,
    signupError,
    isUserError,
    getUserError,
    isAdminError,
    adminError,
  ]);
  //const user = useRouteLoaderData("userkey");

  const dispatch = useDispatch();

  const getUserHandler = async (id) => {
    /* if (AuthMode === "admin" && pin !== 2005) {
      dispatch(
        UiActions.notifierHandler({ display: true, message: "Wrong Pin!!" })
      );
      return;
    }*/
    await getUser(id).then((d) => {
      // console.log(d);
      if (!d.data.id) return;
      dispatch(
        userThunk({
          data: d.data,
        })
      );

      if (AuthMode === "signup") {
        const moveTo = from.get("from");

        dispatch(
          UiActions.notifierHandler({
            display: true,
            message: `Welcome to Nicro, ${d.data?.firstName}`,
          })
        );
        if (moveTo) navigate(`/${moveTo}`);
        navigate("/");
      } else {
        const moveTo = from.get("from");
        dispatch(
          UiActions.notifierHandler({
            display: true,
            message: `Welcome Back ${d.data?.firstName}`,
          })
        );
        if (moveTo) navigate(`/${moveTo}`);
        navigate("/");
      }
    });
    /* .catch(() =>
          dispatch(
            userThunk({
              data: null,
              loading: false,
              error: {
                error: error || "Something went Wrong",
                isError: isError,
              },
            })
          )
          );
          */
  };
  const authorize = async (e) => {
    e.preventDefault();

    if (AuthMode === "admin") {
      if (password.length === 0 && email.length === 0) {
        setError(`Empty fields (email & password)`);
        return;
      }

      if (password.length === 0 || email.length === 0) {
        let message;
        message = `Empty ${password.length ? "email" : "password"} field`;
        message = `Empty ${email.length ? "password" : "email"} field`;
        return setError(message);
      }

      try {
        await adminRefetch({ email, password })
          .then(() => {
            const idToken = localStorage.getItem("userId");
            const id = JSON.parse(idToken);
            if (!id) return null;
            return id;
          })
          .then((d) => {
            //console.log(d);
            if (d) getUserHandler(d);
          });
        setEmail("");
        setPassWord("");
      } catch (e) {
        setError(e.code);
      }
    }

    if (AuthMode === "login") {
      if (password.length === 0 && email.length === 0) {
        setError(`Empty fields (email & password)`);
        return;
      }

      if (password.length === 0 || email.length === 0) {
        let message;
        message = `Empty ${password.length ? "email" : "password"} field`;
        message = `Empty ${email.length ? "password" : "email"} field`;
        return setError(message);
      }

      try {
        await loginRefetch({ email, password })
          .then(() => {
            const idToken = localStorage.getItem("userId");
            const id = JSON.parse(idToken);
            if (!id) return null;
            return id;
          })
          .then((d) => {
            //console.log(d);
            if (d) getUserHandler(d);
          });
        setEmail("");
        setPassWord("");
      } catch (e) {
        setError(e.code);
      }
    }

    if (AuthMode === "signup") {
      if (password.length === 0 && email.length === 0) {
        setError(`Empty fields (email & password)`);
        return;
      }

      if (password.length === 0 || email.length === 0) {
        let message;
        message = `Empty ${password.length ? "email" : "password"} field`;
        message = `Empty ${email.length ? "password" : "email"} field`;
        return setError(message);
      }

      if (!email.includes("@")) {
        setError("Email doesn't have @");
        return;
      }
      if (password.length < 8) {
        setError("password too short. Length must be longer or equal to 8");
        return;
      }
      if (fname === "") {
        setError("FirstName field Empty");
        return;
      }

      if (lname === "") {
        setError("LastName field Empty");
        return;
      }

      try {
        await signupRefetch({
          email,
          password,
          fname,
          lname,
        })
          .then(() => {
            const idToken = localStorage.getItem("userId");
            const id = JSON.parse(idToken);
            if (!id) return null;
            return id;
          })
          .then((d) => {
            if (d) getUserHandler(d);
          });

        setEmail("");
        setPassWord("");
        setLname("");
        setFname("");
      } catch (e) {
        setError(e.code);
      }
    } //AuthMode
    /**
     * 
      
      
     */
  };
  const authText =
    AuthMode === "signup"
      ? "Sign up"
      : AuthMode === "login"
      ? "Sign In"
      : AuthMode === "admin"
      ? "Log In As Admin"
      : "Sign up";

  const btnText =
    loginLoad || signupLoad || adminLoad ? (
      <BtnLoader />
    ) : userLoading ? (
      "getting data"
    ) : (
      authText
    );

  //<ModalCover />
  return (
    <>
      <main
        className={`lg:w-[50%] w-[95%]  m-auto  mt-5 border-gray-400  lg:shadow-2xl `}
      >
        <div className="z-40 relative min-h-[60vh]  leading-6 w-full bg-white pb-5">
          <h1 className="lg:bg-pink-800 py-2   w-full text-pink-800 lg:text-white text-xl  text-center   ">
            {AuthMode === "signup"
              ? "Hi, Create your Account to get Started"
              : AuthMode === "login"
              ? "Welcome Back!"
              : AuthMode === "admin"
              ? "Login Into Your Account"
              : "Hi, Create your Account to get Started"}
          </h1>
          <p className="text-red-900 text-center">
            {errMessage ? errMessage : ""}
          </p>
          <form className="lg:my-3 w-4/5 my-5 relative m-auto block leading-10">
            {AuthMode === "signup" && (
              <>
                <label className="font-medium mb-3 text-[1rem]">
                  FirstName
                </label>
                <input
                  onChange={(e) => setFname(e.target.value)}
                  className="block border-gray-400 border-2 w-full border-solid mb-3"
                />
                <label className="font-medium mb-3 text-[1rem]">LastName</label>
                <input
                  onChange={(e) => setLname(e.target.value)}
                  className="block border-gray-400 border-2 w-full border-solid  mb-3"
                />
              </>
            )}
            <label className="font-medium mb-3 text-[1rem]">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="block border-gray-400 border-2 w-full border-solid  mb-3"
            />
            <label className="font-medium mb-3 text-[1rem]">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassWord(e.target.value)}
              className="block border-gray-400 border-2 w-full border-solid  mb-3"
            />
            <div className="flex w-full justify-center">
              <button
                onClick={authorize}
                className="bg-pink-800 px-8 py-1 text-white text-xl rounded-[0.8rem] transition-all hover:bg-pink-900 "
              >
                {btnText}
              </button>
            </div>
          </form>
          <div className="flex justify-between px-5 py-2 w-full  absolute bottom-0 italic ">
            <p className="cursor-pointer hover:text-pink-800 ">
              <Link to={`?mode=admin`}>login as Admin</Link>
            </p>
            <p className="cursor-pointer text-[0.8rem] lg:text-[1rem] hover:text-pink-800">
              <Link to={`?mode=${AuthMode === "signup" ? "login" : "signup"}`}>
                {AuthMode === "login"
                  ? "Don't Have an Account...Register"
                  : AuthMode === "signup"
                  ? "Already Have An Account...Login"
                  : "Don't Have an Account...Register"}
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
};
export default Auth;
