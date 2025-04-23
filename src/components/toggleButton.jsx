import React, { useEffect, useState } from "react";
import {
  MdLightMode,
  MdOutlineLight,
  MdOutlineLightMode,
} from "react-icons/md";

export default function ToggleButton() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true";
  });

  useEffect(() => {
    const body = document.body;
    if (isDarkMode) {
      body.classList.add("dark");
      console.log("Dark mode enabled");
    } else {
      body.classList.remove("dark");
      console.log("Light mode enabled");
    }

    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  const handleThemeChange = (event) => {
    setIsDarkMode(event.target.value === "dark");
  };

  return (
    <div
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="flex items-center justify-center w-13 h-13 rounded-full bg-gray-200 dark:bg-gray-800  focus:outline-none"
    >
      {isDarkMode ? (
        <MdLightMode className="text-2xl text-gray-200" />
      ) : (
        <MdLightMode className="text-2xl text-gray-800" />
      )}
    </div>
  );
}
