import { useNavigate } from "react-router-dom";
import bgImg from "../asset/leon-seibert-LGZFr5bUw7M-unsplash.jpg";
import AboutSection from "../component/About";
import CategorySection from "../component/CategorySection";
import Contact from "../component/Contact";
import Testimonial from "../component/testimonial";
const Home = () => {
  const navigate = useNavigate();
  const toShop = () => {
    navigate("/shop");
  };
  return (
    <>
      <section
        style={{
          background: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className={`flex items-center justify-between z-0  h-[85vh] `}
      >
        <div></div>
        <div className="h-full flex items-center px-10 leadings-5">
          <div>
            <h1 className="text-5xl">
              Your A-class <span className="text-pink-700">Electronic</span>{" "}
              Store
            </h1>
            <p className=" my-10">Buy your Electronic stuff here</p>
            <div>
              <button
                onClick={toShop}
                className="bg-pink-700 px-6 py-[0.1rem] mr-4 border-2 border-pink-700 cursor-pointer text-white text-[1.1rem] rounded-[0.8rem]"
              >
                Visit shop
              </button>
            </div>
          </div>
        </div>
      </section>
      <AboutSection />
      <CategorySection />
      <Testimonial />
      <Contact />
      <footer className="bg-pink-700 text-white flex justify-center w-full bottom-0 ">
        <p>Developed by &copy;Daniel Amos</p>
      </footer>
    </>
  );
};
export default Home;
