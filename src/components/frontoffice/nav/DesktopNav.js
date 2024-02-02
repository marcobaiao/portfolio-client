import { Link } from "react-router-dom";

function DesktopNav({ navItems }) {
  return (
    <ul className="hidden md:flex">
      {navItems.map((item) => (
        <Link key={item.id} to={item.to}>
          <li
            key={item.id}
            className="p-4 hover:bg-white rounded-xl m-2 cursor-pointer duration-300 hover:text-blue-900 text-lg"
          >
            {item.text}
          </li>
        </Link>
      ))}
    </ul>
  );
}

export default DesktopNav;
