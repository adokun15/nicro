import { useSelector, useDispatch } from "react-redux";
import { UiActions } from "../store/uiActions";
import { useState } from "react";
import {
  useDeleteSingleProductMutation,
  useGetCategoryQuery,
  useGetSingleProductQuery,
  useUpdateSingleProductMutation,
} from "../store/ProductsSlice";
import BtnLoader from "./btnLoader";
import Loader from "./Loader";
const ModalCover = () => {
  const dispatch = useDispatch();
  const { modalDelete, modalEdit, currentItem } = useSelector((s) => s.uiSlice);
  const modalIsOpened = modalDelete || modalEdit;

  const {
    data,
    isError: productError,
    refetch,
  } = useGetCategoryQuery({
    fixedCacheKey: "category",
  });
  const [refetchEdit, { isLoading, isError, error, isSuccess }] =
    useUpdateSingleProductMutation();

  const [
    refetchDelete,
    {
      isLoading: deleteLoading,
      isError: isDeleteError,
      error: deleteError,
      isSuccess: deleteSuccess,
    },
  ] = useDeleteSingleProductMutation();
  const { data: product, isLoading: productLoading } = useGetSingleProductQuery(
    currentItem.id
  );

  const [nameValue, setNameValue] = useState("");
  const [priceValue, setPriceValue] = useState("");

  const toggleModal = () => {
    dispatch(UiActions.updateModalEdit({ bool: false }));
    dispatch(UiActions.updateModalDelete({ bool: false }));
  };

  const editItem = async () => {
    if (priceValue <= 1 || nameValue === "" || !product || !product.docID)
      return;

    await refetchEdit({
      allCate: data,
      productCategoryName: currentItem.cate,
      ProductDocid: product.docID,
      productId: currentItem.id,
      name: nameValue,
      price: +priceValue,
    }).catch((e) => console.log(e));
  };
  const deleteItem = async () => {
    if (!product || !product.docID) return;

    await refetchDelete({
      allCate: data,
      productCategoryName: currentItem.cate,
      ProductDocid: product.docID,
      productId: currentItem.id,
    }).catch((e) => console.log(e));
  };

  const reloadProduct = async () => {
    toggleModal();
    await refetch();
  };

  const BackDrop = () => {
    return (
      <main
        onClick={toggleModal}
        className={` z-[150] top-0 ${
          modalIsOpened ? "max-h-[100vh] h-[100vh] fixed" : "h-[100vh] fixed"
        } z-20 bg-[rgba(0,0,0,0.7)] w-full`}
      ></main>
    );
  };

  if (isError || productError || isDeleteError) {
    <div>
      <BackDrop />
      <div className="bg-white z-[170] w-4/5 block lg:w-2/5 fixed lg:left-[30%] py-4 px-5 lg:ml-0 ml-[5rem] top-[10vh] m-auto ">
        <h3 className="text-3xl mb-6">An Error Occurred</h3>
        <h2>
          {error?.message || deleteError?.message || "Something went wrong"}
        </h2>
        <button
          onClick={toggleModal}
          className="bg-pink-800 px-3 py-1 text-white  rounded-[3px] transition-all hover:bg-pink-900 "
        >
          Cancel
        </button>
      </div>
    </div>;
  }

  return (
    <div>
      {modalIsOpened && (
        <>
          <BackDrop />
          {modalEdit && (
            <div className="bg-white z-[170] w-full block lg:w-2/5 fixed lg:left-[30%] left-0 py-4 px-5 top-[10vh]">
              <h3 className="text-3xl mb-6">Edit this Product</h3>
              {!isSuccess && (
                <div>
                  {!productLoading && (
                    <form className="w-4/5 m-auto block leading-9">
                      <p className="text-red-600 my-1 text-center text-[20px]">
                        {(!product || !product.docID) && "something wrong went"}
                      </p>
                      <label className="block">Change Product Name</label>
                      <input
                        onChange={(e) => setNameValue(e.target.value)}
                        className="block bg-gray-200 px-2 py-1 w-full placeholder:text-black"
                        placeholder={currentItem?.name}
                        value={nameValue}
                        type="text"
                      />
                      <label className="block">Change Product Price</label>
                      <input
                        onChange={(e) => setPriceValue(e.target.value)}
                        className="block bg-gray-200 px-2 py-1 w-full placeholder:text-black"
                        placeholder={currentItem?.price}
                        value={priceValue}
                      />
                    </form>
                  )}
                  {productLoading && <Loader />}
                </div>
              )}
              {isSuccess && (
                <>
                  <div className="text-2xl text-center my-4">
                    This Product has been Updated Successfully
                  </div>
                  <button
                    className="bg-pink-800 disabled:opacity-80 px-3 py-1 text-white  rounded-[3px] transition-all hover:bg-pink-900 "
                    onClick={reloadProduct}
                  >
                    Update All Product
                  </button>
                </>
              )}

              <div className="items-center flex justify-end gap-4 my-7 pr-5">
                <button
                  onClick={toggleModal}
                  className="bg-pink-800 px-3 py-1 text-white  rounded-[3px] transition-all hover:bg-pink-900 "
                >
                  Cancel
                </button>
                <button
                  onClick={editItem}
                  disabled={isSuccess}
                  className="bg-pink-800 disabled:opacity-80 px-3 py-1 text-white  rounded-[3px] transition-all hover:bg-pink-900 "
                >
                  {isLoading ? <BtnLoader /> : "Save"}
                </button>
              </div>
            </div>
          )}
          {modalDelete && (
            <div className="bg-white z-[170] w-full block lg:w-2/5 fixed lg:left-[30%] left-0 py-4 px-5 top-[10vh]">
              <h3 className="text-3xl mb-6">Delete this Product</h3>

              {!deleteSuccess && (
                <div>
                  {!deleteLoading && (
                    <div className="w-4/5 m-auto block leading-9">
                      <p className="text-red-600 my-1 text-center text-[20px]">
                        {(!product || !product.docID) && "something wrong went"}
                      </p>
                      <label className="block my-4">
                        Are you Sure you want to delete this product ?
                      </label>
                      <p className="block bg-gray-200 px-2 py-1 w-full placeholder:text-black">
                        {currentItem?.name}
                      </p>
                    </div>
                  )}
                  {deleteLoading && <Loader />}
                </div>
              )}

              {deleteSuccess && (
                <>
                  <div className="text-2xl text-center my-4">
                    This Product has been Deleted Successfully
                  </div>
                  <button
                    className="bg-pink-800 disabled:opacity-80 px-3 py-1 text-white  rounded-[3px] transition-all hover:bg-pink-900 "
                    onClick={reloadProduct}
                  >
                    Update All Product
                  </button>
                </>
              )}

              <div className="items-center flex justify-end gap-4 my-7 pr-5">
                <button
                  onClick={toggleModal}
                  className="bg-pink-800 px-3 py-1 text-white  rounded-[3px] transition-all hover:bg-pink-900 "
                >
                  Cancel
                </button>
                <button
                  onClick={deleteItem}
                  className="bg-pink-800 px-3 py-1 text-white  rounded-[3px] transition-all hover:bg-pink-900 "
                >
                  {isLoading ? <BtnLoader /> : "Delete"}
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default ModalCover;
