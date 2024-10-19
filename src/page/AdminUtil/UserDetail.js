import { useGetOneUserQuery } from "../../store/AuthSlice";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../component/Loader";

const UserDetail = () => {
  const { userId, user } = useParams();
  //const t = localStorage.getItem("userId");
  //const id = userId || JSON.parse(t);

  const { data: db, error, isError, isLoading } = useGetOneUserQuery(userId);

  //const { data: user } = useSelector((s) => s.userSlice);
  const navigate = useNavigate();

  if (isLoading) return <Loader />;

  //console.log(db);

  if (isError || !db?.id)
    return (
      <div className="text-center text-2xl">
        <h1>{error?.message || "Something went wrong"}</h1>
        <button
          className="text-[17px] bg-pink-800 px-3 text-white rounded-[2px] block my-10 m-auto"
          onClick={() => navigate("..")}
        >
          Go Back
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
            placeholder={db?.firstName}
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
                placeholder={db?.orders.length}
              />
            </>
          )}
        </article>
        <button
          onClick={() => navigate(`/nicro/${user}/admin`)}
          className="bg-pink-800 px-3 py-1 block my-8 w-fit m-auto text-white rounded-[3px] transition-all hover:bg-pink-900 "
        >
          Go Back
        </button>
      </main>
    );
};
export default UserDetail;
