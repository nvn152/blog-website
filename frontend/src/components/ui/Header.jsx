import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/theme/themeSlice";

// react icons
import { HiViewGrid, HiCog, HiCurrencyDollar, HiLogout } from "react-icons/hi";

function Header() {
  const {
    currentUser,
    isLoggedIn,
    error: serverError,
    loading,
  } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

  const dispatch = useDispatch();
  return (
    <Navbar fluid rounded className="border-b-2 dark:bg-[#1E1E1E] p-4">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-2 bg-gradient-to-r from-rose-500 via-amber-500 to-pink-500 rounded-xl text-gray-100 text-2xl">
          Naveen's
        </span>
        <span className="px-1">Blog</span>
      </Link>
      {/* <form className="hidden md:block lg:block">
        <TextInput
          type="text"
          placeholder="Search blogs..."
          rightIcon={AiOutlineSearch}
          className=""
        />
      </form> */}

      <div className="relative md:block lg:block lg:w-80 hidden ">
        <input
          type="text"
          // value={searchQuery}
          // onChange={handleChange}
          placeholder="Search Blogs..."
          className="w-full px-4 py-2 border border-gray-300 rounded-3xl border-none shadow-sm outline-none focus:border-gray-400 dark:bg-[#3f3f3f]"
        />
        <AiOutlineSearch className="absolute top-0 right-0 mt-3 mr-4 text-gray-400" />
      </div>

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
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </Button>

        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User image"
                img={currentUser.profilePicture}
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block truncate text-sm font-semibold">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item icon={HiViewGrid}>
              <Link to="/dashboard?tab=profile">Dashboard</Link>
            </Dropdown.Item>

            <Dropdown.Divider />
            <Dropdown.Item icon={HiLogout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/auth/sign-up">
            <Button className="outline-1 " color="gray" pill>
              Sign Up
            </Button>
          </Link>
        )}
      </div>
      <Navbar.Toggle />
      <Navbar.Collapse className="">
        <NavLink
          className={({ isActive }) =>
            isActive ? "rounded-lg text-slate-500 font-semibold  " : ""
          }
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "rounded-lg text-slate-500 font-semibold  " : ""
          }
          to="/about"
        >
          About
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "rounded-lg text-slate-500 font-semibold  " : ""
          }
          to="/project"
        >
          Projects
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "rounded-lg text-slate-500 font-semibold  " : ""
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
