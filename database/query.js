const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: 'postgres',
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenicate();
    console.log('Database successfully connected!');
  } catch (err) {
    console.log(`Unable to connect to database: ${err.message}`);
  }
};

connectDB();

// sync database
sequelize.sync();

module.exports = sequelize;
