import React from "react";
import SelectedListItem from "../global/ListMenu";

const items = [
  {
    label: "Información",
    icon: "Info",
    handle: "",
    link: "/",
  },
  {
    label: "Facturación",
    icon: "CreditCard",
    handle: "billing",
    link: "/billing",
  },
  {
    label: "Ajustes",
    icon: "Settings",
    link: "/settings",
    handle: "settings",
  },
];

const UserMenu = () => {
  return <SelectedListItem items={items} />;
};

export default UserMenu;
