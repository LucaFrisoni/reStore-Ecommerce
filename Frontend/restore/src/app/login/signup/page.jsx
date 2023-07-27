'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import './Signup.css';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import Boton from '@/app/components/Button/Button';

function Signup() {
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if (urlParams.has('token')) {
      const token = urlParams.get('token');
      const userName = urlParams.get('userName');
      const password = urlParams.get('password');
      const email = urlParams.get('email');
      const genero = urlParams.get('genero');
      const nacimiento = urlParams.get('nacimiento');
      const ciudad = urlParams.get('ciudad');
      const direccion = urlParams.get('direccion');
      const codigoPostal = urlParams.get('codigoPostal');
      const apellido = urlParams.get('apellido');

      const handleQuery = async () => {
        try {
          const decodedToken = decodeURIComponent(token);
          const decodedApellido = decodeURIComponent(apellido);
          const decodedUserName = decodeURIComponent(userName);
          const decodedPassword = decodeURIComponent(password);
          const decodedEmail = decodeURIComponent(email);
          const decodedGenero = decodeURIComponent(genero);
          const decodedNacimiento = decodeURIComponent(nacimiento);
          const decodedCiudad = decodeURIComponent(ciudad);
          const decodedDireccion = decodeURIComponent(direccion);
          const decodedCodigoPostal = decodeURIComponent(codigoPostal);
          const { data } = await axios.get(
            `https://re-store.onrender.com/users/verify_emaill/${decodedToken}`
          );

          if (data.token === decodedToken) {
            await axios.post('https://re-store.onrender.com/users', {
              nombre: decodedUserName,
              apellido: decodedApellido,
              contraseña: decodedPassword,
              email: decodedEmail,
              genero: decodedGenero,
              fechaNacimiento: decodedNacimiento,
              ubicacion: [
                {
                  ciudad: decodedCiudad,
                  direccion: decodedDireccion,
                  codigoPostal: Number(decodedCodigoPostal),
                },
              ],
            });
            setMessage('Usuario Creado');
          } else {
            setMessage('Verificación denegada');
          }
        } catch (error) {
          console.log(error);
        }
      };

      handleQuery();
    }
  }, []);

  const URL = 'https://re-store.onrender.com/users';

  const [message, setMessage] = useState('');
  const [flag, setFlag] = useState(false);
  const [user, setUser] = useState({
    userName: '',
    userLastName: '',
    email: '',
    password: '',
    confirm_password: '',
    genero: '',
    fechaNacimiento: '',
    ubiCiudad: '',
    ubiDireccion: '',
    ubiCodigoPostal: '',
  });
  const [errors, setErrors] = useState({
    userName: '',
    userLastName: '',
    email: '',
    password: '',
    confirm_password: '',
    genero: '',
    fechaNacimiento: '',
    ubiCiudad: '',
    ubiDireccion: '',
    ubiCodigoPostal: '',
  });
  // ----------------------------------------------------------------Validates------------------------------------------------------------------------------
  async function validate(user) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/;
    const error = {};

    if (user.userName && user.userName.length > 30) {
      error.userName = 'Por favor ingresa solo tu primer nombre';
    }

    if (user.LastName && user.LastName.length > 40) {
      error.userName = 'Por favor ingresa solo 1 apellido';
    }

    if (!emailRegex.test(user.email)) {
      error.email = 'Debes ingresar un email válido';
    }

    try {
      if (user.email) {
        const { data } = await axios.get(
          `https://re-store.onrender.com/users/${user.email}/email`
        );
        if (!data.error) {
          if (data.email === user.email) {
            error.email = 'Ya existe una cuenta con ese email';
          }
        }
      }
    } catch (error) {
      error.email = 'Error de conexión';
      return error;
    }

    if (!passwordRegex.test(user.password)) {
      error.password =
        'Debe incluir una mayúscula, un número y un carácter especial';
    }

    if (user.password !== user.confirm_password) {
      error.confirm_password = 'Las contraseñas no son las mismas';
    }

    if (!user.genero) {
      error.genero = 'Debes completar este campo';
    }

    if (!user.fechaNacimiento) {
      error.fechaNacimiento = 'Debes indicar tu fecha de Nacimiento';
    }

    return error;
  }

  // ----------------------------------------------------------------Handlers------------------------------------------------------------------------------
  const handleInputs = async (event) => {
    const input_name = event.target.name;
    const input_value = event.target.value;

    setUser({
      ...user,
      [input_name]: input_value,
    });
    if (flag === true) {
      setFlag(false);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = await validate(user);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      if (flag) {
        setFlag(false); // Cambia flag a false si ya se creó un usuario anteriormente
      } else {
        const uuid = uuidv4();
        await axios.post('https://re-store.onrender.com/users/verify_email', {
          email: user.email,
          uuid,
          userName: user.userName,
          apellido: user.userLastName,
          password: user.password,
          genero: user.genero,
          nacimiento: user.fechaNacimiento,
          ubiCiudad: user.ubiCiudad,
          ubiDireccion: user.ubiDireccion,
          ubiCodigoPostal: user.ubiCodigoPostal,
        });

        setFlag(true);
      }
    }
  };
  // max-w-md sm:w-screen
  return (
    <div className='min-h-screen grid place-content-center bg-slate  '>
      <form
        onSubmit={handleSubmit}
        className=' mx-auto  rounded-lg shadow-xl shadow-slate-400 bg-slate-200 p-12 sm:my-8 grid gap-4 w-screen sm:w-[610px] '
      >
        <h2 className='text-2xl font-bold'>Sign up</h2>
        <div className='grid sm:grid-cols-2 sm:gap-8 '>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <label className='font-medium'>Nombre</label>
              <input
                className='text-sm py-3 px-6 bg-slate-50 rounded-lg shadow shadow-slate-300'
                type='text'
                required
                name='userName'
                value={user.userName}
                onChange={handleInputs}
              ></input>

              <p className='text-red-500 font-medium'>{errors.userName}</p>
            </div>
            <div className='grid gap-2'>
              <label className='font-medium'>Apellido</label>
              <input
                className='text-sm py-3 px-6 bg-slate-50 rounded-lg shadow shadow-slate-300'
                type='text'
                required
                name='userLastName'
                value={user.userLastName}
                onChange={handleInputs}
              ></input>
              <p className='text-red-500 font-medium'>{errors.userLastName}</p>
            </div>
            <div className='grid gap-2'>
              <label className='font-medium'>Direccion Email</label>
              <input
                className='text-sm py-3 px-6 bg-slate-50 rounded-lg shadow shadow-slate-300'
                type='email'
                required
                name='email'
                value={user.email}
                onChange={handleInputs}
              ></input>

              <p className='text-red-500 font-medium'>{errors.email}</p>
            </div>
            <div className='grid gap-2'>
              <label className='font-medium'>Crear Contraseña</label>
              <input
                className='text-sm py-3 px-6 bg-slate-50 rounded-lg shadow shadow-slate-300'
                type='password'
                required
                name='password'
                value={user.password}
                onChange={handleInputs}
              ></input>

              <p className='text-red-500 font-medium'>{errors.password}</p>
            </div>
            <div className='grid gap-2'>
              <label className='font-medium'>Confirma Contraseña</label>
              <input
                className='text-sm py-3 px-6 bg-slate-50 rounded-lg shadow shadow-slate-300'
                type='password'
                required
                name='confirm_password'
                value={user.confirm_password}
                onChange={handleInputs}
              ></input>
              <p className='text-red-500 font-medium'>
                {errors.confirm_password}
              </p>
            </div>
          </div>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <label className='font-medium' htmlFor='genero'>
                Género
              </label>
              <select
                className='text-sm py-3 px-6 bg-slate-50 rounded-lg shadow shadow-slate-300'
                name='genero'
                defaultValue=''
                onChange={handleInputs}
              >
                <option name='genero' value='' disabled hidden>
                  Selecciona un género
                </option>
                <option name='genero' value='Masculino'>
                  Masculino
                </option>
                <option name='genero' value='Femenino'>
                  Femenino
                </option>
                <option name='genero' value='Otro'>
                  Otro
                </option>
              </select>
              <p className='text-red-500 font-medium'>{errors.genero}</p>
            </div>
            <div className='grid gap-2'>
              <label className='font-medium' htmlFor='date'>
                Fecha de nacimiento
              </label>
              <input
                className='text-sm py-3 px-6 bg-slate-50 rounded-lg shadow shadow-slate-300'
                type='date'
                required
                name='fechaNacimiento'
                value={user.fechaNacimiento}
                onChange={handleInputs}
              ></input>
              <p className='text-red-500 font-medium'>
                {errors.fechaNacimiento}
              </p>
            </div>
            <div className='grid gap-2'>
              <label className='font-medium'>Ciudad donde vives</label>
              <input
                className='text-sm py-3 px-6 bg-slate-50 rounded-lg shadow shadow-slate-300'
                type='text'
                required
                name='ubiCiudad'
                value={user.ubiCiudad}
                onChange={handleInputs}
              ></input>
              <p className='text-red-500 font-medium'>{errors.ubiCiudad}</p>
            </div>
            <div className='grid gap-2'>
              <label className='font-medium'>Direccion</label>
              <input
                className='text-sm py-3 px-6 bg-slate-50 rounded-lg shadow shadow-slate-300'
                type='text'
                required
                name='ubiDireccion'
                value={user.ubiDireccion}
                onChange={handleInputs}
              ></input>
              <p className='text-red-500 font-medium'>{errors.ubiDireccion}</p>
            </div>
            <div className='grid gap-2'>
              <label className='font-medium'>Codigo Postal</label>
              <input
                className='text-sm py-3 px-6 bg-slate-50 rounded-lg shadow shadow-slate-300'
                type='number'
                required
                name='ubiCodigoPostal'
                value={user.ubiCodigoPostal}
                onChange={handleInputs}
              ></input>
              <p className='text-red-500 font-medium'>
                {errors.ubiCodigoPostal}
              </p>
            </div>
          </div>
        </div>
        <Boton type='submit' text={'Crea tu cuenta'}></Boton>
        <div className='grid gap-2'>
          <p className='font-medium text-lg text-center text-blue-700'>
            {flag ? 'Verifica tu email' : null}
          </p>
          <p>{message}</p>
          <label className='font-medium' htmlFor=''>
            Ya sos miembro?{' '}
          </label>
          <Link className='grid bg-slate-100 rounded-lg' href={'/login'}>
            <Boton text={'Log in'} secondary={true}></Boton>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
