import { useRef, useState } from "react";
import {
  useAddToCategoryProductsMutation,
  useGetCategoryQuery,
} from "../store/ProductsSlice";
import Loader from "../component/Loader";
import { useNavigate } from "react-router-dom";
const AddProductItem = () => {
  const [tempImage, setImage] = useState(null);

  const [id, setId] = useState(null);
  const [categoryId, setCategoryId] = useState(null);

  const navigate = useNavigate();
  //const [categoryObjs, setCategoryObjs] = useState([]);

  const itemNameRef = useRef();

  const itemPriceRef = useRef();
  const categoryRef = useRef();

  const {
    data,
    isLoading: productLoading,
    isError: productError,
  } = useGetCategoryQuery();
  const [addProduct, { isLoading, isSuccess, isError, error }] =
    useAddToCategoryProductsMutation();

  const fileChanges = (e) => {
    setId(Math.trunc(Math.random() * 10000000000));
    setImage(e.target.files[0]);
    setCategoryId(
      `${categoryRef.current.value}_${Math.trunc(Math.random() * 100000)}`
    );
  };
  const AddProducts = async () => {
    if (!tempImage || !id || !data) return;
    try {
      await addProduct({
        categoryId,
        productId: id,
        productImage: tempImage,
        categoryName: categoryRef.current.value,
        productName: itemNameRef.current.value,
        productPrice: itemPriceRef.current.value,
        prevCategory: data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (productLoading) return <Loader />;

  if (productError || !data || data.length === 0) {
    return (
      <main className="text-xl my-12">
        <h2 className="text-center text-2xl font-semibold">
          Something went Wrong
        </h2>
        <button
          className="text-[17px] bg-pink-800 px-6 py-2 text-white rounded-[2px] block my-10 m-auto"
          onClick={() => {
            navigate("/");
          }}
        >
          go home
        </button>
      </main>
    );
  }

  return (
    <div className="lg:w-3/5 w-[81%] m-auto block leading-5 min-h-[60vh]">
      <div>
        {isError ? error || error.message || "Something Went Wrong" : ""}
      </div>

      <div>
        <select
          className="border-pink-800 border-2 b py-1 px-3 my-3 text-xl w-4/5 border-solid outline-none "
          ref={categoryRef}
        >
          <option>Home Audio</option>
          <option>TVs</option>
          <option>Cameras</option>
          <option>Appliances</option>
          <option>Laptops</option>
          <option>Air Conditioner</option>
        </select>
      </div>
      <input
        className="block border-pink-800 border-2 w-4/5 border-solid text-xl py-1 px-3 my-6"
        placeholder="Enter Product Name"
        type="text"
        ref={itemNameRef}
      />
      <input
        className="block  border-2 w-4/5 border-pink-800 border-solid py-1 px-3 text-xl   my-6"
        placeholder="Enter Product Price"
        type="number"
        ref={itemPriceRef}
      />
      <input
        type="file"
        placeholder="Choose A file"
        accept="image/*"
        className="block  w-full py-1 px-3 mb-3"
        onChange={fileChanges}
      />
      <button
        disabled={isSuccess}
        className="bg-pink-800 my-8 px-8 py-1 text-white text-xl rounded-[0.8rem] transition-all hover:bg-pink-900 "
        onClick={AddProducts}
      >
        {isLoading ? <Loader /> : isSuccess ? "done" : "Save Item Detail"}
      </button>
    </div>
  );
};
export default AddProductItem;
