import { Link } from "react-router-dom";
import Logo from "../Logo";

function MobileNav({ nav, navItems }) {
  return (
    <ul
      className={
        nav
          ? "fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-blue-900 bg-blue-700 ease-in-out duration-500"
          : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
      }
    >
      {/* Mobile Logo */}
      <Logo className="m-4" />

      {/* Mobile Navigation Items */}
      {navItems.map((item) => (
        <Link key={item.id} to={item.to}>
          <li
            key={item.id}
            className="p-4 border-b rounded-xl hover:bg-white duration-300 hover:text-blue-900 cursor-pointer border-blue-600 text-lg"
          >
            {item.text}
          </li>
        </Link>
      ))}
    </ul>
  );
}

export default MobileNav;
