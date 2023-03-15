import React from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

import logo from "../assets/logo.png";

const NavBarItem = ({ title, classprops }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);

  return (
    <nav className="flex justify-around">
      <div className="mt-6">
        <img src={logo} alt="logo" className="w-32 cursor-pointer" />
      </div>
      <ul className="text-white flex gap-x-10 font-semibold text-lg mt-6">
        <li className="">Market</li>
        <li className="">Exchange</li>
        <li className="">Tutorials </li>
        <li className="">Wallets</li>
        <li className=" bg-blue-600 p-2 px-8 rounded-3xl -mt-2 cursor-pointer ">Login</li>
      </ul>
    </nav>
  );
};

export default Navbar;
