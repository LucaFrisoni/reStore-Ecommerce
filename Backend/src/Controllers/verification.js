const nodemailer = require('nodemailer');
const Token = require('../Database/models/Tokens');

const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
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

async function postVerifyUser(req, res) {
  const {
    email,
    uuid,
    userName,
    password,
    genero,
    nacimiento,
    ubiCiudad,
    ubiDireccion,
    ubiCodigoPostal,
    apellido,
  } = req.body;

  try {
    const newVerify = new Token({ token: uuid });
    const savedToken = await newVerify.save();

    const encodedUuid = encodeURIComponent(uuid); // hace que los caracteres especiales se conviertan en la url
    const encodedApellido = encodeURIComponent(apellido); // hace que los caracteres especiales se conviertan en la url
    const encodedEmail = encodeURIComponent(email);
    const encodedUser = encodeURIComponent(userName);
    const encodedPassword = encodeURIComponent(password);
    const encodedGenero = encodeURIComponent(genero); // hace que los caracteres especiales se conviertan en la url
    const encodedNacimiento = encodeURIComponent(nacimiento);
    const encodedCiudad = encodeURIComponent(ubiCiudad);
    const encodedDireccion = encodeURIComponent(ubiDireccion);
    const encodedCodigoPostal = encodeURIComponent(ubiCodigoPostal);
    const verifyEmailUrl = `https://re-store-six.vercel.app/login/signup?token=${encodedUuid}&userName=${encodedUser}&apellido=${encodedApellido}&password=${encodedPassword}&email=${encodedEmail}&genero=${encodedGenero}&nacimiento=${encodedNacimiento}&ciudad=${encodedCiudad}&direccion=${encodedDireccion}&codigoPostal=${encodedCodigoPostal}`;
    const mailOptions = {
      from: 'reStorePFHenry@gmail.com',
      to: email,
      subject: 'Confirmación de correo electrónico',
      html: `
          <h3>Hola ${userName},</h3>
          <p>Gracias por registrarte en nuestra aplicación.</p>
          <p>Para confirmar tu correo electrónico, haz clic en el siguiente enlace:</p>
          <a href="${verifyEmailUrl}">Confirmar correo electrónico</a>
        `,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Correo electrónico de confirmación enviado');
        res
          .status(200)
          .json({ message: 'Correo electrónico de confirmación enviado' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error });
  }
}

async function getVerifyUser(req, res) {
  const { uuid } = req.params;
  try {
    const verification = await Token.findOne({ token: { $eq: uuid } });
    if (verification) {
      res.status(200).json(verification);
    } else {
      res.status(400).json({ message: 'Verification denied' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  postVerifyUser,
  getVerifyUser,
};
