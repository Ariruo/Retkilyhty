import pkg from 'pg';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

// Destructure Pool from pg package
const { Pool } = pkg;

// Create a PostgreSQL pool
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

// Handle pool connection errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export { pool };
