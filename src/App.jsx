import React, { useState, useEffect, useCallback } from "react";
import debounce from "lodash/debounce";
import Navbar from "./components/navbar";
import SearchForm from "./components/searchForm";
import "./index.css";
import Temperature from "./components/temperature";
import VerticalForecast from "./components/verticalForecast";
import HorizontalForecastAndAirQualtiySection from "./components/horizontalForecast";
import ToggleButton from "./components/toggleButton";
import LogoutButton from "./components/LogoutButton";
import { fetchWeatherData } from "./services/weatherService";
import { fetchCitySuggestions } from "./services/geoService";

function App() {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");

  const debouncedFetchSuggestions = useCallback(
    debounce(async (query) => {
      if (!query) {
        setSuggestions([]);
        return;
      }
      const cities = await fetchCitySuggestions(query);
      setSuggestions(cities);
    }, 600),
    []
  );

  const handleInputChange = async (query) => {
    setSearch(query);
    debouncedFetchSuggestions(query);
  };

  const handleSearch = async (query) => {
    const selectedCity = suggestions.find((city) => city.name === query);
    if (selectedCity) {
      setSuggestions([]);
      const { latitude, longitude, city } = selectedCity;
      const weatherData = await fetchWeatherData(latitude, longitude);
      if (weatherData) {
        setCity(city);
      }
      setWeatherData(weatherData);
    }
  };

  const handleSelectSuggestion = async (suggestion) => {
    setSearch(suggestion.name);
    const selectedCity = suggestion;
    console.log(selectedCity);
    const { latitude, longitude, city } = selectedCity;
    console.log(latitude);
    console.log(longitude);
    const weatherData = await fetchWeatherData(latitude, longitude);
    if (weatherData) {
      setCity(city);
    }
    setWeatherData(weatherData);
    setSuggestions([]);
  };

  return (
    <div className="flex h-screen w-screen bg-gray-100 dark:bg-gray-950 text-black dark:text-white px-10 py-10">
      <Navbar />
      <div className="flex flex-grow">
        <div className="flex flex-col flex-grow mx-7 overflow-x-clip">
          <SearchForm
            search={search}
            setSearch={handleInputChange}
            handleSearch={handleSearch}
            suggestions={suggestions}
            onSelectSuggestion={handleSelectSuggestion}
          />
          <Temperature weatherData={weatherData} city={city} />
          <HorizontalForecastAndAirQualtiySection weatherData={weatherData} />
        </div>
        <div className="flex flex-col flex-grow h-full">
          <div className="flex items-center justify-end space-x-4">
            <ToggleButton />
            <LogoutButton />
          </div>
          <VerticalForecast weatherData={weatherData} />
        </div>
      </div>
    </div>
  );
}

export default App;
