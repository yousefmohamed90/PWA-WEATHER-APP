import { useState } from 'react';
import './App.css';
import { fetchWeather } from './api/fetchWeather';
import { fetchCities } from './api/fetchCities';
function App() {
  const [query,setQuery]=useState('');
  const [weather,setWeather]=useState({});
  const [cities,setCities]=useState([]);

 
  const handleChange=async(e)=>{
    const value=e.target.value;
    setQuery(value);
    if(value.length>1){
    const data=await fetchCities(value);  
    setCities(data);
    }
    else{
      setCities([]);
    }
  }  
  
  const search=async(e)=>{
  if(e.key==='Enter'  ){
    const data=await fetchWeather(query);
    setWeather(data);
    setCities([]);
    setQuery('');
  }
}

  return (
    <main className="main-container">
      <h2>Write the city name and press enter to see the weather </h2> 
      <input 
      type='text' 
      className='search'
      placeholder='search ...'
      value={query}
      onChange={handleChange}
      onKeyDown={search}/>
     {cities.length>0&&(
     <ul className='suggestions'>
     {cities.map((city,index)=>(
      <li key={index} onClick={async ()=>{
        const data=await fetchWeather(city.name);
        setWeather(data);
        setQuery(city.name);
        setCities([]);
        setQuery('');
      }}>
        {city.name},{city.country}
      </li>
     ))
     }
     </ul>
     )}

      {weather.main &&(
        <div className='city'>
          <h2 className='city-name'>
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className='city-temp'>
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className='info'> 
            <p>{weather.weather[0].description}</p>
          </div>

          </div>
          )}
          </main>
    )}
    
export default App;
