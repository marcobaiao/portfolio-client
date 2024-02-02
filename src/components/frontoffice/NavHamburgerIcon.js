import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

function NavHamburgerIcon({ onClick, nav }) {
  return (
    <div onClick={onClick} className="block md:hidden">
      {nav ? (
        <FontAwesomeIcon icon={faTimes} className="text-3xl cursor-pointer" />
      ) : (
        <FontAwesomeIcon icon={faBars} className="text-3xl cursor-pointer" />
      )}
    </div>
  );
}

export default NavHamburgerIcon;
