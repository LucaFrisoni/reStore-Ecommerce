const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'reStorePFHenry@gmail.com',
    pass: 'vrczzeekxahsxrvb',
  },
  tls: {
    rejectUnauthorized: false, // Ignorar la verificación del certificado
  },
});

const sendEmailController = (req, res) => {
  const { direccion, envio, mail } = req.body;

  // Configurar los detalles del correo electrónico
  const mailOptions = {
    from: 'reStorePFHenry@gmail.com',
    to: mail,
    subject: 'Información de envío', // Asunto del correo electrónico
    text: envio
      ? `Le enviaremos su producto a la siguiente dirección:\n\nCiudad: ${direccion.ciudad}\nCódigo Postal: ${direccion.codigoPostal}\nCalle: ${direccion.calle}\n\nEl producto llegará en aproximandamente 15 días.`
      : 'Su producto está listo para ser recogido en nuestra dirección Avenida Siempre Viva 742.',
  };

  // Enviar el correo electrónico
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo electrónico:', error);
      res.status(500).json({ error: 'Error al enviar el correo electrónico' });
    } else {
      console.log('Correo electrónico enviado:', info.response);
      res.json({ message: 'Correo electrónico enviado correctamente' });
    }
  });
};

module.exports = { sendEmailController };
