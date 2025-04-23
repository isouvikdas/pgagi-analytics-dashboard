import React from "react";
import { BsMoonStarsFill } from "react-icons/bs";
import { MdSunny } from "react-icons/md";

export default function Temperature({ weatherData, city }) {
  if (!weatherData) {
    return (
      <div className="flex flex-row-full justify-center items-center h-60 mx-15 my-10">
        <div className=" text-1xl text-center text-gray-500">
          No weather data available. Search for a city to see the weather.
        </div>
      </div>
    );
  }

  const { temperature2m, precipitation, isDay } = weatherData.current;

  return (
    <div className="flex flex-row-full h-60 mx-15 my-10">
      <div className="flex flex-col h-full w-[60%] justify-between">
        <div>
          <div className="flex text-4xl font-bold dark:text-gray-200 text-gray-950">
            {/* {weatherData.city} */} {city}
          </div>
          <div className="text-1xl dark:text-gray-400 text-gray-600">
            Chances of rain: {precipitation}%
          </div>
        </div>
        <div className="text-5xl font-extrabold dark:text-gray-200 text-gray-950">
          {temperature2m}°
        </div>
      </div>
      <div className="flex flex-col h-full w-full justify-center items-end">
        {isDay ? (
          <div className="text-9xl  dark:text-yellow-300 text-yellow-300">
            <MdSunny />
          </div>
        ) : (
          <div className="text-9xl  dark:text-gray-600 text-gray-800">
            <BsMoonStarsFill />
          </div>
        )}
      </div>
    </div>
  );
}
