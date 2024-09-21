const upload = require('./../functions/multer-config');

// Middleware para configurar multer dinámicamente
const configureUpload = (req, res, next) => {
  const { collection } = req.params;
  req.upload = upload(collection);
  next();
};

const configureUploadUsers = (req, res, next) => {

  req.upload = upload('users');
  next();
};

const configureStream = (req, res, next) => {

  req.upload = upload('stream');
  next();
};

module.exports = {configureUpload,configureUploadUsers,configureStream}
