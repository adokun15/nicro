import ProductList from "./ProductList";
import { useGetCategoryQuery } from "../store/ProductsSlice";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Loader from "./Loader";

const ProductCategory = () => {
  const { data, isError, error, isFetching, isLoading, refetch } =
    useGetCategoryQuery({
      fixedCacheKey: "category",
    });

  if (isLoading || isFetching) return <Loader />;
  if (isError) return <div>{error?.messsage || "SomeThing Went Wrong"}</div>;
  if (data.length === 0)
    return (
      <div className="text-4xl text-center my-10">
        <h1>No Products Available at the Moment</h1>
        <button
          onClick={() => refetch()}
          className="text-[17px] bg-pink-800 px-3 text-white rounded-[2px] block my-10 m-auto"
        >
          Try Again
        </button>
      </div>
    );

  return (
    <>
      {data &&
        data.length >= 1 &&
        data.map((product) => (
          <main
            key={product.id}
            className="min-h-[10rem]  lg:w-4/5 w-full m-auto px-4 py-2 my-5"
          >
            <p className="text-[1.3rem]  border-b-2 border-pink-800 flex justify-between border-solid items-center font-medium mb-4">
              <span>{product.categoryName}</span>
              <Link
                className="text-black hover:text-pink-800  block italic text-[0.9rem] "
                to={`/shop/${product.categoryName}`}
              >
                <span className="mr-2">View all</span>
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </p>
            <ProductList
              allCate={data}
              cate={product.categoryName}
              items={product.items.filter((__, i) => i <= 3)}
            />
          </main>
        ))}
      {!data && <p>No Product</p>}
    </>
  );
};
export default ProductCategory;
