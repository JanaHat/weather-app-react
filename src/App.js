import React, { useState } from 'react';

const api = {
    key: '5cbc33ae6fb822fb2235ebf98fd61817',
    base: 'https://api.openweathermap.org/data/2.5/'
}

function App() {

    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = event => {
        event.preventDefault();
        if(query !== '') {
        fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
            .then(res => res.json())
            .then(result => {
                setWeather(result);
                setQuery('');
            });
        } else {
            alert('Please enter a city name!')
        }
    }

    

    const dateBuilder = (d) => {
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let days = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day}, ${date} ${month} ${year}`
    }

    return (
        <div className="app">
            <main>
                
                <div className="box">
                    <h1 className="title">Get Weather</h1>
                    <div className="search">
                        <input 
                            type="text"
                            className="search-bar"
                            placeholder="Enter a city..."
                            onChange={e => setQuery(e.target.value)}
                            value={query}
                        />
                        <button 
                            type="submit" 
                            className="search-btn"
                            onClick={e => search(e)}
                            value={query}
                            >Search
                        </button>
                    </div>
                </div>
                {(typeof weather.main != "undefined") ? (
                    <div className="loc-weather-box">
                        
                        <div className="location-box">
                            <h1 className="location">{weather.name}, {weather.sys.country}</h1>
                            <h2 className="date">{dateBuilder(new Date())}</h2>
                        </div>
                        <div className="weather-box">
                            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}className="icon" alt="mountains illustration" />
                            <p className="temp"><span>Temperature:</span>{Math.round(weather.main.temp)}&deg;C</p>
                            <p className="real-feel"><span>Feels like:</span>{Math.round(weather.main.feels_like)}&deg;C</p>
                            <p className="humidity"><span>Humidity:</span>{weather.main.humidity}</p>
                            <p className="weather"><span>Weather:</span>{weather.weather[0].description}</p>
                        </div>
                    </div>
                ) : (
                    <div className="valid-city">
                        <h4>Please enter a valid city name...</h4>
                    </div>
                )}
            </main>
        </div>
    );
};

export default App;