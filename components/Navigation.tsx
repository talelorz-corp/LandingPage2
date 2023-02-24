import React from "react";
import { HomeIcon, PlusIcon, UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

function Navigation() {
  const Menus = [
    { name: "Home", icon: <HomeIcon />, dis: "translate-x-0", url: "/index" },
    {
      name: "Add",
      icon: <PlusIcon />,
      dis: "translate-x-32",
      url: "/streamNovel",
    },
    {
      name: "Profile",
      icon: <UserIcon />,
      dis: "translate-x-64",
      url: "explore",
    },
  ];
  return (
    <nav className="bg-white px-6 rounded-t-xl max-h-36 w-full border-4 border-black">
      <ul className="relative justify-center w-full grid grid-cols-3">
        {Menus.map((menu, i) => (
          <li
            key={i}
            className="relative border-gray-900 place-items-center justify-center w-full"
          >
            <Link href={menu.url}>
              <a className="flex flex-col border-4 text-center items-center pt-6 w-full cursor-pointer">
                <div className="items-center text-xl place-self-center w-12">
                  <div>{menu.icon}</div>
                </div>
                <span>{menu.name}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
