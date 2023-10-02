import Koa from 'koa';
import Router from 'koa-router';
import fetch from 'node-fetch';
import cors from 'kcors';
import { config } from 'dotenv';
config();

const appId = process.env.APPID || process.env.API_KEY;
const mapURI = process.env.MAP_ENDPOINT || 'http://api.openweathermap.org/data/2.5';
const cabinsURL = 'https://tulikartta.fi';



const port = process.env.PORT || 9000;
const router = new Router();
const app = new Koa();

app.use(cors());



const fetchWeatherByCoordinates = async (lon, lat) => {
  const endpoint = `${mapURI}/weather?lat=${lat}&lon=${lon}&appid=${appId}&units=metric`;
  const response = await fetch(endpoint);

  return response ? response.json() : {};
};

const fetchForecastByCoordinates = async (lon, lat) => {
  const endpoint = `${mapURI}/forecast?lat=${lat}&lon=${lon}&appid=${appId}&units=metric`;
  const response = await fetch(endpoint);
  

  return response ? response.json() : {};
};


const fetchData = async (tyyppi) => {
  try {
    const endpoint = `${cabinsURL}/api-json.php?tyyppi=${tyyppi}&maakunta`;
    const response = await fetch(endpoint);
    return response.json();
  } catch (error) {
    console.error('Error fetching cabin data:', error);
    throw new Error('Error fetching cabin data');
  }
};


const filterAndRespond = async (ctx, type) => {
  try {
    const search = ctx.request.query.search || '';
    const cabinsData = await fetchData(type);
    ctx.type = 'application/json; charset=utf-8';

    const filteredData = cabinsData.features.filter(feature => {
      return (
        feature.properties &&
        feature.properties.name &&
        feature.properties.name.toLowerCase().includes(search.toLowerCase())
      );
    });

    ctx.body = { features: filteredData };
  } catch (error) {
    console.error('Error fetching cabin data:', error);
    ctx.throw(500, 'Internal Server Error');
  }
};




router.get('/api/weatherbycoordinates', async ctx => {
  if (ctx.request.query.lon && ctx.request.query.lat) {
    const { lon, lat, } = ctx.request.query;
    const weatherData = await fetchWeatherByCoordinates(lon, lat);
    ctx.type = 'application/json; charset=utf-8';
    ctx.body = weatherData.weather ? weatherData : {};
  }
});

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

//////////////////////////////////////////////////////////////// MAPDATA  //////////////////////////////////////////////////////////////////



router.get('/api/allcabinspoints', async ctx => {
  await filterAndRespond(ctx, 'Autiotupa');
});

router.get('/api/allvaraustupapoints', async ctx => {
  await filterAndRespond(ctx, 'Varaustupa');
});

router.get('/api/allnuotiopaikkapoints', async ctx => {
  await filterAndRespond(ctx, 'Nuotiopaikka');
});


router.get('/api/allkotapoints', async ctx => {
  await filterAndRespond(ctx, 'Kota');
});

router.get('/api/alllaavupoints', async ctx => {
  await filterAndRespond(ctx, 'Laavu');
});


router.get('/api/allpaivatupapoints', async ctx => {
  await filterAndRespond(ctx, 'Päivätupa');
});

router.get('/api/allkammipoints', async ctx => {
  await filterAndRespond(ctx, 'Kammi');
});

router.get('/api/allsaunapoints', async ctx => {
  await filterAndRespond(ctx, 'Sauna');
});

router.get('/api/alllintutornipoints', async ctx => {
  await filterAndRespond(ctx, 'Lintutorni');
});

router.get('/api/allnahtavyyspoints', async ctx => {
  await filterAndRespond(ctx, 'NÃ¤htÃ¤vyys');
});

router.get('/api/allluolapoints', async ctx => {
  await filterAndRespond(ctx, 'Luola');
});

router.get('/api/alllahdepoints', async ctx => {
  await filterAndRespond(ctx, 'Lähde');
});

router.get('/api/all', async ctx => {
  await filterAndRespond(ctx, '');
});











app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port);

console.log(`App listening on port ${port}`);