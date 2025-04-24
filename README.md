# Pgagi Analytics Dashboard

This is a clean and simple weather app that shows you the current weather, today’s forecast, and the next 7 days — all based on your searched location. Just start typing a place in the search bar and it’ll autocomplete for quick access.


## 🌐 Live App

[https://lustrous-raindrop-b7cd4b.netlify.app/](https://lustrous-raindrop-b7cd4b.netlify.app/)

## 🚀 Tech Stack Used

- **HTML**
- **Tailwind CSS**
- **React.js**
- **Vite**

## 🔌 APIs Used

- [Open-Meteo Weather API](https://open-meteo.com/)  
  Used to fetch current weather data, hourly forecast, and 7-day forecast.

- [GeoDB Cities API](https://rapidapi.com/wirefreethought/api/geodb-cities) (via RapidAPI)  
  Used for location autocomplete and search functionality.

## 🛠️ Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/pgagi-analytics-dashboard.git
2. **Install dependencies:**

   ```bash
   npm install
3. **Set up environment variables:**

   Create a .env file in the root directory and add your API keys (required by Open-Meteo or GeoDB).

   ```bash
   VITE_WEATHER_APP_API_URL=https://api.open-meteo.com/v1/forecast

   VITE_RAPID_API_KEY=your_geodb_api_key_provided_by_rapiapi

   VITE_RAPID_API_HOST=your_geodb_api_host_provided_by_rapiapi
4. **Run the app:**

   The app will start on http://localhost:5173
   

   ```bash
   npm run dev
