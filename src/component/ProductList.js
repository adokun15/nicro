import {
  faDeleteLeft,
  faEdit,
  faNairaSign,
  faRemove,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { UiActions } from "../store/uiActions";

const ProductList = ({ items, cate, loading }) => {
  const { category } = useParams;
  const { data: admin } = useSelector((s) => s.userSlice);
  const dispatch = useDispatch();

  const triggerModalEdit = (items) => {
    //  alert("edit");
    dispatch(
      UiActions.updateModalEdit({ bool: true, items: { ...items, cate } })
    );
  };

  const triggerModalDelete = (items) => {
    //alert("delete");
    dispatch(
      UiActions.updateModalDelete({ bool: true, items: { ...items, cate } })
    );
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <ul className="grid grid-cols-2 lg:grid-cols-4 items-center gap-4 py-5 min-h-[5rem]">
      {items &&
        items?.map((item) => (
          <div>
            <Link
              key={item?.id}
              className="block"
              to={`/shop/${cate || category}/${item.id}`}
            >
              <li className="w-full min-h-[20rem] ">
                <div className="lg:w-[80%] mb-5 w-full m-auto h-[80%]  ">
                  <img
                    src={item?.productImage}
                    className="w-full h-full"
                    alt={item?.id}
                  />
                </div>
                <div className="w-full mt-5 h-[20%]">
                  <h4 className="text-center my-2 lg:text-xl text-[0.8rem]">
                    {item?.name || "unlabelled"}
                  </h4>
                  <h4 className="text-center font-medium my-4 lg:text-xl text-[0.9rem]">
                    <FontAwesomeIcon icon={faNairaSign} />{" "}
                    {item?.price || "Untagged"}
                  </h4>
                </div>
              </li>
            </Link>
            <div className="flex w-full">
              {admin.isAdmin && (
                <button
                  onClick={() => triggerModalEdit(item)}
                  className="lg:bg-pink-800 px-8 py-1 m-auto block lg:text-white text-pink-800 rounded-[3px]"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              )}
              {admin.isAdmin && (
                <button
                  onClick={() => triggerModalDelete(item)}
                  className="lg:bg-pink-800 px-8 py-1 m-auto block lg:text-white rounded-[3px] text-pink-800 "
                >
                  <FontAwesomeIcon icon={faRemove} />
                </button>
              )}
            </div>
          </div>
        ))}
      {!items && <h3>No Products Available</h3>}
    </ul>
  );
};
export default ProductList;
