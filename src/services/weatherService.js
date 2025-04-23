const BASE_URL = import.meta.env.VITE_WEATHER_APP_API_URL;


export const fetchWeatherData = async (lat, lon, signal) => {

  const queryParams = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    daily: ["temperature_2m_max", "temperature_2m_min", "weather_code", "precipitation_probability_max"].join(","),
    hourly: ["temperature_2m", "weather_code", "precipitation_probability"].join(","),
    current: ["temperature_2m", "precipitation", "is_day", "wind_speed_10m", "wind_direction_10m", "apparent_temperature"].join(","),
    timezone: "GMT"
  });

  const url = `${BASE_URL}?${queryParams.toString()}`;

  try {
    const response = await fetch(url, { signal });
    const data = await response.json();

    if (!data) throw new Error("No response from weather API");
    
    const weatherData = {
      timezone: data.timezone || "Unknown",
      timezoneAbbreviation: data.timezone_abbreviation || "Unknown",
      latitude: data.latitude || lat,
      longitude: data.longitude || lon,
      current: {
        temperature2m: data.current?.temperature_2m ?? null,
        precipitation: data.current?.precipitation ?? null,
        isDay: data.current?.is_day ?? null,
        windSpeed10m: data.current?.wind_speed_10m ?? null,
        windDirection10m: data.current?.wind_direction_10m ?? null,
        apparentTemperature: data.current?.apparent_temperature ?? null
      },
      hourly: {
        time: data.hourly?.time?.map((t) => new Date(t)) || [],
        temperature2m: data.hourly?.temperature_2m || [],
        weatherCode: data.hourly?.weather_code || [],
        precipitationProbability: data.hourly?.precipitation_probability || [],
      },
      daily: {
        time: data.daily?.time?.map((t) => new Date(t)) || [],
        temperature2mMax: data.daily?.temperature_2m_max || [],
        temperature2mMin: data.daily?.temperature_2m_min || [],
        weatherCode: data.daily?.weather_code || [],
        precipitationProbabilityMax: data.daily?.precipitation_probability_max || [],
      },
    };

    return weatherData;
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Fetch aborted");
    } else {
      console.error("Weather API error:", error);
    }
    return null;
  }
};
