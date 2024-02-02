import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function EditIcon({ onClick }) {
  return (
    <FontAwesomeIcon
      icon={faEdit}
      className="text-gray-600 hover:text-gray-700 text-xl mr-3 cursor-pointer"
      onClick={onClick}
    />
  );
}

export default EditIcon;
