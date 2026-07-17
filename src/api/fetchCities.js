import axios from 'axios';
const API_KEY = 'f33a484cf794d08d0148764789aaba32';
export const fetchCities=async(query)=>{
    const {data}=await axios.get( "https://api.openweathermap.org/geo/1.0/direct",{
    params:{
        q:query,
        limit:5,
        appid:API_KEY,
    }
    })
    return data;
}