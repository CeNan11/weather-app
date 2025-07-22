import React, { useState, useEffect, use } from "react";
import UseIntersectionObserver from "./UseIntersectionObserver";
import { FaCity, FaTemperatureHigh, FaCloud } from "react-icons/fa";

function AnimatedElement({ children, delay = 0 }) {
  const [ref, isIntersecting] = UseIntersectionObserver({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function WeatherComponent() {
  const [city, setCity] = useState("Davao");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = "117927dd4b7ee02498b7e73ca761017f";

  useEffect(() => {
    async function fetchWeather() {
      setLoading(true)
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        try {
          const response = await fetch(url);
          const data = await response.json();

          if (data.cod === 200) {
            setWeather(data);
            setError(null);
          } else {
            setWeather(null);
            setError("");
          }
        } catch (err) {
          setWeather(null);
          setError("Something went wrong");
        }
        finally{
          setLoading(false);
        }
      } 
    fetchWeather();
  }, [city]);

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/background.jpg')" }}
      ></div>
      <div className="fixed top-0 left-0 w-full h-full backdrop-blur-sm bg-black/30"></div>
      <AnimatedElement>
        <div className="relative z-10 flex items-center justify-center h-screen">
          <div className="text-center">

            <h1 className="text-4xl font-bold mb-4 text-white font-inter">Weather App</h1>

            <input
              type="text"
              value={city}
              placeholder="Input City"
              onChange={(e) => setCity(e.target.value)}
              className="w-full bg-transparent border-b border-white placeholder-white text-white py-2 px-1 focus:outline-none focus:border-b-2 focus:border-white mb-4"
            />
            {error && <p className="text-red-500 font-medium mb-2"></p>}
            {loading && (
              <div className="text-white mt-4 animate-pulse">
                Fetching weather data...
              </div>
            )}

            {weather ? (
              <>
                  <div className="space-y-3 text-white mt-4">
                    <AnimatedElement delay={300}>
                      <div className="flex items-center justify-center gap-2">
                        <FaCity />
                        <p>City: {weather.name}</p>
                      </div>
                    </AnimatedElement>
                    <AnimatedElement delay={300}>
                      <div className="flex items-center justify-center gap-2">
                        <FaTemperatureHigh />
                        <p className="text-lg">Temp: {weather.main.temp}°C</p>
                      </div>
                    </AnimatedElement>
                    <AnimatedElement delay={300}>
                      <div className="flex items-center justify-center gap-2">
                        <FaCloud />
                        <p>Sky: {weather.weather[0].description}</p>
                      </div>
                    </AnimatedElement>
                  </div>
                </>
              ) : (
                <p className="text-gray-300">No data</p>
              )}
            </div>
          </div>
        </AnimatedElement>
    </>
  );
}

export default WeatherComponent;
