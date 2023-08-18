const express = require('express');
const app = express();
const port = 3001;
const pg = require('pg');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const cors = require('cors');

require('dotenv').config();

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

const DBConnectionString = {
  host: process.env.DB_SERVER,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: 5432,
  ssl: true
};

const client = new pg.Client(DBConnectionString)

const secretKey = crypto.randomBytes(32).toString('hex');

client.connect(err => {
  if (err) {
      console.error('Error connecting to database:', err);
  } else { 
      
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
      console.log('Connected to database');
      queryDatabase();
  }
});

app.use(cors(corsOptions));
app.use(express.json());

function queryDatabase() {
  const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          email VARCHAR(50) UNIQUE,
          login VARCHAR(50) UNIQUE,
          password VARCHAR
      );
  `;

  client
      .query(createTableQuery)
      .then(() => {
          console.log('Database setup successfull');
      })
      .catch(err => console.log(err));
}

app.post('/users/login', async (req, res) => {
  try {
    const { login, password } = req.body;

    if (login.length === 0 || password.length === 0) {
      return res.status(422).json({ message: 'Invalid credentials' });
    }

    const query = `SELECT * FROM "users" WHERE login = $1`;
    const result = await client.query(query, [login]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user.id, userLogin: user.login }, secretKey, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error during login.', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/users/register', async (req, res) => {
  try {
    const { email, login, password } = req.body;

    if (email.length === 0 || login.length === 0 || password.length === 0) {
      return res.status(422).json({ message: 'Invalid credentials' });
    }

    const userExistQuery = `SELECT * FROM "users" WHERE email = $1 OR login = $2`;
    const userExistResult = await client.query(userExistQuery, [email, login]);

    if (userExistResult.rows.length > 0) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertQuery = `INSERT INTO "users" (email, login, password) VALUES ($1, $2, $3)`;
    await client.query(insertQuery, [email, login, hashedPassword]);

    res.status(200).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error during registration.', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//  Chronione zasoby - za pomocą verifyToken należy sprawdzać 
//  czy żądanie pochodzi od zweryfikowanego użytkownika(należy użyć w prawie każdym endpoincie)
// app.get('/protected-resource', verifyToken, (req, res) => {
//   // Tutaj możesz dostępować do req.user.userId, który zawiera ID użytkownika z tokena
//   res.status(200).json({ message: 'Protected resource accessed successfully' });
// });