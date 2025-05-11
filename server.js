require('dotenv').config();

const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();

const cors = require('cors');
app.use(cors());

const upload = multer({ dest: 'uploads/' });

app.post('/send-email', upload.single('file'), async (req, res) => {
  const { to } = req.body;
  const file = req.file;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: 'renzorevq@gmail.com',
    to,
    subject: 'Matematica Computacional - Comprension de datos (Huffman)',
    text: 'Ingrese a google.com.pe y cargue el archivo adjunto, para descomprimirlo',
    attachments: [
      {
        filename: file.originalname,
        path: file.path
      }
    ]
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send('Correo enviado con éxito');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al enviar el correo');
  }
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
