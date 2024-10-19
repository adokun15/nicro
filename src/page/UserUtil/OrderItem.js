import { faNairaSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const OrderItem = ({ item }) => {
  return (
    <div>
      <div className="lg:w-[80%] w-full m-auto ">
        <img
          className=" lg:hidden block scale-x-25   w-full h-full"
          src={item?.productImage}
          alt={item?.name}
        />
        <img
          className=" lg:block hidden w-full h-full"
          src={item?.productImage}
          alt={item?.name}
        />
      </div>
      <p className="text-[1rem] lg:text-center lg:text-xl font-medium mb-2">
        {item?.name}
      </p>
      <p className="text-[1.3rem] text-center my-2">
        <FontAwesomeIcon icon={faNairaSign} />
        {item?.total}
      </p>
      <p className="text-[1rem] text-center">qty: {item?.quantity}</p>
    </div>
  );
};
export default OrderItem;
