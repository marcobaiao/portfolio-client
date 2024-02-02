import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import NavHamburgerIcon from "../NavHamburgerIcon";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import Logo from "../Logo";

// Array containing navigation items
const navItems = [
  { id: 3, text: "Projects", to: "/projects" },
  { id: 4, text: "Blog", to: "/blog" },
];

const Navbar = () => {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div>
      <div className="fixed top-0 w-full z-10 bg-blue-800 flex justify-between items-center h-20 px-4 text-white">
        {/* Logo */}
        <Link to="/">
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <DesktopNav navItems={navItems} />

        {/* Mobile Navigation Icon */}
        <NavHamburgerIcon onClick={handleNav} nav={nav} />

        {/* Mobile Navigation Menu */}
        <MobileNav nav={nav} navItems={navItems} />
      </div>

      <div className="absolute top-24 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Navbar;
