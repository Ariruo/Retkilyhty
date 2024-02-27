import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import cors from 'kcors';
import jwt from 'koa-jwt';
import { registerUser, loginUser } from './contollers/authcontroller.js';
import { searchByName,getUserPoints, addPoint, getWeatherByCoordinates,apirespond, getForecastByCoordinates } from './contollers/geoDataController.js';
import { config } from 'dotenv';

config();


const jwtSecret = process.env.JWT_SECRET 


const port = process.env.PORT || 9000;
const router = new Router();
const app = new Koa();


app.use(bodyParser());
app.use(cors());



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





router.post('/api/register', registerUser);
router.post('/api/login', loginUser);



router.get('/api/userpoints', getUserPoints);
router.get('/api/weatherbycoordinates', getWeatherByCoordinates);
router.post('/api/add', optionally_protected, addPoint);




//Usage in your router
router.get('/api/:tyyppi', async ctx => {
  const { tyyppi } = ctx.params;

  // Decode the encoded characters in the tyyppi value if needed
  const decodedTyyppi = decodeURIComponent(tyyppi);

  await apirespond(ctx, decodedTyyppi);
});

router.get('/api/searchbyname/:name', optionally_protected, searchByName);


app.listen(port);

console.log(`App listening on port ${port}`);