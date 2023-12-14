import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import fetch from 'node-fetch';
import cors from 'kcors';
import pkg from 'pg';

import { config } from 'dotenv';
config();

const appId = process.env.APPID || process.env.API_KEY;

const mapURI = process.env.MAP_ENDPOINT || 'http://api.openweathermap.org/data/2.5';

const port = process.env.PORT || 9000;
const router = new Router();
const app = new Koa();
const { Pool } = pkg;
app.use(bodyParser());

app.use(cors());

app.use(router.routes());
app.use(router.allowedMethods());

const fetchWeatherByCoordinates = async (lon, lat) => {
  const endpoint = `${mapURI}/weather?lat=${lat}&lon=${lon}&appid=${appId}&units=metric`;
  const response = await fetch(endpoint);

  return response ? response.json() : {};
};

router.get('/api/weatherbycoordinates', async ctx => {
  if (ctx.request.query.lon && ctx.request.query.lat) {
    const { lon, lat, } = ctx.request.query;
    const weatherData = await fetchWeatherByCoordinates(lon, lat);
    ctx.type = 'application/json; charset=utf-8';
    ctx.body = weatherData.weather ? weatherData : {};
  }
});

const fetchForecastByCoordinates = async (lon, lat) => {
  const endpoint = `${mapURI}/forecast?lat=${lat}&lon=${lon}&appid=${appId}&units=metric`;
  const response = await fetch(endpoint);


  return response ? response.json() : {};
};

router.get('/api/forecastbycoordinates', async ctx => {
  if (ctx.request.query.lon && ctx.request.query.lat) {
    const { lon, lat, } = ctx.request.query;
    const weatherData = await fetchForecastByCoordinates(lon, lat);
    ctx.type = 'application/json; charset=utf-8';
    ctx.body = weatherData.list
      ? {
        weather: weatherData.list[1].weather[0],
        time: weatherData.list[1].dt_txt,
        cityName: weatherData.city.name
      }
      : {};
  }
});

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT 
});










router.post('/api/add', async (ctx) => {
  console.log('Request Body:', ctx.request.body); // Log the request body
  try {
    const { latitude, longitude, name, tyyppi, maakunta } = ctx.request.body;

    // Assuming your database table is named 'geo_data' with columns (id, geom, name, tyyppi, maakunta)
    const insertQuery = `
      INSERT INTO geo_data (geom, name, tyyppi, maakunta)
      VALUES (ST_SetSRID(ST_MakePoint($1, $2), 4326), $3, $4, $5)
      RETURNING id;
    `;
    const values = [latitude, longitude, name, tyyppi, maakunta];

    const { rows } = await pool.query(insertQuery, values);

    ctx.status = 201; // Created
    ctx.body = {
      message: 'added successfully!',
      Id: rows[0].id,
    };
  } catch (error) {
    console.error('Error adding cabin:', error);
    ctx.throw(500, 'Internal Server Error');
  }
});




async function apirespond(ctx, tyyppi) {
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

//Usage in your router
router.get('/api/:tyyppi', async ctx => {
  const { tyyppi } = ctx.params;

  // Decode the encoded characters in the tyyppi value if needed
  const decodedTyyppi = decodeURIComponent(tyyppi);

  await apirespond(ctx, decodedTyyppi);
});

const searchByName = async (name) => {
  try {
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
        name ILIKE $1; -- ILIKE performs a case-insensitive search
    `;
    const { rows } = await pool.query(query, [`%${name}%`]);
    return rows;
  } catch (error) {
    console.error('Error searching places by name:', error);
    throw new Error('Error searching places by name');
  }
};

router.get('/api/searchbyname/:name', async (ctx) => {
  const { name } = ctx.params;
  try {
    const searchResults = await searchByName(name);
    ctx.type = 'application/json';
    ctx.body = searchResults;
  } catch (error) {
    console.error('Error searching places by name:', error);
    ctx.throw(500, 'Internal Server Error');
  }
});
















app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port);

console.log(`App listening on port ${port}`);