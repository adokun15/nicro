import { useSelector } from "react-redux";
import CartItem from "./CartItem";

const CartList = ({ cls, checkout }) => {
  const { carts } = useSelector((s) => s.carts);
  return (
    <main
      className={`${
        cls ? cls : "lg:w-3/5 w-full"
      } m-auto z-20 relative my-5 overflow-hidden`}
    >
      {carts &&
        carts.length >= 1 &&
        carts.map((cart) => <CartItem checkout={checkout} item={cart} />)}
      {(!carts || carts.length === 0) && <h1>Cart is Empty!</h1>}
    </main>
  );
};
export default CartList;
