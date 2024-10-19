import img1 from "../asset/hellooodesign-rSpli1aeBZw-unsplash.jpg";
import img2 from "../asset/alvaro-bernal-wuVks6Ac-kA-unsplash.jpg";
import img3 from "../asset/carlos-lindner-53wcYH4IOig-unsplash.jpg";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="lg:h-[80vh] h-[58vh] my-10 flex transition-all py-12 justify-between lg:px-[10rem]"
    >
      <div className="lg:leading-[7rem] h-full leading-[3rem]">
        <h1 className="text-5xl text-pink-700 text-center mb-8 lg:text-start">
          About Us
        </h1>
        <p className="px-4 lg:px-1 text-center text-3xl mt-6 lg:m-0 items-center align-middle lg:text-[1.6rem] leading-[3.5rem]">
          Nicro is An Online{" "}
          <span className="text-pink-800 font-medium"> Electronic </span> store
          for those looking for best
          <span className="text-pink-800 font-medium"> of </span> the best
          electronics.
        </p>
      </div>
      <div className="lg:grid hidden max-w-[30%] grid-cols-2 grid-rows-2 h-[80%] gap-2 items-center pt-10">
        <img src={img1} alt={img1} className="rows-4" />
        <img src={img2} alt={img2} />
        <img src={img3} alt={img3} />
      </div>
    </section>
  );
};
export default AboutSection;
