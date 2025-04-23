const RAPID_API_KEY = import.meta.env.VITE_RAPID_API_KEY;
const RAPID_API_HOST = import.meta.env.VITE_RAPID_API_HOST;

export const fetchCitySuggestions = async (query) => {
  if (!query) return [];
  const url = `https://${RAPID_API_HOST}/v1/geo/cities?namePrefix=${query}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": RAPID_API_KEY,
      "x-rapidapi-host": RAPID_API_HOST,
    },
  };

  try {
    console.log("Fetching city suggestions for query:", query);
    const response = await fetch(url, options);
    if (!response.ok) throw new Error("Failed to fetch city suggestions");
    const data = await response.json();
    console.log("City suggestions response:", data);
    return data.data || [];
  } catch (error) {
    console.error("Geo API error:", error);
    return [];
  }
};