// const Sequelize = require('sequelize');

// const sequelize = new Sequelize(
//   process.env.DATABASE_NAME,
//   process.env.DATABASE_USER,
//   process.env.DATABASE_PASSWORD,
//   {
//     host: process.env.DATABASE_HOST,
//     dialect: 'postgres',
//   }
// );

// const connectDB = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('Database successfully connected!');
//   } catch (err) {
//     console.log(`Unable to connect to database: ${err.message}`);
//   }
// };

// connectDB();

// // sync database
// sequelize.sync();

// module.exports = sequelize;

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});

const connectDB = async () => {
  try {
    await pool.connect();
    console.log('Database successfully connected');
  } catch (err) {
    console.error(err.message);
  }
};

connectDB();

module.exports = pool;
