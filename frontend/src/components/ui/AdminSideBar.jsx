import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { signOutSuccess } from "../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  HiAnnotation,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";

function AdminSideBar() {
  const location = useLocation();
  const [tab, setTab] = useState();
  const [isActive, setIsActive] = useState(true);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");

    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/users/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.success === true) {
        dispatch(signOutSuccess());
      } else {
        toast.error("Could not sign out");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="md:h-[calc(100vh-2rem)] w-full md:max-w-[40rem] p-4 shadow-xl shadow-blue-gray-900/5 dark:bg-[#1E1E1E] dark:text-gray-300">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Sidebar
        </Typography>
      </div>
      <List>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 1 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader
              onClick={() => handleOpen(1)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Dashboard
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1 dark:text-gray-300">
            <List className="p-0">
              {currentUser.isAdmin && (
                <Link to="/dashboard?tab=posts">
                  <ListItem
                    className={` ${
                      isActive && tab === "posts"
                        ? "bg-gray-100 dark:bg-black/40"
                        : ""
                    }`}
                    selected={tab === "posts"}
                    onClick={() => {
                      setTab("posts");
                      setIsActive(true);
                    }}
                  >
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    <ListItemPrefix>
                      <HiDocumentText className="h-5 w-5" />
                    </ListItemPrefix>
                    All Posts
                  </ListItem>
                </Link>
              )}
              {currentUser.isAdmin && (
                <Link to="/dashboard?tab=users">
                  <ListItem
                    className={` ${
                      isActive && tab === "users"
                        ? "bg-gray-100 dark:bg-black/40"
                        : ""
                    }`}
                    selected={tab === "users"}
                    onClick={() => {
                      setTab("users");
                      setIsActive(true);
                    }}
                  >
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    <ListItemPrefix>
                      <HiOutlineUserGroup className="h-5 w-5" />
                    </ListItemPrefix>
                    All Users
                  </ListItem>
                </Link>
              )}
              {currentUser.isAdmin && (
                <Link to="/dashboard?tab=comments">
                  <ListItem
                    className={` ${
                      isActive && tab === "comments"
                        ? "bg-gray-100 dark:bg-black/40"
                        : ""
                    }`}
                    selected={tab === "comments"}
                    onClick={() => {
                      setTab("comments");
                      setIsActive(true);
                    }}
                  >
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    <ListItemPrefix>
                      <HiAnnotation className="h-5 w-5" />
                    </ListItemPrefix>
                    All Comments
                  </ListItem>
                </Link>
              )}
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 2 ? "rotate-180" : ""
              }`}
            />
          }
        ></Accordion>
        <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Inbox
          <ListItemSuffix>
            <Chip
              value="14"
              size="sm"
              variant="ghost"
              color="blue-gray"
              className="rounded-full"
            />
          </ListItemSuffix>
        </ListItem>
        <Link to="/dashboard?tab=profile">
          <ListItem
            className={` ${
              isActive && tab === "profile"
                ? "bg-gray-100 dark:bg-black/40"
                : ""
            }`}
            selected={tab === "profile"}
            onClick={() => {
              setTab("profile");
              setIsActive(true);
            }}
          >
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Profile
            <ListItemSuffix>
              <Chip
                value={currentUser.isAdmin ? "Admin" : "User"}
                vairant="outline"
                color="blue"
              />
            </ListItemSuffix>
          </ListItem>
        </Link>

        <ListItem onClick={handleSignOut}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Sign Out
        </ListItem>
      </List>
    </Card>
  );
}

export default AdminSideBar;
