import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import { useState } from "react";

function Header() {
  const darkMode = true;

  return (
    <Navbar fluid rounded className="border-b-2  p-4">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-2 bg-gradient-to-r from-rose-500 via-amber-500 to-pink-500 rounded-xl text-gray-100 text-2xl">
          Naveen's
        </span>
        <span className="px-1">Blog</span>
      </Link>
      <form className="hidden md:block lg:block">
        <TextInput
          type="text"
          placeholder="Search blogs..."
          rightIcon={AiOutlineSearch}
        />
      </form>

      <Button
        className="w-12
       h-10 lg:hidden md:hidden "
        color="gray"
        pill
      >
        <AiOutlineSearch />
      </Button>

      <div className="flex gap-2 md:order-2">
        <Button
          className="w-12
         h-10 hidden sm:inline"
          color="gray"
          pill
        >
          {darkMode ? <FaMoon /> : <FaSun />}
        </Button>

        <Link to="/auth.signin">
          <Button className="" color="gray" pill>
            Sign In
          </Button>
        </Link>
      </div>

      {/* <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
       
      </div> */}
      <Navbar.Toggle />
      <Navbar.Collapse className="">
        <NavLink
          className={({ isActive }) =>
            isActive ? "rounded-lg text-slate-500 font-semibold " : ""
          }
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "rounded-lg text-slate-500 font-semibold " : ""
          }
          to="/about"
        >
          About
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "rounded-lg text-slate-500 font-semibold " : ""
          }
          to="/project"
        >
          Projects
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "rounded-lg text-slate-500 font-semibold " : ""
          }
          to="/contact"
        >
          Contact
        </NavLink>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
