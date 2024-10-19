import { useState } from "react";

const reviews = [
  {
    head: "Best financial decision ever!",
    text: "  Lorem ipsum dolor sit, amet consectetur adipisicing elitAccusantium quas quisquam non? Quas voluptate nulla minim deleniti optio ullam nesciunt, numquam corporis et asperiores",
    author: "Uche Augustine",
    location: "Lagos, NG",
  },
  {
    head: "Best financial decision ever!",
    text: "Quisquam itaque deserunt ullam, quia ea repellendus provident,ducimus neque ipsam modi voluptatibus doloremque, corrupti laborum. Incidunt numquam perferendis veritatis neque repellendus. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illodeserunt exercitationem deleniti",
    author: " Dami JolaOluwa",
    location: "Ibadan, NG",
  },
  {
    head: "Best financial decision ever!",
    text: "Debitis, nihil sit minus suscipit magni aperiam vel tenetur incidunt commodi architecto numquam omnis nulla autem necessitatibus blanditiis modi similique quidem. Odio aliquam culpa dicta beatae quod maiores ipsa minus consequatur error sunt, deleniti saepe aliquid quos inventore sequi. Necessitatibus id alias reiciendis, perferendis facere.",
    author: "Bright Iheagwam",
    location: "Port Harcourt, NG",
  },
];

const Testimonial = () => {
  const [curSlide, setCurrentSlide] = useState(0);
  const maxSlide = reviews.length;

  const nextSlide = function () {
    setCurrentSlide(curSlide === maxSlide - 1 ? 0 : curSlide + 1);
  };

  const prevSlide = function () {
    setCurrentSlide(curSlide === 0 ? maxSlide - 1 : 0);
  };
  return (
    <section className="min-h-[70vh] my-10 lg:px-[10rem]  pb-[8rem] pt-[3rem]">
      <h1 className="text-5xl text-center lg:text-start my-1 lg:m-0  text-pink-700">
        Reviews
      </h1>

      <div className="max-w-[80rem] h-[25rem] lg:h-[20rem] mx-[0] my-[auto] relative overflow-hidden py-[10rem]">
        {reviews.map((review, index) => (
          <div
            key={index}
            className={` ${
              index === curSlide
                ? "opacity-100 ease-out  duration-[1s] transition scale-1"
                : `opacity-0 ease-in duration-[1s] transition `
            }  absolute top-0 w-full h-[20rem]  flex items-center justify-center `}
          >
            {index === curSlide && (
              <div className="lg:w-[65%] w-[90%] relative">
                <h5 className="lg:text-[1.3rem] text-[1rem] text-center lg:text-start font-medium mb-5">
                  {review.head}
                </h5>
                <blockquote className="text-[#666] lg:text-[1rem]  text-[0.9rem] mb-[1.5rem]">
                  {review.text}
                </blockquote>
                <address className="ml-3rem grid grid-col-[6.5rem 1fr] cols-gap-2rem">
                  <h6>{review.author}</h6>
                  <p>{review.location}</p>
                </address>
              </div>
            )}
          </div>
        ))}

        <button
          className="-bottom-5  absolute outline-none lg:top-[50%] z-10 border-none bg-[ rgba(255, 255, 255, 0.7)] text-[#333] rounded-[50%] h-[5.5rem] w-[5.5rem] text-[3.25rem] cursor-pointer  transform: translate(-50%, -50%) left-[6%]"
          onClick={prevSlide}
        >
          &larr;
        </button>
        <button
          className="-bottom-5  absolute outline-none  lg:top-[50%] z-10 border-none bg-[ rgba(255, 255, 255, 0.7)] text-[#333] rounded-[50%] h-[5.5rem] w-[5.5rem] text-[3.25rem] cursor-pointer  transform: translate(50%, -50%) right-[6%]"
          onClick={nextSlide}
        >
          &rarr;
        </button>
      </div>
    </section>
  );
};

export default Testimonial;
