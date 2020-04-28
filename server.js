const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const globalErrorsHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

const userRoute = require('./routes/userRoutes');
const postRoute = require('./routes/postRoutes');

const app = express();

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use('/api/v1/users', userRoute);
app.use('/api/v1/posts', postRoute);

// catach errors (all verbs: get post put patch ,etc.)
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 400));
});

app.use(globalErrorsHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
