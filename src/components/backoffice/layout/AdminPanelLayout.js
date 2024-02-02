import { Outlet, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { ToastContainer } from "react-toastify";
import Cookies from "universal-cookie";
import AdminPanelNav from "./AdminPanelNav";

function AdminPanelLayout() {
  const navListRef = useRef();
  const outletRef = useRef();

  const navigate = useNavigate();

  // Handling menu open and closing
  function handleHamburgerBtnClick() {
    // Nav is not showing - changes to show it and hide the outlet
    if (navListRef.current.classList.contains("hidden")) {
      navListRef.current.classList.remove("hidden");
      navListRef.current.classList.add("flex");
      outletRef.current.classList.add("hidden");
    }
    // Outlet is not showing - changes to show it and hide the nav
    else {
      navListRef.current.classList.add("hidden");
      navListRef.current.classList.remove("flex");
      outletRef.current.classList.remove("hidden");
    }
  }

  // Handling the log out
  function handleLogout() {
    const cookies = new Cookies();

    navListRef.current.classList.add("hidden");
    outletRef.current.classList.remove("hidden");

    cookies.remove("access_token");
    navigate("/");
  }

  // Handling each time an item in the nav is clicked
  function handleNavItemClick() {
    navListRef.current.classList.add("hidden");
    outletRef.current.classList.remove("hidden");
  }

  return (
    <section className="min-h-screen flex flex-col">
      <AdminPanelNav
        onHamburgerBtnClick={handleHamburgerBtnClick}
        navListRef={navListRef}
        onLogout={handleLogout}
        onNavItemClick={handleNavItemClick}
      />
      <div
        ref={outletRef}
        className="flex-auto md:ml-[275px] md:absolute md:top-0 outlet"
      >
        <Outlet />
      </div>

      <ToastContainer />
    </section>
  );
}

export default AdminPanelLayout;
