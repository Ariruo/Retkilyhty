// authController.js

import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { pool } from '../service/db.js';

const jwtSecret = process.env.JWT_SECRET;

export const loginUser = async (ctx) => {
  try {
    const { username, password } = ctx.request.body;

    const user = await findUserByUsernameOrEmail(username);

    if (!user) {
      ctx.status = 401;
      ctx.body = { error: 'Invalid username or email' };
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      ctx.status = 401;
      ctx.body = { error: 'Invalid password' };
      return;
    }

    const token = generateJwtToken(user.id, user.username);

    ctx.body = {
      token,
      user_id: user.id,
      username: user.username,
    };
  } catch (error) {
    console.error('Error during login:', error);
    ctx.throw(500, 'Internal Server Error');
  }
};

export const registerUser = async (ctx) => {
  try {
    const { email, username, password } = ctx.request.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await insertUser(email, username, hashedPassword);

    ctx.status = 201;
    ctx.body = {
      message: 'User registered successfully!',
      userId,
      username,
    };
  } catch (error) {
    console.error('Error registering user:', error);
    ctx.throw(500, 'Internal Server Error');
  }
};

async function findUserByUsernameOrEmail(usernameOrEmail) {
  const query = `
    SELECT id, username, password_hash
    FROM users
    WHERE username = $1 OR email = $1;
  `;
  const { rows } = await pool.query(query, [usernameOrEmail]);
  return rows[0];
}

async function insertUser(email, username, hashedPassword) {
  const insertQuery = `
    INSERT INTO users (email, username, password_hash)
    VALUES ($1, $2, $3)
    RETURNING id;
  `;
  const { rows } = await pool.query(insertQuery, [email, username, hashedPassword]);
  return rows[0].id;
}

function generateJwtToken(userId, username) {
  return jsonwebtoken.sign({ id: userId, username }, jwtSecret, { expiresIn: '1h' });
}
