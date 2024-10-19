import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BtnLoader = () => {
  return (
    <span className="block text-white mx-8 text-[1.1rem] text-pink-800 motion-safe:animate-spin">
      <FontAwesomeIcon icon={faSpinner} />
    </span>
  );
};
export default BtnLoader;
