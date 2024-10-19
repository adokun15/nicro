import {
  faArrowLeft,
  faArrowRight,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  const { data } = useSelector((s) => s.userSlice);

  return (
    <main className="lg:w-3/5 w-4/5 m-auto my-7">
      <h1 className="font-medium text-2xl">Your Order Was Successful!</h1>
      <div className="lg:text-[10rem] text-[7rem]">
        <FontAwesomeIcon icon={faThumbsUp} />
      </div>

      <div className="flex gap-10 text-pink-800">
        <Link to="/shop">
          <FontAwesomeIcon icon={faArrowLeft} />
          <span className="ml-2"> Order Again</span>
        </Link>
        <Link className="" to={`/nicro/${data?.id}/profile`}>
          <span className="mr-2">Check Profile</span>
          <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>
    </main>
  );
};
export default OrderSuccess;
