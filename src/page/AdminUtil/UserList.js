import { useNavigate } from "react-router-dom";
import Loader from "../../component/Loader";
import { useLoggedInMutation } from "../../store/AuthSlice";
import { userThunk } from "../../store/SingleUser";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserList = () => {
  const { data } = useSelector((s) => s.userSlice);
  const navigate = useNavigate();

  const newDate = (d) => {
    const date = new Date(d);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());

    return `${day} - ${month} - ${year}`;
  };
  const [reload, { data: db, isError, isLoading }] = useLoggedInMutation();
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
              data: d?.data,
            })
          );
        })
        .catch((e) => console.log(e));
    };
    dataFunc();
  }, []);

  if (isLoading) return <Loader />;

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

  //const peopleList = data?.users ? data?.users.reverse() : new Array(0);
  if (db) {
    return (
      <>
        <div>
          {data?.users.length !== 0 && (
            <h1 className="text-center my-6 text-2xl lg:mb-10">Nicro Users</h1>
          )}
          {data?.users.length !== 0 && (
            <div className="w-full m-auto overflow-scroll lg:overflow-hidden">
              <table className="table-fixed lg:w-4/5 m-auto min-w-[700px] border-b-pink-800 border-solid border-b-4 pb-4">
                <thead>
                  <tr className="mb-2">
                    <th className="w-1/4 text-start text-[12px]  lg:text-xl">
                      S/N{" "}
                    </th>
                    <th className="w-1/4 text-start text-[12px] lg:text-xl">
                      FullName{" "}
                    </th>
                    <th className="w-1/4 text-start text-[12px]  lg:text-xl">
                      Account Creation Date
                    </th>
                    <th className="w-1/4 text-center text-[12px] lg:text-xl">
                      Number of Order(s)
                    </th>
                    <th className="w-1/4 text-center text-[12px]  lg:text-xl">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.users.map((user, index) => (
                    <>
                      <tr className={index % 2 === 0 ? "bg-gray-200" : ""}>
                        <td className="text-start lg:py-6 py-2 px-3 text-[1.2rem]">
                          {index + 1}
                        </td>
                        <td className="text-start lg:py-6 py-2  text-[1.2rem]">
                          <span className="mr-1">{user.firstName}</span>
                          <span>{user.lastName}</span>
                        </td>
                        <td className="text-start lg:py-6 py-2  text-[1.2rem]">
                          {newDate(user?.createdOn)}
                        </td>
                        <td className=" lg:py-6 py-2  font-medium text-center text-[1.3rem]">
                          {user.orders.length}
                        </td>
                        <td className="text-start lg:py-6 py-2  lg:text-[1.2rem] text-[0.9rem]">
                          <button
                            className="block   m-auto w-fit rounded-[0.5rem] py-1  px-6 text-white border-[1px] bg-pink-700"
                            onClick={() => {
                              navigate(`${user?.id}`);
                            }}
                          >
                            View Info
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {data?.users.length === 0 && (
            <h1 className="my-12 text-3xl pl-4">No Users Available</h1>
          )}
        </div>
      </>
    );
  }
};
export default UserList;
