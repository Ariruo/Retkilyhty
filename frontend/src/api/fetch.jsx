const baseURL = 'http://localhost:9000/api';

const getWeatherFromApi = async (city) => {
  try {
    const response = await fetch(`${baseURL}/weatherbycity?city=${city}`);
    return response.json();
  } catch (error) {
    console.error(error);
  }
  return {};
};




export default getWeatherFromApi