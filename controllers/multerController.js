const multer = require('multer');

const AppError = require('../utils/appError');

// Multer settings
// store diskStorage
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}-${Date.now()}`);
  },
});

// multer filter
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image') || file.mimetype.startsWith('video')) {
    cb(null, true);
  } else {
    cb(new AppError('Please upload video or image only', 400), false);
  }
};

const multerUpload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  //   limits: { fileSize: 5000000 },
});

module.exports = multerUpload;
