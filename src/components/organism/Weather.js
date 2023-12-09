import ReactWeather, { useOpenWeather } from 'react-open-weather';
import API from "../../services/API";
import {useEffect, useState} from "react";

const Weather =  (latlng) => {
    const [weatherCurrent, setWeatherCurrent] = useState(null);
    const [next5Hours, setNext5Hours] = useState(null);
    const [futureDay, setFutureDay] = useState(null);
    useEffect(() => {
        const obtenirWeatherCurrent = async () => {
            try {
                const data = await API.currentweather(latlng);
                console.log(data)
                // Extraire les données des 5 heures suivantes
                const data5Hours = data.list.slice(1, 6);
                setWeatherCurrent(data);
                setNext5Hours(data5Hours);

                // Grouper les prévisions par jour
                const groupedByDay = {};
                data.list.forEach((forecast) => {
                    const date = forecast.dt_txt.split(' ')[0];
                    if (!groupedByDay[date]) {
                        groupedByDay[date] = [forecast];
                    } else {
                        groupedByDay[date].push(forecast);
                    }
                });

                // Extraire les prévisions pour les jours suivants
                setFutureDay(Object.values(groupedByDay).slice(1));

            } catch (error) {
                console.error("Une erreur s'est produite :", error);
            }
        };

        obtenirWeatherCurrent();
    }, []);
    return (
        <div className="flex flex-auto items-center  justify-center  ">
            {weatherCurrent &&

            <div className="w-full max-w-screen-sm bg-white p-1 px-4 py-5 mx-4 rounded-xl ring-8 ring-white ring-opacity-40">

                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <span className="text-3xl font-bold">{`${weatherCurrent.list[0].main.temp} °C`}</span>
                        <span className="font-semibold mt-1 text-gray-500">{`${weatherCurrent.city.name}, ${weatherCurrent.city.country}`}</span>
                    </div>
                    <div className="inline-block">
                        <img src={`http://openweathermap.org/img/w/${weatherCurrent.list[0].weather[0].icon}.png`} alt="weather icon" />
                        <span className="font-semibold mt-1 text-gray-500">{weatherCurrent.list[0].weather[0].description}</span>

                    </div>
                    </div>

                <div className="flex justify-between mt-12">
                    {next5Hours.map((forecast) => (
                        <div className="flex flex-col mr-2 items-center">
                            <span className="font-semibold text-lg">{forecast.main.temp}°C</span>
                            <img src={`http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`} alt="weather icon" />
                            <span className="font-semibold mt-1 text-sm">{forecast.dt_txt.split(' ')[1]}</span>
                        </div>
                    ))}
                </div>
            </div>}
            {futureDay &&

                <div
                    className="flex flex-col space-y-6 w-full max-w-screen-sm bg-white p-1  rounded-xl ring-8 ring-white ring-opacity-40">


                        {futureDay.map((dayForecast) => (

                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-sm ">{dayForecast[0].dt_txt.split(' ')[0]}</span>
                            <img src={`http://openweathermap.org/img/w/${dayForecast[0].weather[0].icon}.png`} alt="weather icon" />
                            <span className="font-semibold text-sm w-1/4 text-right">{dayForecast[0].main.temp}°C</span>
                        </div>
                    ))}




                </div>
            }



        </div>
    );
};
export default Weather;