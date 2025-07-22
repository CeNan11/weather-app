import React, {useState, useEffect} from "react";

function WeatherComponent(){
    const [city, setCity] = useState("Manila");
    const [weather, setWeather] = useState();
    const [error, setError] = useState();

    const apiKey = "117927dd4b7ee02498b7e73ca761017f";

    useEffect(() => {
        async function fetchWeather(){
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

            const response = await fetch(url);
            const data = await response.json();

            if(data.cod === 200){
                setWeather(data);
            }
            else{
                setWeather(null);
            }
        }
        fetchWeather();
    }, [city])

    return(
        <>
            <div>
                <h1>Weather App</h1>
                <div>
                    <input type="text" value={city} placeholder="Input City" onChange={(e) => setCity(e.target.value)}></input>
                </div>
                {weather ? (
                    <div>
                        <p>City: {weather.name}</p>
                        <p>Temp: {weather.main.temp}</p>
                        <p>Sky: {weather.weather[0].description}</p>
                    </div>
                ):(
                    <p>no data</p>
                )}
            </div>
        </>
    );
}

export default WeatherComponent;