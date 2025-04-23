import { useEffect, useState, useCallback } from "react";
import { fetchWeatherData } from "../services/weatherService";
import { fetchWeatherApi } from "openmeteo";

const useWeather = (lat, lon) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadWeather = useCallback(async (signal) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchWeatherData(lat, lon, signal);
      setWeatherData(data);
    } catch (error) {
      if (error.name !== "AbortError") {
        setError("Failed to fetch weather data. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }, [lat, lon]);

  useEffect(() => {
    if (!lat || !lon) return;

    const controller = new AbortController();
    loadWeather(controller.signal);

    return () => controller.abort();
  }, [lat, lon, loadWeather]);

  return { weatherData, loading, error };
};

export default useWeather;
