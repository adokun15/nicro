import { faArrowRight, faNairaSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import UserProfile from "./UserProfile";
import { useLoggedInMutation } from "../../store/AuthSlice";
import { userThunk } from "../../store/SingleUser";
import Loader from "../../component/Loader";

const UserOrders = () => {
  const { user } = useParams();
  const navigate = useNavigate();

  const newDate = (d) => {
    const date = new Date(d);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());
    return `${day} - ${month} - ${year}`;
  };

  const totalAmount = (list) => {
    const t = list.reduce((acc, val) => acc + val.total, 0);
    return t;
  };

  const [toggleOrderProfile, setToggle] = useState(false);

  const gotToProfile = () => {
    setToggle(true);
  };
  const gotToOrder = () => {
    setToggle(false);
  };
  const gotoShop = () => {
    navigate("/shop");
  };
  const [reload, { data: db, isError, isLoading }] = useLoggedInMutation();
  //const { data: user } = useSelector((s) => s.userSlice);
  const dispatch = useDispatch();

  const reloadAgain = async () => {
    const t = localStorage.getItem("userId");
    const id = JSON.parse(t);

    await reload(id)
      .then((d) => {
        dispatch(
          userThunk({
            data: d.data,
          })
        );
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    const dataFunc = async () => {
      const t = localStorage.getItem("userId");
      const id = JSON.parse(t);

      await reload(id)
        .then((d) => {
          dispatch(
            userThunk({
              data: d.data,
            })
          );
        })
        .catch((e) => {
          console.log(e);
        });
    };
    dataFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <Loader />;
  console.log(db);
  if (isError || !db?.id)
    return (
      <div className="text-center text-2xl">
        Something went wrong
        <button
          onClick={() => reloadAgain()}
          className="text-[17px] bg-pink-800 px-3 text-white rounded-[2px] block my-10 m-auto"
        >
          Try Again
        </button>
      </div>
    );

  if (db?.firstName) {
    return (
      <>
        {!toggleOrderProfile && (
          <div>
            {db?.orders.length !== 0 && (
              <h1 className="text-center my-6 text-2xl lg:mb-10">
                Your Orders
              </h1>
            )}
            {db?.orders.length !== 0 && (
              <div className="w-full m-auto overflow-scroll lg:overflow-hidden">
                <table className="table-fixed lg:w-4/5 m-auto min-w-[700px] border-b-pink-800 border-solid border-b-4 pb-4">
                  <thead>
                    <tr className="mb-5">
                      <th className="w-1/4 text-start text-xl">OrderId </th>
                      <th className="w-1/4 text-start text-xl">Total </th>
                      <th className="w-1/4 text-start text-xl">Date</th>
                      <th className="w-1/4 text-start text-xl">Status</th>
                      <th className="w-1/4 text-start text-xl">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {db?.orders.map((order, index) => (
                      <>
                        <tr className={index % 2 === 0 ? "bg-gray-200" : ""}>
                          <td className="text-start lg:py-6 py-2 px-3 text-[1.2rem]">
                            {order.orderId}
                          </td>
                          <td className="text-start lg:py-6 py-2  text-[1.2rem]">
                            <FontAwesomeIcon icon={faNairaSign} />
                            <span className="text-[1.4rem]">
                              {totalAmount(order.orderList)}
                            </span>
                          </td>
                          <td className="text-start lg:py-6 py-2  text-[1.2rem]">
                            {newDate(
                              order.orderDate?.nanoseconds || order.orderDate
                            )}
                          </td>
                          <td className="text-start lg:py-6 py-2  text-[1.2rem]">
                            {order.orderStatus}
                          </td>
                          <td className="text-start lg:py-6 py-2  lg:text-[1.2rem] text-[0.9rem]">
                            <button
                              className="block  rounded-[0.5rem] py-1  px-3 text-white border-[1px] bg-pink-700"
                              onClick={() => {
                                navigate(
                                  `/nicro/${user}/profile/orders/${order.orderId}`
                                );
                              }}
                            >
                              {" "}
                              View Order
                            </button>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {db?.orders.length === 0 && (
              <h1 className="my-12 text-3xl pl-4">No Orders Available</h1>
            )}

            <div className="mt-5 text-pink-800 flex justify-between hover:cursor-pointer">
              <button onClick={gotToProfile}>
                <span className="mr-3">View Profile</span>
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
              <button onClick={gotoShop}>
                <span className="mr-3">keep Shopping</span>

                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
        )}
        {toggleOrderProfile && (
          <UserProfile shop={gotoShop} change={gotToOrder} />
        )}
      </>
    );
  }
};
export default UserOrders;
