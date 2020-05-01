const AppError = require('../utils/appError');

const handleJWTError = () => {
  return new AppError('Invalid token. Failed to verify authorization.', 401);
};

const handleJWTExpiredError = () => {
  return new AppError('Your token has expired!', 401);
};

const handleDuplicateKey = () => {
  return new AppError(
    'Username or email is taken, please use a different one!',
    400
  );
};

module.exports = (err, req, res, next) => {
  let error = { ...err };

  console.log(err.code);
  error.message = err.message;

  // json web token errors
  if (error.name === 'JsonWebTokenError') error = handleJWTError();
  if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();
  if (error.code === '23505') error = handleDuplicateKey();

  res.status(error.statusCode || 500).json({
    status: 'fail',
    data: {
      message: error.message || 'Server Error. Please try again later.',
    },
  });
};
