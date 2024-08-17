import React from "react";

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

const role = localStorage.getItem("role");

const getMenuItems = () => {
  if (role === "a") {
    throw new Error("Role not defined");
  }

  const menuItems = [];

  if (role === "admin") {
    menuItems.push({
      title: "Home",
      path: "/home",
      icon: <AiIcons.AiFillHome />,
      cName: "nav-text",
    });
    menuItems.push({
      title: "Users",
      path: "/useradmin",
      icon: <IoIcons.IoIosPaper />,
      cName: "nav-text",
    });
    menuItems.push({
      title: "Hotels",
      path: "/hoteladmin",
      icon: <FaIcons.FaCartPlus />,
      cName: "nav-text",
    });
    menuItems.push({
      title: "Places",
      path: "/placeadmin",
      icon: <IoIcons.IoMdPeople />,
      cName: "nav-text",
    });
    menuItems.push({
      title: "Packages",
      path: "/packageadmin",
      icon: <FaIcons.FaEnvelopeOpenText />,
      cName: "nav-text",
    });
  } else if (role === "tour_manager") {
    menuItems.push({
      title: "Home",
      path: "/home",
      icon: <AiIcons.AiFillHome />,
      cName: "nav-text",
    });
    menuItems.push({
      title: "Packages",
      path: "/packageadmin",
      icon: <FaIcons.FaEnvelopeOpenText />,
      cName: "nav-text",
    });
  } else if (role === "hotel_manager") {
    menuItems.push({
      title: "Home",
      path: "/home",
      icon: <AiIcons.AiFillHome />,
      cName: "nav-text",
    });
    menuItems.push({
      title: "Hotels",
      path: "/hoteladmin",
      icon: <FaIcons.FaCartPlus />,
      cName: "nav-text",
    });
  } else {
    console.log("Uanble to find role");
  }

  return menuItems;
};

export const SidebarData = getMenuItems();
