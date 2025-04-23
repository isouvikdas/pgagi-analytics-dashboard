import React from "react";
import { getWeatherDetails } from "../utils/weatherUtils";
import { FaWind } from "react-icons/fa";
import { LiaTemperatureHighSolid } from "react-icons/lia";
import { IoRainySharp } from "react-icons/io5";
import { GrDirections } from "react-icons/gr";

export default function HorizontalForecastAndAirQualtiySection({
  weatherData,
}) {
  if (!weatherData) {
    return (
      <div className="flex flex-col h-full w-full gap-4">
        <div className="flex flex-col justify-center text-gray-500 text-lg items-center flex-grow overflow-x-auto dark:bg-gray-800 bg-gray-200 rounded-2xl shadow-lg py-5 px-5 sm:py-7 sm:px-7">
          No Forecast data available
        </div>
        <div className="flex flex-col justify-center text-gray-500 text-lg items-center flex-grow overflow-x-auto dark:bg-gray-800 bg-gray-200 rounded-2xl shadow-lg py-5 px-5 sm:py-7 sm:px-7">
          Air Quality data not available
        </div>
      </div>
    );
  }

  const { time, temperature2m, weatherCode } = weatherData.hourly;
  const { windSpeed10m, windDirection10m, precipitation, apparentTemperature } =
    weatherData.current;

  const airQualityData = [
    {
      label: "Real Feel",
      value: `${apparentTemperature}°`,
      icon: <LiaTemperatureHighSolid />,
    },
    { label: "Wind Speed", value: `${windSpeed10m} km/h`, icon: <FaWind /> },
    {
      label: "Chance of Rain",
      value: `${precipitation} %`,
      icon: <IoRainySharp />,
    },
    {
      label: "Wind Direction",
      value: `${windDirection10m}°`,
      icon: <GrDirections />,
    },
  ];

  const today = new Date().toISOString().split("T")[0];

  const forecastData = time
    .map((t, index) => {
      const date = new Date(t);
      const dateString = date.toISOString().split("T")[0];

      if (index % 4 === 0 && dateString === today) {
        const weatherDetails = getWeatherDetails(weatherCode[index]);
        return {
          time: date.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          temperature: `${Math.round(temperature2m[index])}°`,
          icon: weatherDetails.icon,
        };
      }
      return null;
    })
    .filter((item) => item !== null);

  return (
    <div className="flex flex-col h-full w-full gap-4">
      {/* Hourly Forecast Section */}
      <div className="flex flex-col flex-grow overflow-x-auto dark:bg-gray-800 bg-gray-200 rounded-2xl shadow-lg py-5 px-5 sm:py-7 sm:px-7">
        <div className="w-full dark:text-gray-400 text-gray-600 text-lg sm:text-xl">
          TODAY'S FORECAST
        </div>
        <div className="flex flex-row justify-between w-full items-center mt-4 overflow-x-auto">
          {forecastData.map((item, index) => (
            <React.Fragment key={index}>
              <ForeCastItem
                time={item.time}
                icon={item.icon}
                temperature={item.temperature}
              />
              {index < forecastData.length - 1 && (
                <div className="h-full border-l dark:border-gray-600 border-gray-400 mx-2"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Air Quality Section */}
      <div className="flex flex-col flex-grow w-full dark:bg-gray-800 bg-gray-200 rounded-2xl shadow-lg py-5 px-5 sm:py-7 sm:px-7">
        <div className="w-full dark:text-gray-400 text-gray-600 text-lg sm:text-xl">
          AIR CONDITIONS
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {airQualityData.map((item, index) => (
            <AirQualityItem
              key={index}
              label={item.label}
              value={item.value}
              icon={item.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ForeCastItem({ time, icon, temperature }) {
  return (
    <div className="flex flex-col items-center justify-between">
      <div className="text-sm sm:text-base dark:text-gray-400 text-gray-600">
        {time}
      </div>
      <div className="text-2xl sm:text-3xl mx-1">{icon}</div>
      <div className="text-sm sm:text-base">{temperature}°</div>
    </div>
  );
}

function AirQualityItem({ label, value, icon }) {
  return (
    <div className="flex flex-col items-center justify-between">
      <div className="flex flex-row items-center">
        <div className="text-xl sm:text-2xl text-gray-600 dark:text-gray-500 mr-2">
          {icon}
        </div>
        <div className="text-sm sm:text-base dark:text-gray-400 text-gray-600">
          {label}
        </div>
      </div>
      <div className="text-lg sm:text-2xl font-bold dark:text-gray-200 text-gray-950">
        {value}
      </div>
    </div>
  );
}
