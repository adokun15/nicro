import { useSelector } from "react-redux";

const Wrapper = ({ children, cls }) => {
  const { modalAuth, modalToggle } = useSelector((s) => s.uiSlice);

  return (
    <main className={`${cls} ${modalAuth || modalToggle ? "z-30" : ""}`}>
      {children}
    </main>
  );
};
export default Wrapper;
