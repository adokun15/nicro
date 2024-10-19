import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./page/rootPage";
import Home from "./page/Home";
import Shop from "./page/Shop";
import Cart from "./page/Cart";
import SingleCategory from "./page/SingleCategory";
import SingleProduct from "./page/SingleProduct";
import User from "./page/User";
import CheckoutPage from "./page/CheckOut";
import Auth from "./page/AUTH";
import { getUserToken } from "./tokens/userToken";
import { getCartToken } from "./tokens/cartToken";
import UserOrders from "./page/UserUtil/UserOrders";
import OrderDetail from "./page/UserUtil/OrdersDetail";
import ErrorPage from "./component/ErrorPage";
import Admin from "./page/AdminPage";
import AccountPage from "./page/AccountPage";
import UserDetail from "./page/AdminUtil/UserDetail";
import UserList from "./page/AdminUtil/UserList";
import EditProduct from "./page/EditShop";
import AddProduct from "./page/AddProduct";
function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorPage />,
      loader: getUserToken,
      id: "userkey",
      element: <Root />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "/shop",
          loader: getCartToken,
          id: "cart",
          children: [
            { index: true, element: <Shop /> },
            { path: "edit", element: <EditProduct /> },
            { path: "add", element: <AddProduct /> },
            { path: ":category", element: <SingleCategory /> },
            { path: ":category/:productId", element: <SingleProduct /> },
          ],
        },
        { path: "/cart", element: <Cart />, loader: getCartToken },
        { path: "/authorize", element: <Auth /> },
        { path: "/checkout", element: <CheckoutPage /> },
        {
          path: "/nicro/:user",
          element: <AccountPage />,
          children: [
            {
              path: "profile",
              element: <User />,
              children: [
                { index: true, element: <UserOrders /> },
                { path: "orders/:orderId", element: <OrderDetail /> },
              ],
            },
            {
              path: "admin",
              element: <Admin />,
              children: [
                { index: true, element: <UserList /> },
                { path: ":userId", element: <UserDetail /> },
              ],
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
