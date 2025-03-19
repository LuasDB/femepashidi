const express = require('express');
const router = express.Router();
const { db,server } = require('../db/firebase')
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'mail.femepashidi.com.mx', // Reemplaza 'tudominio.com' con el nombre de tu servidor SMTP
  port: 465, // Puerto SMTP seguro (reemplaza con el puerto adecuado)
  secure: true, // Habilitar SSL/TLS
  auth: {
      user: 'registros@femepashidi.com.mx', // Reemplaza con tu dirección de correo electrónico
      pass: 'Registros2024@' // Reemplaza con tu contraseña de correo electrónico
  }
  // service: 'gmail',
  // auth: {
  //     user:'luasjcr.3543@gmail.com',
  //     pass:'fyzb llwd vqrv epaa'
  //}
});

router.get('/', async(req, res,next) => {
  try {
    const userslist =await db.collection('femepashidi').doc('users').get();
    const users = userslist.data().usersList
    const filteredUsers = users.filter(user => user.curp.includes('MNE') || user.curp.includes('HNE'));
    const emails = filteredUsers.map(user => user.correo);
    emails.push('saul.delafuenteb@gmail.com');

    const html = `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      background-color: #ffffff;
      margin: 20px auto;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      max-width: 600px;
    }
    .header {
      text-align: center;
      font-size: 24px;
      color: #333333;
      margin-bottom: 20px;
    }
    .content {
      font-size: 16px;
      color: #555555;
      line-height: 1.5;
    }
    .button {
      display: block;
      width: 200px;
      margin: 20px auto;
      padding: 10px 0;
      background-color: #007bff;
      color: #ffffff;
      text-align: center;
      text-decoration: none;
      border-radius: 4px;
      font-size: 16px;
    }
    .button:hover {
      background-color: #0056b3;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">Confirmación de Nacionalidad</div>
    <div class="content">
      <p>Hola,</p>
      <p>Estamos encantados de tenerte en nuestra plataforma. Para completar tu registro, necesitamos confirmar tu nacionalidad.</p>
      <p>Por favor, envía una copia de tu acta de nacimiento a nuestro correo electrónico <strong>registros@femepashidi.com.mx</strong> lo antes posible.</p>
      <p>Esto es un paso importante para mantener tu cuenta activa y asegurar el cumplimiento de nuestros requisitos de registro.</p>
      <p>Te agradecemos tu cooperación y te pedimos que completes este proceso antes del <strong>24 de enero del 2025</strong>.</p>
      <a href="mailto:registros@femepashidi.com.mx" class="button">Enviar Acta de Nacimiento</a>
      <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
      <p>Atentamente,<br>El equipo de FEMEPASHIDI</p>
    </div>
  </div>
</body>
</html>
`

 // Configurar el correo
 const mailOptions = {
  from: 'registros@femepashidi.com.mx',
  to: 'no-reply@femepashidi.com.mx', // Dirección ficticia o genérica
  bcc: emails, // Lista de correos en BCC
  subject: 'Confirmación Urgente de Nacionalidad Necesaria',
  text: 'Confirmación Urgente de Nacionalidad',
  html: html
};
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error al enviar el correo', error });
  }
  console.log('Correo enviado: ' + info.response);
  res.status(200).json({ message: 'Correos enviados', users: filteredUsers, emails });
});




  } catch (error) {
    next(error);
  }
});
module.exports = router;
