import { useNavigate, useParams } from "react-router-dom";
import ShippingInfo from "./ShippingInfo";
import { useSelector } from "react-redux";
import OrderList from "./OrderList";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const OrderDetail = () => {
  const { orderId } = useParams();
  const { data } = useSelector((s) => s.userSlice);

  const order = data.orders?.find((d) => +d.orderId === +orderId);
  const navigate = useNavigate();
  const gotToProfile = () => {
    navigate(`/nicro/${data?.id}/profile`);
  };
  return (
    <div className="py-4">
      <div>
        <button
          onClick={gotToProfile}
          className="text-[0.9rem] lg:text-[1.2rem] text-pink-800 mb-5"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span className="mr-3"> Your Orders</span>
        </button>
      </div>
      <ShippingInfo shippings={order.shippingInfo} />
      <div className="mt-5">
        <OrderList list={order.orderList} />
      </div>
    </div>
  );
};
export default OrderDetail;
