import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import fetch from 'node-fetch';
import cors from 'kcors';
import pkg from 'pg';
import jwt from 'koa-jwt';
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { config } from 'dotenv';
config();

const appId = process.env.APPID || process.env.API_KEY;
const jwtSecret = process.env.JWT_SECRET 
const mapURI = process.env.MAP_ENDPOINT || 'http://api.openweathermap.org/data/2.5';

const port = process.env.PORT || 9000;
const router = new Router();
const app = new Koa();
const { Pool } = pkg;

app.use(bodyParser());
app.use(cors({
  origin: '*', // Allow requests from any origin
  methods: 'POST, GET, HEAD, DELETE',
}));



app.use(async (ctx, next) => {
  try {
    // If it's the protected route, check for the JWT token
    if (ctx.path === '/api/userpoints') {
      await jwt({ secret: jwtSecret })(ctx, next);
    } else {
      // If it's not the protected route, move on to the next middleware
      await next();
    }
  } catch (error) {
    console.error('Error during JWT validation:', error);
    ctx.throw(401, 'Unauthorized');
  }
});

const optionally_protected = jwt({
  secret: jwtSecret,
  passthrough: true, // Allows requests without valid tokens to pass through
});







app.use(router.routes());
app.use(router.allowedMethods());

router.options('/api/register', (ctx) => {
  // Respond to pre-flight request
  ctx.status = 204; // No Content
  ctx.set('Access-Control-Allow-Origin', 'https://www.retkilyhty.fi');
  ctx.set('Access-Control-Allow-Methods', 'POST');
  ctx.set('Access-Control-Allow-Headers', 'content-type');
});




const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT 
});


// Route to generate JWT token (Login)
router.post('/api/login',  allowAllMethods, async (ctx) => {
  try {
    const { username, password } = ctx.request.body;

    // Find the user by their username or email in the database
    const userQuery = `
      SELECT id, username, password_hash
      FROM users
      WHERE username = $1 OR email = $1;
    `;
    const userResult = await pool.query(userQuery, [username]);

    if (userResult.rows.length === 0) {
      ctx.status = 401; // Unauthorized
      ctx.body = { error: 'Invalid username or email' };
      return;
    }

    const user = userResult.rows[0];

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      ctx.status = 401; // Unauthorized
      ctx.body = { error: 'Invalid password' };
      return;
    }

    // Generate JWT token
    const token = jsonwebtoken.sign(
      { id: user.id, username: user.username },
      jwtSecret,
      { expiresIn: '1h' }
    );

    // Include user_id and username in the response
    ctx.body = {
      token,
      user_id: user.id,
      username: user.username,
    };
  } catch (error) {
    console.error('Error during login:', error);
    ctx.throw(500, 'Internal Server Error');
  }
});


router.get('/api/userpoints', async (ctx) => {
  try {
    console.log('Request Headers:', ctx.headers);

    if (ctx.state.user) {
      const { id } = ctx.state.user;
      console.log('Decoded Token:', ctx.state.user);
      console.log('User ID:', id);

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
});


router.post('/api/register', async (ctx) =>{
  try {
    const { email, username, password } = ctx.request.body;

    // You should hash the password before storing it in the database for security
    // For simplicity, you can use a library like bcrypt

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the user into the 'users' table
    const insertUserQuery = `
      INSERT INTO users (email, username, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id;
    `;
    const values = [email, username, hashedPassword];

    const { rows } = await pool.query(insertUserQuery, values);

    ctx.status = 201; // Created
    ctx.body = {
      message: 'User registered successfully!',
      userId: rows[0].id,
      username: username,
    };
  } catch (error) {
    console.error('Error registering user:', error);
    ctx.throw(500, 'Internal Server Error');
  }
});


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





router.post('/api/add',  async (ctx) => {
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

      const { rows } = await pool.query(insertQuery, values);

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

      const { rows } = await pool.query(insertQuery, values);

      ctx.status = 201; // Created
      ctx.body = {
        message: 'added successfully!',
        Id: rows[0].id,
      };
    }
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





app.listen(port);

console.log(`App listening on port ${port}`);