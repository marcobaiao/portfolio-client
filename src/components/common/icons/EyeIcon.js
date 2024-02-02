import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

function EyeIcon({ onClick }) {
  return (
    <FontAwesomeIcon
      icon={faEye}
      className="text-primary hover:text-primary-hovered text-xl mr-3 cursor-pointer"
      onClick={onClick}
    />
  );
}

export default EyeIcon;
