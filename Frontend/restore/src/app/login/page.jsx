'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';
// import './login.css';
import Link from 'next/link';
import { signIn, getProviders, useSession } from 'next-auth/react';
import Swal from 'sweetalert2';
import Image from 'next/image';
import Boton from '../components/Button/Button';

function Login() {
  const router = useRouter();
  const URL = 'https://re-store.onrender.com/users';
  // ----------------------------------------------------------------Hooks------------------------------------------------------------------------------
  useEffect(() => {
    const setProv = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setProv();
  }, []);

  const handleSignIn = async (providerId) => {
    const result = await signIn(providerId, { callbackUrl: '/home' });
    // Redirigir al usuario al home después de iniciar sesión correctamente
  };
  // ----------------------------------------------------------------States------------------------------------------------------------------------------
  const [submitted, setSubmitted] = useState(false);
  const [providers, setProviders] = useState(null);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  // ----------------------------------------------------------------Validates------------------------------------------------------------------------------

  async function validate(user) {
    const error = {};
    let userFind = null;

    try {
      if (user.email && user.email) {
        const { data } = await axios.get(
          `https://re-store.onrender.com/users/${user.email}/email`
        );
        if (data.error) {
          error.email = 'Usuario no existe';
          return error;
        }

        if (user.password) {
          const passwordMatch = await bcrypt.compare(
            user.password,
            data.contraseña
          );
          if (!passwordMatch) {
            error.password = 'Contraseña incorrecta';
          }
        }
      }
    } catch (error) {
      // Manejo explícito del error de Axios
      error.email = 'Usuario no existe';
      return error;
    }

    return error;
  }

  // ----------------------------------------------------------------Validates------------------------------------------------------------------------------

  // useEffect(() => {
  //   // Aplicar estilos al body cuando el componente se monta

  //   document.body.style.background = 'black';

  //   // Restaurar los estilos originales del body cuando el componente se desmonta
  //   return () => {
  //     document.body.style.background = '';
  //   };
  // }, []);
  // ----------------------------------------------------------------Handlers------------------------------------------------------------------------------

  const handleInputs = (event) => {
    const input_name = event.target.name;
    const input_value = event.target.value;
    setUser({
      ...user,
      [input_name]: input_value,
    });
  };

  const { status } = useSession();
  useEffect(() => {
    console.log(document.cookie.includes('User_id'));
    if (status === 'authenticated' || document.cookie.includes('User_id')) {
      router.push('/home');
    }
  }, [status]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = await validate(user);
    setErrors(validationErrors);
    setSubmitted(true);
    if (Object.keys(validationErrors).length === 0) {
      localStorage.setItem('isLoggedIn', 'true');
      const expirationDate = new Date();
      expirationDate.setMonth(expirationDate.getMonth() + 1);
      const { data } = await axios.get(
        `https://re-store.onrender.com/users/${user.email}/email`
      );
      if (data._id == '649a1713b5f91733f2cbf8ed') {
        document.cookie =
          'Admin=true; expires=${expirationDate.toUTCString()}; path=/';
      }
      if (data.ban === true) {
        Swal.fire({
          icon: 'error',
          title: '¡Estás baneado!',
          text: 'Estás baneado indefinidamente. No podrás iniciar sesión.',
        });
        return;
      }

      document.cookie = `User_id=${
        data._id
      }; expires=${expirationDate.toUTCString()}; path=/`;
      router.push('/home');
    }
    setSubmitted(false);
  };

  const disabled = Object.keys(errors).length > 0 && submitted;

  return (
    <div className='min-h-screen grid place-content-center bg-slate'>
      <form
        className=' mx-auto max-w-lg rounded-lg shadow-xl shadow-slate-400 bg-slate-200 p-12 my-8 grid gap-6'
        onSubmit={handleSubmit}
      >
        <div className='grid gap-2  '>
          <div className='flex gap-4 '>
            <h1 className='text-2xl font-bold'>Login</h1>
            <span>
              <Image src='/User.svg' width={30} height={30}></Image>
            </span>
          </div>
          <p className='text-gray-600 '>
            ¡Hola, bienvenido de vuelta a tu cuenta!
          </p>
        </div>
        <div className='grid gap-2'>
          <label className='font-medium' htmlFor='email'>
            Email:{' '}
          </label>
          <input
            className='text-sm py-3 px-6 bg-slate-50 rounded-lg shadow shadow-slate-300'
            type='text'
            name='email'
            value={user.email}
            placeholder='Direccion de email'
            onChange={handleInputs}
            required
          ></input>
          <p className='text-blue-900 font-medium'>{errors.email}</p>
        </div>
        <div className='grid gap-2'>
          <label htmlFor='password' className='font-medium'>
            Contraseña:{' '}
          </label>
          <input
            className='text-sm py-3 px-6 bg-slate-50 rounded-lg shadow shadow-slate-300'
            placeholder='Contraseña'
            type='password'
            name='password'
            value={user.password}
            onChange={handleInputs}
            required
          ></input>
          <p className='text-blue-900 font-medium'>{errors.password}</p>
          <Link
            className=' text-blue-700 font- hover:underline decoration-2'
            href={'/login/changepassword'}
          >
            <span>¿Olvidaste tu contraseña?</span>
          </Link>
        </div>
        <Boton text={'Login'} type='submit' value='Login' disabled={disabled} />
        {/* hr con texto */}
        <div className='flex items-center'>
          <div className='flex-grow h-px bg-gray-400'></div>
          <span className='flex-shrink  text-gray-600 px-2 font-light -my-2 text-sm'>
            O inicia sesión con:
          </span>
          <div className='flex-grow h-px bg-gray-400'></div>
        </div>
        <div className='grid grid-cols-2 gap-2'>
          <div
            tabIndex={0}
            className='cursor-pointer text-slate-50 font-medium py-2 flex gap-4 items-center transition hover:bg-blue-600 bg-blue-500 px-2 rounded-lg shadow shadow-slate-300'
            onClick={() => handleSignIn('google')}
          >
            <Image
              className='bg-slate-50 rounded-full p-2'
              width={30}
              height={30}
              src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
            />
            Google
          </div>
          <div
            tabIndex={0}
            className='cursor-pointer text-slate-50 font-medium py-2 flex gap-4 items-center bg-gray-900 px-2 rounded-lg shadow shadow-slate-300 transition hover:bg-black'
            onClick={() => handleSignIn('github')}
          >
            <Image
              className='bg-gray-900 rounded-full '
              width={30}
              height={30}
              src='data:image/png;base64,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'
              alt='github'
            />
            Github
          </div>
        </div>
        <p>
          ¿No estás registrado?{' '}
          <Link
            className='font-medium hover:underline hover:decoration-2 transition'
            href={'/login/signup'}
          >
            Crea una cuenta
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
