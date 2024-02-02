import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function DeleteIcon({ onClick }) {
  return (
    <FontAwesomeIcon
      icon={faTrash}
      className="text-red-600 hover:text-red-700 text-xl cursor-pointer"
      onClick={onClick}
    />
  );
}

export default DeleteIcon;
