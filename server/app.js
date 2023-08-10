const express = require('express');
const app = express();
const port = 3001;
const pg = require('pg');

require('dotenv').config();



const connectionString = {
  host: process.env.DB_SERVER,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: 5432,
  ssl: true
};

const client = new pg.Client(connectionString)

client.connect(err => {
  if (err) {
      console.error('Error connecting to database:', err);
  } else { 
      app.use(express.json());
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
      console.log('Connected to database');
      queryDatabase();
  }
});


function queryDatabase() {
    const query = `
        DROP TABLE IF EXISTS inventory;
        CREATE TABLE inventory (id serial PRIMARY KEY, name VARCHAR(50), quantity INTEGER);
        INSERT INTO inventory (name, quantity) VALUES ('banana', 150);
        INSERT INTO inventory (name, quantity) VALUES ('orange', 154);
        INSERT INTO inventory (name, quantity) VALUES ('apple', 100);
    `;

    client
        .query(query)
        .then(() => {
            console.log('Table created successfully!');
        })
        .catch(err => console.log(err))
}

// app.get('/createUserTable', (req, res) => {
//   const createUserTableQuery = `
//     CREATE TABLE IF NOT EXISTS [User] (
//       UserID INT PRIMARY KEY,
//       FirstName VARCHAR(50),
//       LastName VARCHAR(50),
//       Email VARCHAR(100) UNIQUE,
//       PasswordHash VARCHAR(100),
//       CreatedAt DATETIME DEFAULT GETDATE()
//     );
//   `;

//   pool.request().query(createUserTableQuery, (err, result) => {
//     if (err) {
//       console.error('Error creating User table:', err);
//       res.status(500).send('Error creating User table');
//     } else {
//       console.log('User table created or already exists');
//       res.send('User table created or already exists');
//     }
//   });
// });

// app.post('/addUser', (req, res) => {
//   const { userID, firstName, lastName, email, passwordHash } = req.body;

//   const addUserQuery = `
//     INSERT INTO [User] (UserID, FirstName, LastName, Email, PasswordHash)
//     VALUES (${userID}, '${firstName}', '${lastName}', '${email}', '${passwordHash}');
//   `;

//   pool.request().query(addUserQuery, (err, result) => {
//     if (err) {
//       console.error('Error adding user:', err);
//       res.status(500).send('Error adding user');
//     } else {
//       console.log('User added successfully');
//       res.send('User added successfully');
//     }
//   });
// });

// app.get('/', (req, res) => {
//   res.send('e, dyszak!');
// });
