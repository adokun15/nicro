import { useRef, useState } from "react";

const Contact = () => {
  const [NameRef, setName] = useState("");
  const [BodyRef, setBody] = useState("");
  const [EmailRef, setEmail] = useState("");

  const clearInput = () => {
    setBody("");
    setEmail("");
    setName("");
  };
  return (
    <section className="min-h-[80vh] my-10 lg:px-[10rem] px-[0.5rem]">
      <h1 className="text-5xl text-pink-700 text-center lg:text-start">
        Contact Us
      </h1>
      <p className="mt-5 mb-3 italic text-center">
        Tell us what you want, discuss with Us.{" "}
      </p>
      <form className="min-h-[30vh] w-[90%] lg:w-[60%] gap-4 block lg:grid lg:grid-cols-2  m-auto  mb-10">
        <input
          className="block w-full m-auto mb-6 hover:shadow-xl outline-none transition-all hover:border-pink-900 lg:m-0 shadow px-3 py-3 border-pink-800 border-solid border-[1px]  "
          placeholder="Enter your Name"
          value={NameRef}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="block w-full m-auto lg:m-0 hover:shadow-xl outline-none hover:border-pink-900 transition-all shadow px-3 py-3 border-pink-800 border-solid border-[1px] mb-6"
          required
          placeholder="Enter your Email"
          value={EmailRef}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          required
          placeholder="Enter Message"
          value={BodyRef}
          onChange={(e) => setBody(e.target.value)}
          className="block w-full m-auto col-span-3 hover:border-pink-900 outline-none hover:shadow-xl transition-all shadow px-3 py-3 border-pink-800 border-solid border-[1px] min-h-[10rem] resize-none"
        ></textarea>
      </form>

      <button
        onClick={clearInput}
        className="block w-[30%] rounded-[1rem] text-[1.3rem] m-auto px-3 text-white mt-5 py-1 border-[1px] bg-pink-700"
      >
        Send
      </button>
      <div className="w-full">
        <h2 className="text-center">or</h2>
        <a
          href={`mailto:amosdaniel2005@gmail.com?subject=Nicro Electronic Customer`}
          className="text-center block text-pink-800 underline"
        >
          Email me
        </a>
      </div>
    </section>
  );
};
export default Contact;
