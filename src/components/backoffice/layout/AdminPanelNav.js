import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

function AdminPanelNav({
  onHamburgerBtnClick,
  navListRef,
  onLogout,
  onNavItemClick,
}) {
  const navItems = [
    {
      name: "General",
      to: "/admin/general",
    },
    { name: "Blog", to: "/admin/blog" },
    { name: "Post categories", to: "/admin/postCategories" },
    { name: "Projects", to: "/admin/projects" },
    { name: "Project categories", to: "/admin/projectCategories" },
  ];

  return (
    <div className="h-screen contents">
      <nav className="contents">
        <div className="flex items-center justify-between flex-initial p-5 bg-primary md:hidden">
          <h1 className="text-2xl font-semibold text-center text-white font-heading text-[2.5rem]">
            Admin Panel
          </h1>

          <FontAwesomeIcon
            icon={faBars}
            onClick={onHamburgerBtnClick}
            className="text-white text-3xl md:hidden cursor-pointer"
          />
        </div>

        <ul
          ref={navListRef}
          className="hidden absolute w-full h-screen p-5 flex-col items-center justify-center flex-auto bg-primary md:flex md:w-[275px] md:justify-start md:fixed"
        >
          <h1 className="absolute top-0 left-0 p-5 text-2xl font-semibold text-center text-white md:static md:mb-10 font-heading text-[2.5rem]">
            Admin Panel
          </h1>
          <FontAwesomeIcon
            icon={faTimes}
            className="absolute top-0 right-0 p-5 text-3xl text-white cursor-pointer md:hidden"
            onClick={onHamburgerBtnClick}
          />
          {navItems.map((item) => (
            <NavLink key={item.name} to={item.to} onClick={onNavItemClick}>
              <li className="admin-nav-item">{item.name}</li>
            </NavLink>
          ))}

          <li onClick={onLogout} className="admin-nav-item">
            Log out
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default AdminPanelNav;
