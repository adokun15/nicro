import { useEffect } from "react";
import { useLoggedInMutation } from "../../store/AuthSlice";
import { useDispatch } from "react-redux";
import { userThunk } from "../../store/SingleUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../component/Loader";

const UserProfile = ({ change, shop }) => {
  const [reload, { data: db, error, isError, isLoading }] =
    useLoggedInMutation();
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
              data: d.data || {},
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
        <h1>{error?.message || "Something went wrong"}</h1>
        <button
          className="text-[17px] bg-pink-800 px-3 text-white rounded-[2px] block my-10 m-auto"
          onClick={() => reloadAgain()}
        >
          Try Again
        </button>
      </div>
    );
  if (db?.firstName)
    return (
      <main>
        <article>
          <p className="font-medium my-5">FirstName</p>
          <input
            value={db?.firstName}
            disabled
            className="italic"
            placeholder={db.firstName}
          />
          <p className="font-medium my-5">LastName</p>
          <input
            value={db?.lastName}
            className="italic"
            disabled
            placeholder={db?.lastName}
          />

          <p className="font-medium my-5">Email</p>
          <input
            value={db?.email}
            className="italic"
            disabled
            placeholder={db?.email}
          />
          {db?.orders.length >= 1 && (
            <>
              <p className="font-medium my-5">Number of Orders Made</p>
              <input
                value={db?.orders.length}
                disabled
                className="italic"
                placeholder={db.orders.length}
              />
            </>
          )}
        </article>

        <div className="mt-5 text-pink-800 flex gap-8 hover:cursor-pointer">
          <button onClick={change}>
            <span className="mr-3">View Order(s)</span>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
          <button onClick={shop}>
            <span className="mr-3">keep Shopping</span>

            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </main>
    );
};
export default UserProfile;
