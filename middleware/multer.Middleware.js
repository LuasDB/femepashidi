const multer = require('multer');

// Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Especifica la carpeta donde se almacenarán los archivos
    cb(null, './public/img/notifications');
  },
  filename: (req, file, cb) => {
    // Personaliza el nombre del archivo si es necesario
    cb(null,file.originalname);
  }
});

// Configura Multer con la configuración
const upload = multer({ storage: storage });

module.exports = { upload };
