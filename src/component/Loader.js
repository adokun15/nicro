import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Loader = () => {
  return (
    <div className="flex h-[5rem] my-12 justify-center items-center">
      <span className="block text-3xl text-pink-800 motion-safe:animate-spin">
        <FontAwesomeIcon icon={faSpinner} />
      </span>
    </div>
  );
};
export default Loader;
