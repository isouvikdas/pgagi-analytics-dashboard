import React from "react";
import { TiWeatherWindyCloudy } from "react-icons/ti";
import { IoNewspaper, IoLogOut } from "react-icons/io5";
import { RiReactjsLine, RiStockFill } from "react-icons/ri";

export default function Navbar() {
  return (
    <div className="flex flex-col w-25 dark:bg-gray-800 dark:text-gray-400 bg-gray-200 text-gray-600 rounded-3xl shadow-lg">
      <nav className="flex flex-col items-center py-6 space-y-6">
        {/* Logo Section */}
        <div className="flex flex-col mb-10 items-center p-2 rounded-lg">
          <div className="text-3xl text-blue-500">
            <RiReactjsLine />
          </div>
        </div>
        {/* Sidebar Items */}
        <SidebarItem icon={<TiWeatherWindyCloudy />} label="Weather" active />
        <SidebarItem icon={<IoNewspaper />} label="News" />
        <SidebarItem icon={<RiStockFill />} label="Market" />
      </nav>
    </div>
  );
}

function SidebarItem({ icon, label, active }) {
  return (
    <div
      className={`flex flex-col items-center w-full gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-300 ${
        active
          ? "bg-blue-500 text-white shadow-md"
          : "hover:bg-blue-400 hover:text-white"
      }`}
    >
      <div className="text-2xl">{icon}</div>
      <span className="text-xs font-medium">{label}</span>
    </div>
  );
}
