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
  origin: '*',
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
      setupDatabase();
  }
});

app.use(cors(corsOptions));
app.use(express.json());

function setupDatabase() {
  const setupDatabaseQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      login VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      last_name VARCHAR(255),
      first_name VARCHAR(255),
      age INTEGER,
      email VARCHAR(255) UNIQUE NOT NULL,
      height DECIMAL(5, 2),
      weight DECIMAL(5, 2),
      gender VARCHAR(1),
      registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS category (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS exercise (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      description VARCHAR(255),
      category_id INTEGER REFERENCES category(id),
      user_id INTEGER REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS training (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      date DATE NOT NULL,
      begin_time TIME NOT NULL,
      end_time TIME NOT NULL,
      description VARCHAR(255),
      user_id INTEGER REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS training_exercise (
      training_id INTEGER REFERENCES training(id),
      exercise_id INTEGER REFERENCES exercise(id),
      set_amount INTEGER NOT NULL,
      rep_amount INTEGER NOT NULL,
      PRIMARY KEY (training_id, exercise_id)
    );
  `;

  client
      .query(setupDatabaseQuery)
      .then(() => {
          console.log('Database setup successfull');
      })
      .catch(err => console.log(err));

  const checkCategoryQuery = `SELECT COUNT(*) FROM category`;
  client.query(checkCategoryQuery)
    .then(result => {
      const rowCount = result.rows[0].count;
      if (rowCount == 0) {
        const insertCategoryQuery = `
          INSERT INTO "category" (name) VALUES 
          ('Klatka piersiowa'),
          ('Plecy'),
          ('Barki'),
          ('Biceps'),
          ('Triceps'),
          ('Brzuch'),
          ('Nogi'),
          ('Pośladki');
        `;
        return client.query(insertCategoryQuery);
      }
    })
    .catch(err => console.log(err));

  const checkExecriesQuery = `SELECT COUNT(*) FROM exercise`;
  client.query(checkExecriesQuery)
    .then(result => {
      const rowCount = result.rows[0].count;
      if (rowCount == 0) {
        const insertExercisesQuery = `
          INSERT INTO "exercise" (name, description, category_id) VALUES 
          ('Wyciskanie sztangi na ławce płaskiej', 'Ćwiczenie polegające na opuszczaniu i unoszeniu sztangi na ławce płaskiej.', 1),
          ('Rozpiętki', 'Ruchy ramion na boki, trzymając hantle, aby rozciągnąć i wzmocnić klatkę piersiową.', 1),
          ('Wyciskanie sztangi na ławce skośnej', 'Podobne do wyciskania na ławce płaskiej, ale na ławce skośnej, skupiające się na różnych obszarach klatki piersiowej.', 1),
          ('Pompki', 'Ćwiczenie wykorzystujące własną masę ciała, w którym ciało jest unoszone i opuszczane, wzmacniając mięśnie klatki piersiowej.', 1),
          ('Pullover', 'Ćwiczenie, w którym sztanga jest opuszczana za głowę, a następnie unoszona z powrotem, angażując mięśnie klatki piersiowej.', 1),
          ('Wyciskanie hantli na ławce płaskiej', 'Podobne do wyciskania sztangi, ale z użyciem hantli, co angażuje stabilizatory.', 1),
          ('Krzyżowanie linek wyciągu dolnego', 'Ruchy ramion wyciągu dolnego na przekrożeniu, izolujące mięśnie klatki piersiowej.', 1),
          ('Wyciskanie hantli na ławce skośnej', 'Podobne do wyciskania hantli na ławce płaskiej, ale na ławce skośnej, akcentujące różne obszary klatki piersiowej.', 1),
          ('Pompki diamentowe', 'Wariant pompki, w którym ręce są zbliżone, tworząc kształt diamentu, skupiając się na środkowej części klatki piersiowej.', 1),
          ('Martwy ciąg', 'Podstawowe ćwiczenie siłowe, angażujące głównie mięśnie pleców, nóg i pośladków.', 2),
          ('Wiosłowanie hantlami', 'Ćwiczenie wiosłujące, w którym hantle są unoszone ku górze, angażując mięśnie pleców.', 2),
          ('Podciąganie na drążku szerokim uchwytem', 'Ćwiczenie, w którym ciało jest unoszone ku górze, angażując głównie mięśnie grzbietu.', 2),
          ('Ściąganie wyciągu górnego do klatki', 'Ruchy ramion wyciągu górnego, izolujące mięśnie górnej części pleców.', 2),
          ('Wiosłowanie sztangą w opadzie tułowia', 'Wariant wiosłowania sztangą, w którym tułów jest nachylony do przodu, skupiający się na mięśniach środkowej części pleców.', 2),
          ('Wyciskanie żołnierskie', 'Ćwiczenie wyciskające, w którym sztanga jest unoszona nad głowę, angażując mięśnie barków.', 3),
          ('Unoszenie hantli bokiem', 'Ruchy ramion polegające na unoszeniu hantli na boki, izolujące mięśnie boczne barków.', 3),
          ('Arnold Press', 'Kombinacja unoszenia hantli na boki i obracania ramion, angażująca różne partie mięśni barków.', 3),
          ('Face Pulls', 'Ruchy ramion wyciągu górnego z użyciem liny, skupiające się na mięśniach obręczy barkowej i górnej części pleców.', 3),
          ('Unoszenie sztangi wzdłuż tułowia', 'Ćwiczenie polegające na unoszeniu sztangi wzdłuż tułowia, angażując mięśnie przednie i boczne barków.', 3),
          ('Uginanie hantli', 'Podstawowe ćwiczenie na biceps, polegające na uginaniu ramion z hantlami w dłoniach.', 4),
          ('Uginanie sztangi', 'Podstawowe ćwiczenie na biceps, polegające na uginaniu ramion z sztangą w dłoniach.', 4),
          ('Hammer Curls', 'Unoszenie hantli w taki sposób, aby dłonie były skierowane ku sobie, angażując różne partie mięśni bicepsa.', 4),
          ('Bayesian Curl', 'Uginanie przedramienia na lince wyciągu, skupiając się na izolacji mięśni bicepsa.', 4),
          ('Modlitewnik', 'Uginanie sztangi na modlitewniku, izolując miesięń dwugłowy ramienia.', 4),
          ('Wyciskanie francuskie', 'Ćwiczenie izolujące triceps, w którym sztanga jest opuszczana za głowę, a następnie unoszona.', 5),
          ('Rozpiętki na wyciągu górnym', 'Ruchy ramion na wyciągu górnym, izolujące mięśnie tricepsa.', 5),
          ('Dipy na poręczach', 'Unoszenie ciała na poręczach, angażując głównie tricepsy.', 5),
          ('Wyciskanie jednorącz hantli nad głową', 'Podobne do wyciskania sztangi, ale z użyciem hantli, skupiające się na mięśniach tricepsa.', 5),
          ('Crunches', 'Podstawowe ćwiczenie na mięśnie prostownika brzucha, polegające na unoszeniu górnej części tułowia.', 6),
          ('Leg Raises', 'Unoszenie nóg leżąc na plecach, angażujące mięśnie dolnego odcinka brzucha.', 6),
          ('Plank', 'Pozycja statyczna utrzymywana na przedramionach i palcach stóp, wzmacniająca mięśnie korpusu, w tym brzucha.', 6),
          ('Russian Twists', 'Rotacje tułowia w pozycji siedzącej, angażujące mięśnie skośne brzucha.', 6),
          ('Mountain Climbers', 'Ćwiczenie dynamiczne, w którym nogi są naprzemiennie przyciągane do klatki piersiowej, angażujące mięśnie brzucha i nóg.', 6),
          ('Bicycle Crunches', 'Unoszenie nóg i obracanie tułowia naprzemiennie, angażujące różne partie mięśni brzucha.', 6),
          ('Przysiady', 'Podstawowe ćwiczenie na nogi, polegające na uginaniu kolan i bioder.', 7),
          ('Wypychanie nóg na maszynie', 'Ćwiczenie izolujące mięśnie czworogłowe, polegające na wypychaniu nóg.', 7),
          ('Wykroki', 'Ćwiczenie angażujące mięśnie nóg i pośladków, polegające na krocznym wysunięciu jednej nogi do przodu.', 7),
          ('Prostownie nóg na maszynie', 'Ćwiczenie izolujące mięśnie dwugłowe uda, polegające na prostowaniu nóg.', 7),
          ('Wspięcia na palce', 'Unoszenie ciała na palcach stóp, angażujące mięśnie łydek.', 7),
          ('Romanian Deadlift', 'Wariant martwego ciągu, skupiający się na pracujących mięśniach pośladków i krygę ledźwiową.', 7),
          ('Adductor Machine', 'Ćwiczenie izolujące mięśnie przywodziciele, polegające na zamykaniu nóg przeciwko oporowi.', 7);
          `;
        return client.query(insertExercisesQuery);
      }
    })
    .catch(err => console.log(err));
}


  
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'User unauthorized - no access' });
  }
  jwt.verify(token, secretKey, (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ message: 'Token verification failed' });
    }
    req.user = decodedToken;
    next();
  });
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

    const token = jwt.sign({ userId: user.id, userLogin: user.login }, secretKey, { expiresIn: '7d' });

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

    if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return res.status(422).json({ message: 'Invalid email' });
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

app.get('/users/getUser', verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const query = `SELECT * FROM "users" WHERE id = $1`;
    const result = await client.query(query, [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    const user = result.rows[0];
    const userData = {
      id: user.id,
      login: user.login,
      last_name: user.last_name,
      first_name: user.first_name,
      age: user.age,
      email: user.email,
      height: user.height,
      weight: user.weight,
      gender: user.gender,
    };
    res.status(200).json(userData);
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/users/saveUser', verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const { last_name, first_name, age, height, weight, gender } = req.body;
    if (!/^[A-Za-z]+$/.test(first_name) || !/^[A-Za-z]+$/.test(last_name)) {
      return res.status(400).json({ message: 'First name and last name must contain only letters' });
    }

    if (!/^[0-9]+$/.test(age) || !/^[0-9]+(\.[0-9]+)?$/.test(height) || !/^[0-9]+(\.[0-9]+)?$/.test(weight)) {
      return res.status(400).json({ message: 'Age, height, and weight must be numbers' });
    }

    if (!/^[M|K]$/.test(gender)) {
      return res.status(400).json({ message: 'Gender must be "M" or "K"' });
    }

    const query = `
      UPDATE "users" SET last_name = $1, first_name = $2, age = $3, height = $4, weight = $5, gender = $6 WHERE id = $7
    `;

    await client.query(query, [last_name, first_name, age, height, weight, gender, userId]);

    res.status(200).json({ message: 'User data updated successfully' });
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/users/deleteUser', verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const query = `DELETE FROM "users" WHERE id = $1`;
    await client.query(query, [userId]);

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/exercises/addExercise', verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name, part, description } = req.body;
    if (name.length === 0 || part.length === 0 || description.length === 0) {
      return res.status(422).json({ message: 'Invalid credentials' });
    }

    const exerciseExistQuery = `SELECT * FROM "exercise" WHERE name = $1`;
    const exerciseExistResult = await client.query(exerciseExistQuery, [name]);

    if (exerciseExistResult.rows.length > 0) {
      return res.status(409).json({ message: 'Exercise already exists' });
    }

    const insertQuery = `INSERT INTO "exercise" (name, description, category_id, user_id) VALUES ($1, $2, $3, $4)`;
    await client.query(insertQuery, [name, description, part, userId]);

    res.status(200).json({ message: 'Exercise added successfully' });
  } catch (error) {
    console.error('Error adding exercise:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/exercises/getUserExercises', verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const query = `
      SELECT
        exercise.id,
        exercise.name AS exercise_name,
        exercise.description,
        category.name AS category_name
      FROM exercise
      JOIN category ON exercise.category_id = category.id
      WHERE exercise.user_id = $1
    `;
    const result = await client.query(query, [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Exercises not found" });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error, "Error getting user's exercises");
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/exercises/getExercises', verifyToken, async (req, res) => {
  try{
    const query = `
      SELECT
        exercise.id,
        exercise.name AS exercise_name,
        exercise.description,
        category.name AS category_name
      FROM exercise
      JOIN category ON exercise.category_id = category.id
    `;
    const result = await client.query(query);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Exercises not found' });
    }

    res.status(200).json(result.rows)
  }
  catch(error){
    console.log(error,"Error getting exercises")
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/exercises/deleteExercises', verifyToken, async (req, res) => {
  try {
    const exerciseIds = req.body.exerciseIds;

    if (!exerciseIds || !Array.isArray(exerciseIds)) {
      return res.status(400).json({ message: 'Invalid exercises' });
    }

    const deleteTrainingExerciseQuery = `DELETE FROM "training_exercise" WHERE exercise_id = ANY($1::integer[])`;
    await client.query(deleteTrainingExerciseQuery, [exerciseIds]);

    const query = `DELETE FROM "exercise" WHERE id = ANY($1::integer[])`;
    const params = [exerciseIds];
    await client.query(query, params);

    res.status(200).json({ message: 'Exercises deleted successfully' });
  } catch (error) {
    console.error('Error deleting exercises:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/trainings/add', verifyToken, async (req, res) => {
  try {
    const { name, date, beginTime, endTime, description, selectedExercises } = req.body;
    const userId = req.user.userId;
    const insertTrainingQuery = `
      INSERT INTO "training" (name, date, begin_time, end_time, description, user_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `;
    const result = await client.query(insertTrainingQuery, [name, date, beginTime, endTime, description, userId]);

    const trainingId = result.rows[0].id;

    for (const exercise of selectedExercises) {
      const { id, set_amount, rep_amount } = exercise;

      const insertTrainingExerciseQuery = `
        INSERT INTO training_exercise (training_id, exercise_id, set_amount, rep_amount)
        VALUES ($1, $2, $3, $4)
      `;
      await client.query(insertTrainingExerciseQuery, [trainingId, id, set_amount, rep_amount]);
    }

    res.status(200).json({ message: 'Training added successfully' });
  } catch (error) {
    console.error('Error adding training:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/trainings/getStats', verifyToken, async (req, res) => {
  try{
    const userId = req.user.userId;
    const query = `
      SELECT
        *
      FROM training
      WHERE user_id = $1
    `;
    const result = await client.query(query, [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Trainings not found' });
    }

    res.status(200).json(result.rows)
  }
  catch (error) {
    console.log(error, "Error getting trainings")
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/trainings/getTrainings', verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const trainingQuery = {
      text: `
        SELECT
          t.id AS training_id,
          t.name AS training_name,
          t.date,
          t.begin_time,
          t.end_time,
          t.description AS training_description,
          (
            SELECT json_agg(
              json_build_object(
                'exercise_id', e.id,
                'exercise_name', e.name,
                'exercise_description', e.description,
                'set_amount', te.set_amount,
                'rep_amount', te.rep_amount
              )
            )
            FROM training_exercise te
            LEFT JOIN exercise e ON te.exercise_id = e.id
            WHERE te.training_id = t.id
          ) AS exercises
        FROM training t
        WHERE t.user_id = $1
      `,
      values: [userId],
    };

    const result = await client.query(trainingQuery);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Trainings not found' });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error, "Error getting trainings");
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/categories', async (req, res) => {
  try {
    const query = `SELECT * FROM "category"`;
    const result = await client.query(query);
    const categories = result.rows;
    const categoriesData = categories.map(exercise => {
      return {
        name: exercise.name,
      }
    });
    res.status(200).json(categoriesData);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/exercises/browse', verifyToken, async (req, res) => {
  try {
    const query = `SELECT * FROM "exercise"`;

    const result = await client.query(query);
    const exercises = result.rows;
    const exercisesData = exercises.map(exercise => {
      return {
        name: exercise.name,
        description: exercise.description,
        category: exercise.category_id
      }
    });
    res.status(200).json(exercisesData);
  }
  catch (error) {
    console.error('Error browsing exercises');
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/exercises/edit/:id', verifyToken, async (req, res) => {
  const exerciseId = req.params.id;
  const userId = req.user.userId;
  try {
    const query = `
      SELECT
        exercise.id,
        exercise.name AS exercise_name,
        exercise.description,
        category.name AS category_name
      FROM exercise
      JOIN category ON exercise.category_id = category.id
      WHERE exercise.id = $1 AND exercise.user_id = $2
    `;
    const result = await client.query(query, [exerciseId, userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Exercise not found for user' });
    }
    res.status(200).json(result.rows[0]);
    console.log(result.rows[0]);
  } catch (error) {
    console.log(error, "Error getting exercise");
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/trainings/edit/:id', verifyToken, async (req, res) => {
  try {
    const trainingId = req.params.id;
    const { name, date, beginTime, endTime, description, selectedExercises } = req.body;
    const userId = req.user.userId;
    const updateTrainingQuery = `
      UPDATE training
      SET name = $1, date = $2, begin_time = $3, end_time = $4, description = $5
      WHERE id = $6
    `;
    await client.query(updateTrainingQuery, [name, date, beginTime, endTime, description, trainingId]);

    const deleteTrainingExerciseQuery = `DELETE FROM "training_exercise" WHERE training_id = $1`;
    await client.query(deleteTrainingExerciseQuery, [trainingId]);
    console.log(selectedExercises);
    
    for (const exercise of selectedExercises) {
      const { id, set_amount, rep_amount } = exercise;

      const insertTrainingExerciseQuery = `
        INSERT INTO training_exercise (training_id, exercise_id, set_amount, rep_amount)
        VALUES ($1, $2, $3, $4)
      `;
      await client.query(insertTrainingExerciseQuery, [trainingId, id, set_amount, rep_amount]);
    }
    res.status(200).json({ message: 'Training updated successfully' });
  } catch (error) {
    console.error('Error updating training:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/trainings/edit/:id', verifyToken, async (req, res) => {
  const trainingId = req.params.id;
  console.log('Training ID:', trainingId);
  try {
    const query = `
      SELECT
      training.id,
      training.name AS training_name,
      training.date,
      training.begin_time,
      training.end_time,
      training.description AS training_description,
      (
        SELECT json_agg(
          json_build_object(
            'id', e.id,
            'exercise_name', e.name,
            'description', e.description,
            'set_amount', te.set_amount,
            'rep_amount', te.rep_amount
          )
        )
        FROM training_exercise te
        LEFT JOIN exercise e ON te.exercise_id = e.id
        WHERE te.training_id = training.id
      ) AS exercises
    FROM training
    WHERE training.id = $1
    `;
    const result = await client.query(query, [trainingId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Training not found' });
    }
    res.status(200).json(result.rows[0]);
    console.log(result.rows[0]);
    console.log("Training fetched successfully")
  } catch (error) {
    console.log(error, "Error getting training");
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/exercises/edit/:id', verifyToken, async (req, res) => {
  try{
  const exerciseId = req.params.id;
  const {name, description, part} = req.body;
  
    const updateQuery = `
    UPDATE exercise
    SET name = $1, description = $2, category_id = $3
    WHERE id = $4
  `;
  await client.query(updateQuery, [name, description, part, exerciseId]);
  res.status(200).json({ message: 'Exercise updated successfully' });
  } catch (error) {
    console.log(error, "Error updating exercise");
    res.status(500).json({ message: 'Internal server error' });
  }
});