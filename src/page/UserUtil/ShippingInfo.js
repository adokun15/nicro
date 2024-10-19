const ShippingInfo = ({ shippings }) => {
  return (
    <main className="lg:w-3/5 w-4/5 m-auto">
      <h1 className="text-4xl text-center mb-4">Shipping Info</h1>
      <ul>
        <li className="my-4 ">
          <p className=" lg:text-2xl text-[0.9rem]">Receiver FullName</p>
          <p className="italic text-xl">{shippings.fullName}</p>
        </li>
        <li className="my-4 ">
          <p className=" lg:text-2xl  text-[0.9rem]"> Receiver Address</p>

          <p className="italic text-xl">
            {" "}
            {shippings.address}, {shippings.state}
          </p>
        </li>
        <li className="my-4 ">
          <p className=" lg:text-2xl  text-[0.9rem]">Receiver Phone Contact</p>
          <p className="italic text-xl"> {shippings.phone}</p>
        </li>
      </ul>
    </main>
  );
};
export default ShippingInfo;
