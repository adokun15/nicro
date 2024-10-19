//
import { Link, useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../store/ProductsSlice";
import { useEffect } from "react";
import ProductItem from "../component/ProductItem";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "../component/Loader";

const SingleProduct = () => {
  const { category, productId } = useParams();

  const {
    data: product,
    isError,
    isFetching,
    isLoading,
  } = useGetSingleProductQuery(productId);

  useEffect(() => console.log(product), [product]);

  if (isLoading || isFetching) return <Loader />;
  if (isError) return <div>{"SomeThing Went Wrong"}</div>;
  if (!product)
    return (
      <div className="text-4xl text-center my-10">
        <h1>This Product is not Available at the Moment</h1>
        <button className="text-[18px] bg-pink-800 px-3 text-white rounded-[2px] block my-10 m-auto">
          Try Again
        </button>
      </div>
    );
  //const list = data.find((doc) => (doc.categoryName === category ? doc : null));
  return (
    <main className="px-10">
      <h1 className="text-2xl text-center my-6 text-pink-800">
        {category ? category : "Shop"}{" "}
      </h1>
      <p className="text-[1.3rem]  flex justify-between items-center border-b-2 border-pink-800 border-soid font-medium mb-4">
        <Link
          className="text-black hover:text-pink-800 block italic text-[0.9rem] "
          to={`/shop`}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span className="mr-2"> Visit Shop</span>
        </Link>

        <Link
          className="text-black hover:text-pink-800 block italic text-[0.9rem] "
          to={`/shop/${category}`}
        >
          <span className="mr-2">View more</span>
          <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </p>
      <ProductItem item={product} />
    </main>
  );
};
export default SingleProduct;
