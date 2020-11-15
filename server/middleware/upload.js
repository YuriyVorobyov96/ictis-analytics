const multer = require('multer');
const path = require('path');
const { badRequest } = require('../controllers/http-error');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/images');
  },
  filename(req, file, cb) {
    const originalName = `${path.basename(file.originalname, path.extname(file.originalname))}`;
    const dateName = `-${Date.now()}${path.extname(file.originalname)}`;
    const fullName = `${originalName}${dateName}`;

    cb(null, fullName);
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif|webp|svg/u;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  }

  return cb(badRequest({ fileType: 'Неверный формат файла.' }));
};

const limits = { fileSize: '1024' * '1024' * '5' };

module.exports = multer({ storage, fileFilter, limits }).single('file');
