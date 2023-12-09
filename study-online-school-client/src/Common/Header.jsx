import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { FaRegUserCircle } from "react-icons/fa";
import { BsPencilSquare, BsPersonCheck } from "react-icons/bs";
import { RiMenuSearchFill, RiLogoutBoxRLine } from "react-icons/ri";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { motion } from "framer-motion";

import {
  AiOutlineUserAdd,
  AiOutlineHome,
  AiOutlineWallet,
  AiOutlineUpload,
} from "react-icons/ai";
import { TbLogin } from "react-icons/tb";
import { useState } from "react";

const Header = () => {
  const { user, logoutUser } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        console.log("logout user");
        navigate("/login");
      })
      .catch();
  };

  return (
    <div className="navbar relative bg-base-100 p-5 container mx-auto">
      <div className="navbar-start ">
        <div className="cursor-pointer">
          {isMenuOpen ? (
            <MdOutlineRestaurantMenu
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-7 h-7 mr-2 lg:hidden "
            ></MdOutlineRestaurantMenu>
          ) : (
            <RiMenuSearchFill
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-7 h-7 mr-2 lg:hidden "
            ></RiMenuSearchFill>
          )}
        </div>
        <Link to={"/"}>
          <img
            className="w-24 lg:w-28 cursor-pointer"
            src="https://i.ibb.co/sym1F5T/logo.png"
            alt=""
          />
        </Link>

        {/*  mobile menu */}
        <div className="lg:hidden">
          <div
            className={
              isMenuOpen
                ? "absolute shadow-2xl top-20 left-0  z-50 duration-300"
                : "absolute -top-96 "
            }
          >
            <div className="bg-white text-stBlack space-y-5 py-5 w-full">
              <p className=" p-2 ">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? " py-2 px-3 rounded-md bg-stSecondary hover:bg-stPrimary text-white"
                      : "hover:bg-gray-500 p-2 rounded-md"
                  }
                  to={"/"}
                >
                  <AiOutlineHome className="inline" /> Home
                </NavLink>
              </p>
              <p className=" p-2">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "py-2 px-3 rounded-md bg-stSecondary hover:bg-stPrimary text-white "
                      : "hover:bg-gray-500 p-2 rounded-md"
                  }
                  to={"/all-assignment"}
                >
                  <AiOutlineWallet className="inline" /> All Assignments
                </NavLink>
              </p>
              <p className=" p-2">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "py-2 px-3 rounded-md bg-stSecondary hover:bg-stPrimary text-white "
                      : "hover:bg-gray-500 p-2 rounded-md"
                  }
                  to={"/create-assignment"}
                >
                  <BsPencilSquare className="inline" /> Create Assignment
                </NavLink>
              </p>
              <p className=" p-2">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "py-2 px-3 rounded-md bg-stSecondary hover:bg-stPrimary text-white "
                      : "hover:bg-gray-500 p-2 rounded-md"
                  }
                  to={"/submitted-assignment"}
                >
                  <AiOutlineUpload className="inline" /> Submitted Assignment
                </NavLink>
              </p>

              {!user && (
                <div className="flex items-center justify-center gap-2 mx-1">
                  <p className="flex justify-center items-center hover:bg-stGray hover:text-white rounded-md py-1 px-2">
                    <Link to={"/register"}>Register</Link>
                    <AiOutlineUserAdd />
                  </p>
                  <p className="h-3 w-1 bg-stBlack"></p>
                  <p className="flex justify-center items-center hover:bg-stGray hover:text-white rounded-md py-1 px-2">
                    <Link to={"/login"}>Login</Link>
                    <TbLogin />
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* desktop menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-5">
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? " py-2 px-3 font-semibold rounded-md underline bg-stSecondary hover:bg-stPrimary text-white"
                  : "hover:bg-gray-500 p-2 font-semibold rounded-md"
              }
              to={"/"}
            >
              <AiOutlineHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "py-2 px-3 font-semibold rounded-md bg-stSecondary hover:bg-stPrimary text-white "
                  : "hover:bg-gray-500 font-semibold p-2 rounded-md"
              }
              to={"/all-assignment"}
            >
              <AiOutlineWallet /> All Assignments
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "py-2 px-3 font-semibold rounded-md bg-stSecondary hover:bg-stPrimary text-white "
                  : "hover:bg-gray-500 p-2 font-semibold rounded-md"
              }
              to={"/create-assignment"}
            >
              <BsPencilSquare /> Create Assignment
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "py-y px-3 font-semibold rounded-md bg-stSecondary hover:bg-stPrimary text-white "
                  : "hover:bg-gray-500 p-2 font-semibold rounded-md"
              }
              to={"/submitted-assignment"}
            >
              <AiOutlineUpload /> Submitted Assignment
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {!user && (
          <ul className="flex items-center justify-center gap-2 mx-1">
            <li className="flex justify-center items-center hover:bg-stGray hover:text-white rounded-md py-1 px-2">
              <Link to={"/register"}>Register</Link>
              <AiOutlineUserAdd />
            </li>
            <p className="h-3 w-1 bg-stBlack"></p>
            <li className="flex justify-center items-center hover:bg-stGray hover:text-white rounded-md py-1 px-2">
              <Link to={"/login"}>Login</Link>
              <TbLogin />
            </li>
          </ul>
        )}
        {user && (
          <>
            <div onClick={toggleDropdown} className="cursor-pointer">
              {user?.photoURL ? (
                <img
                  className="w-10 h-10 p-1 mx-1 hover:ring-stPrimary rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                  src={user?.photoURL}
                  alt=""
                />
              ) : (
                <FaRegUserCircle />
              )}
            </div>
          </>
        )}
        {/* user info  */}
        {user && (
          <div
            className={
              !isDropdownOpen
                ? "hidden"
                : " flex absolute z-50 top-20 right-1  bg-white duration-500 shadow-2xl border-2 border-stGray"
            }
            id="user-dropdown"
          >
            <div className="text-center">
              <div className="px-4 py-3 ">
                <img
                  className="w-12 h-12 block mx-auto p-2 mb-2  hover:ring-stPrimary rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                  src={user?.photoURL}
                  alt=""
                />
                <span className="block text-sm text-gray-900 dark:text-white">
                  {user && user?.displayName}
                </span>
                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                  {user && user?.email}
                </span>
              </div>
              <div className="divider w-4/5 mx-auto"></div>
              <div
                className="py-3 space-y-4"
                aria-labelledby="user-menu-button"
              >
                <p className=" p-2">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "py-2 px-3 rounded-md bg-stSecondary hover:bg-stPrimary text-white "
                        : "hover:bg-gray-500 p-2 font-semibold rounded-md"
                    }
                    to={"/my-assignment"}
                  >
                    <BsPersonCheck className="inline" /> My Assignment
                  </NavLink>
                </p>

                <button onClick={handleLogout}>
                  <Link className="bg-red-500 text-white hover:bg-stPrimary font-semibold   hover:text-white p-3 rounded-md">
                    {" "}
                    <RiLogoutBoxRLine className="inline" /> Logout
                  </Link>
                </button>
                <br />
                <br />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
