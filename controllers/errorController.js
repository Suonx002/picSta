const AppError = require('../utils/appError');

const handleJWTError = () => {
  return new AppError('Invalid token. Please log in again!', 401);
};

const handleJWTExpiredError = () => {
  return new AppError('Your token has expired! Please log in again.', 401);
};

module.exports = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // json web token errors
  if (error.name === 'JsonWebTokenError') error = handleJWTError();
  if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

  res.status(error.statusCode || 500).json({
    status: 'fail',
    message: error.message || 'Server Error. Please try again later.',
  });
};
