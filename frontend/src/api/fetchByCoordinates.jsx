const getWeatherFromApiCord = async ({longitude, latitude} ) => {

    try {
      console.log(longitude, latitude)
      let url=`http://localhost:9000/api/weatherbycoordinates?lon=${longitude}&lat=${latitude}`
      
  
      const response = await fetch(url);
      console.log(response)
      return response.json();
    } catch (error) {
      console.error(error);
    }
    return {};
  };

  export default getWeatherFromApiCord;