import { Link } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faLaptop, faTv } from "@fortawesome/free-solid-svg-icons";

const CategorySection = () => {
  const categoeyItems = [
    {
      type: "Tvs",
      img: faTv,
    },
    {
      type: "Computers",
      img: faLaptop,
    },
    {
      type: "Cameras",
      img: faCamera,
    },
  ];
  return (
    <section className="min-h-[100vh] my-10 block justify-between lg:px-[10rem] py-[5rem]">
      <h1 className="text-5xl text-pink-700 mb-10 lg:text-start text-center">
        Categories
      </h1>
      <p className="my-8 lg:text-start text-center italic">
        Here is some of our products
      </p>
      <ul className="lg:pl-5 lg:pr-0 px-4 grid gap-5 lg:grid-cols-3 grid-cols-1 my-10">
        {categoeyItems.map((cate) => (
          <li key={cate.type} className="text-black my-4 rounded-xl">
            <div>
              {cate.img && (
                <div className="block w-full text-8xl  text-center">
                  <FontAwesomeIcon icon={cate.img} />
                </div>
              )}
            </div>
            {cate.img && (
              <Link
                to={`/shop/${cate.type}`}
                className="underline block mt-2 rounded-[3px] text-xl font-medium pt-3 py-2 italic text-center hover:text-pink-800 transition-all "
              >
                {cate.type}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};
export default CategorySection;
