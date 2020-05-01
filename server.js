const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const globalErrorsHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

const userRoute = require('./routes/userRoutes');
const postRoute = require('./routes/postRoutes');
const commentRoute = require('./routes/commentRoutes');
const likeRoute = require('./routes/likeRoutes');

const auth = require('./middlewares/auth');

const app = express();

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(auth.apiKey);

// routes
app.use('/api/v1/users', userRoute);
app.use('/api/v1/posts', postRoute);
app.use('/api/v1/comments', commentRoute);
app.use('/api/v1/likes', likeRoute);

// catach errors (all verbs: get post put patch ,etc.)
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 400));
});

app.use(globalErrorsHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
