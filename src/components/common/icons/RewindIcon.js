import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function RewindIcon({ disabled, onClick }) {
  return (
    <FontAwesomeIcon
      title="Back to original"
      icon={faClockRotateLeft}
      className={`text-lg ml-4 cursor-pointer ${disabled && "disabled"}`}
      onClick={onClick}
    />
  );
}

export default RewindIcon;
