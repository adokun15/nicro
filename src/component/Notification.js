import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UiActions } from "../store/uiActions";

const Notification = () => {
  const { display, message, info } = useSelector((s) => s.uiSlice.notifier);

  const dispatch = useDispatch();
  useEffect(() => {
    if (display) {
      setTimeout(() => {
        dispatch(
          UiActions.notifierHandler({ display: false, message: "", info: "" })
        );
      }, 4500);
    }
  }, [dispatch, display]);
  return (
    <>
      {display && (
        <nav
          className={` ${
            info === "red"
              ? "text-[#ad0415fb] bg-[#efccd0] border-[#e6c3c3] "
              : "bg-[#d4edda] text-[#155724] border-[#c3e6cb] "
          } px-3 py-1 border-2 border-solid mx-10 my-4`}
        >
          <p>{message}</p>
        </nav>
      )}
    </>
  );
};
export default Notification;
