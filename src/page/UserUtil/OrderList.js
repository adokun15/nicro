import OrderItem from "./OrderItem";

const OrderList = ({ list }) => {
  return (
    <main>
      <h1 className="text-4xl text-center">Your Orders</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 items-center w-full">
        {list?.map((order) => (
          <OrderItem key={order.id} item={order} />
        ))}
      </div>
    </main>
  );
};
export default OrderList;
