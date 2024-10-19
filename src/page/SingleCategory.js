import { Link, useParams } from "react-router-dom";
import ProductList from "../component/ProductList";
import { useGetCategoryQuery } from "../store/ProductsSlice";
import Wrapper from "./Wrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Loader from "../component/Loader";

const SingleCategory = () => {
  const { category } = useParams();

  const { data, isError, isFetching, isLoading, error, refetch } =
    useGetCategoryQuery();

  //console.log(data);
  if (isLoading || isFetching) return <Loader />;
  if (isError)
    return <div>{error?.message || error?.code || "Something Went Wrong"}</div>;
  if (data.length === 0 || !data)
    return (
      <div className="text-4xl text-center my-10">
        No Products Available at the Moment
        <button onClick={() => refetch()} className="text-black block text-2xl">
          Try Again
        </button>
      </div>
    );

  const list = data.find((doc) => (doc.categoryName === category ? doc : null));

  if (data.length !== 0 || data)
    return (
      <Wrapper cls="px-10">
        <h1 className="text-2xl text-center my-6 text-pink-800">
          {category ? category : "Shop"}
        </h1>
        <p className="text-[1.3rem]  px-3 lg:px-6 flex justify-between items-center border-b-2 border-pink-800 border-soid font-medium mb-4">
          <Link
            className="text-black hover:text-pink-800 block italic text-[0.9rem]"
            to={`/shop`}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span className="ml-2">keep shopping</span>
          </Link>
          <Link
            className="text-black hover:text-pink-800 block italic text-[0.9rem]"
            to={`/cart`}
          >
            <span className="mr-2">Your Cart</span>
            <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </p>

        <ProductList allCate={list} items={list.items} cate={category} />
      </Wrapper>
    );
};
export default SingleCategory;
/** <main className="px-10">
      <p className="text-[1.3rem]  border-b-2 border-pink-800 border-soid font-medium my-6">
        <Link className="text-pink-800 cursor-pointer" to="/shop">
          Shop
        </Link>{" "}
        {`>`} {category}
      </p>
      <ProductList items={list.items} />
    </main> */
