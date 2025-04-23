import React from "react";
import { getWeatherDetails } from "../utils/weatherUtils";

export default function VerticalForecast({ weatherData }) {
  if (!weatherData) {
    return (
      <div
        className="flex flex-col flex-grow justify-center overflow-y-auto 
      dark:bg-gray-800 bg-gray-200 rounded-2xl shadow-lg
      p-7 mt-10"
      >
        <div className=" text-lg text-center text-gray-500">
          No Forecast data available.
        </div>
      </div>
    );
  }
  const { time, temperature2mMax, temperature2mMin, weatherCode } =
    weatherData.daily;

  const dailyForecast = time.map((date, index) => {
    const { label, icon } = getWeatherDetails(weatherCode[index]);
    const day = new Date(date).toLocaleDateString("GMT", {
      weekday: "short",
    });

    return {
      day,
      icon,
      label,
      temperature2max: Math.round(temperature2mMax[index]),
      temperature2min: Math.round(temperature2mMin[index]),
    };
  });

  return (
    <div className="flex flex-col flex-grow overflow-y-auto dark:bg-gray-800 bg-gray-200 rounded-2xl shadow-lg p-7 mt-10">
      <div className="text-1xl mb-5 dark:text-gray-400 text-gray-600 ">
        7-DAY FORECAST
      </div>
      <div className="flex flex-col justify-between h-full">
        {dailyForecast.map((item, index) => (
          <React.Fragment key={index}>
            <ForecastItem
              day={item.day}
              icon={item.icon}
              label={item.label}
              temperature2max={item.temperature2max}
              temperature2min={item.temperature2min}
            />
            {index < dailyForecast.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function ForecastItem({ day, icon, label, temperature2max, temperature2min }) {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="text-1xl dark:text-gray-400 text-gray-600">{day}</div>
      <div className="flex flex-row items-center justify-center">
        <div className="text-3xl mx-1">{icon}</div>
        <div className="text-1xl dark:text-gray-200 text-gray-950 mx-1">
          {label}
        </div>
      </div>
      <div className="flex flex-row items-center">
        <div className="text-1xl">{temperature2max}</div>
        <div className="text-1xl">/</div>
        <div className="text-1xl">{temperature2min}</div>
      </div>
    </div>
  );
}

export function Divider() {
  return (
    <div className="border-t dark:border-gray-600 border-gray-400 my-2"></div>
  );
}
