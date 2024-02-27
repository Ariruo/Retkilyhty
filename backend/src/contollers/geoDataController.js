// geoDataController.js
import { pool } from '../service/db.js';
import fetch from 'node-fetch';


const appId = process.env.APPID || process.env.API_KEY;
const mapURI = process.env.MAP_ENDPOINT || 'http://api.openweathermap.org/data/2.5';

export async function getUserPoints(ctx) {
  try {
    console.log('Request Headers:', ctx.headers);

    if (ctx.state.user) {
      const { id } = ctx.state.user;

      const query = `
        SELECT
          id,
          ST_X(geom::geometry) AS longitude,
          ST_Y(geom::geometry) AS latitude,
          name,
          tyyppi,
          maakunta
        FROM
          geo_data
        WHERE
          user_id = $1 AND
          tyyppi = 'Oma kohde';
      `;

      const { rows } = await pool.query(query, [id]);

      ctx.type = 'application/json';
      ctx.body = rows;
    } else {
      ctx.status = 401; // Unauthorized
      ctx.body = { error: 'User not authenticated' };
    }
  } catch (error) {
    console.error('Error fetching geopoints for user:', error);
    ctx.throw(500, 'Internal Server Error');
  }
}

export async function addPoint(ctx) {
  try {
    // Check if there is a user in the context
    if (ctx.state.user) {
      const userId = ctx.state.user.id; // Assuming the user object has an 'id' property

      const { latitude, longitude, name, tyyppi, maakunta } = ctx.request.body;

      // Assuming your database table is named 'geo_data' with columns (id, geom, name, tyyppi, maakunta, user_id)
      const insertQuery = `
        INSERT INTO geo_data (geom, name, tyyppi, maakunta, user_id)
        VALUES (ST_SetSRID(ST_MakePoint($1, $2), 4326), $3, $4, $5, $6)
        RETURNING id;
      `;
      const values = [latitude, longitude, name, tyyppi, maakunta, userId];

      console.log('User ID:', userId);
      console.log('Insert Query:', insertQuery);
      console.log('Values:', values);

      const { rows } = await pool.query(insertQuery, values);

      console.log('add:', rows);

      ctx.status = 201; // Created
      ctx.body = {
        message: 'added successfully!',
        Id: rows[0].id,
      };
    } else {
      const { latitude, longitude, name, tyyppi, maakunta } = ctx.request.body;

      // Assuming your database table is named 'geo_data' with columns (id, geom, name, tyyppi, maakunta)
      const insertQuery = `
        INSERT INTO geo_data (geom, name, tyyppi, maakunta)
        VALUES (ST_SetSRID(ST_MakePoint($1, $2), 4326), $3, $4, $5)
        RETURNING id;
      `;
      const values = [latitude, longitude, name, tyyppi, maakunta];

      console.log('addd query:', insertQuery);
      console.log(' addd Values:', values);

      const { rows } = await pool.query(insertQuery, values);

      console.log('addd rows:', rows);

      ctx.status = 201; // Created
      ctx.body = {
        message: 'added successfully!',
        Id: rows[0].id,
      };
    }
  } catch (error) {
    console.error('Error adding point:', error);
    ctx.throw(500, 'Internal Server Error');
  }
}

export async function getWeatherByCoordinates(ctx) {
  try {
    const { lon, lat } = ctx.request.query;


    const endpoint = `${mapURI}/weather?lat=${lat}&lon=${lon}&appid=${appId}&units=metric`;
    const response = await fetch(endpoint);

    if (response.ok) {
      const weatherData = await response.json();
      ctx.type = 'application/json; charset=utf-8';
      ctx.body = weatherData.weather ? weatherData : {};
    } else {
      console.error('Error fetching weather data:', response.statusText);
      ctx.throw(response.status, 'Error fetching weather data');
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    ctx.throw(500, 'Internal Server Error');
  }
}

export async function getForecastByCoordinates(ctx) {
  try {
    const { lon, lat } = ctx.request.query;
    const appId = process.env.APPID || process.env.API_KEY;
    const mapURI = process.env.MAP_ENDPOINT || 'http://api.openweathermap.org/data/2.5';

    const endpoint = `${mapURI}/forecast?lat=${lat}&lon=${lon}&appid=${appId}&units=metric`;
    const response = await fetch(endpoint);

    if (response.ok) {
      const forecastData = await response.json();
      ctx.type = 'application/json; charset=utf-8';
      ctx.body = forecastData.list
        ? {
            weather: forecastData.list[1].weather[0],
            time: forecastData.list[1].dt_txt,
            cityName: forecastData.city.name
          }
        : {};
    } else {
      console.error('Error fetching forecast data:', response.statusText);
      ctx.throw(response.status, 'Error fetching forecast data');
    }
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    ctx.throw(500, 'Internal Server Error');
  }
}

export async function searchByName(ctx) {
    try {
      const userId = ctx.state.user ? ctx.state.user.id : null; // Extracted from JWT token if available
      const { name } = ctx.params;
  
      const query = `
        SELECT
          id,
          ST_X(geom::geometry) AS longitude,
          ST_Y(geom::geometry) AS latitude,
          name,
          tyyppi,
          maakunta,
          user_id
        FROM
          geo_data
        WHERE 
          (user_id = $1 AND tyyppi = 'Oma kohde') OR
          (user_id IS NULL AND tyyppi != 'Oma kohde') AND
          name ILIKE $2; -- ILIKE performs a case-insensitive search
      `;
  
      const { rows } = await pool.query(query, [userId, `%${name}%`]);
      ctx.type = 'application/json';
      ctx.body = rows;
    } catch (error) {
      console.error('Error searching places by name:', error);
      ctx.throw(500, 'Internal Server Error');
    }
  }
  
  export async function apirespond(ctx, tyyppi) {
    try {
      // Capitalize the first letter of tyyppi
      const capitalizedTyyppi = tyyppi.charAt(0).toUpperCase() + tyyppi.slice(1);
  
      const query = `
      SELECT
      id,
      ST_X(geom::geometry) AS longitude,
      ST_Y(geom::geometry) AS latitude,
      name,
      tyyppi,
      maakunta
    FROM
     geo_data
    WHERE
      tyyppi = $1;
  `;
      const { rows } = await pool.query(query, [capitalizedTyyppi]);
  
      ctx.type = 'application/json';
      ctx.body = rows;
    } catch (error) {
      console.error(`Error fetching ${tyyppi} data:`, error);
      ctx.throw(500, 'Internal Server Error');
    }
  }