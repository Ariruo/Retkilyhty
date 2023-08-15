const baseURL = 'http://localhost:9000/api';

const getweatherforecastcity = async (city) => {
  try {
    const response = await fetch(`${baseURL}/forecast?city=${city}`);
    return response.json();
  } catch (error) {
    console.error(error);
  }
  return {};
};

export default getweatherforecastcity

