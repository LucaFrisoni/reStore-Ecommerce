'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Navbar } from '../../../components/navbar/navbar';
import axios from 'axios';
import './form.css';
import BackButton from '@/app/components/backButton/BackButton';
import Boton from '@/app/components/Button/Button';
function UbiForm() {
  const { data: session, status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (!session && !document.cookie.includes('User_id')) {
      router.push('/login');
      return;
    }
  }, []);

  const [flag, setFlag] = useState(false);
  const [idUser, setId] = useState(null);
  const [user, setUser] = useState({
    direccion: '',
    ciudad: '',
    codigoPostal: '',
  });
  const [errors, setErrors] = useState({
    direccion: '',
    ciudad: '',
    codigoPostal: '',
  });

  useEffect(() => {
    if (session) {
      let idUserr = session.user.id;
      setId(idUserr);
    } else {
      if (document.cookie.includes('User_id')) {
        const cookieValue = document.cookie
          .split('; ')
          .find((row) => row.startsWith('User_id='))
          .split('=')[1];
        setId(cookieValue);
      }
    }
  }, [session]);

  async function validate(user) {
    const error = {};

    return error;
  }

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
        await axios.put('https://re-store.onrender.com/users/ubication/add', {
          id: idUser,
          ciudad: user.ciudad,
          direccion: user.direccion,
          codigoPostal: user.codigoPostal,
        });

        setFlag(true);
      }
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <div className='container mx-auto px-4 my-4'>
        <BackButton />
        <form
          onSubmit={handleSubmit}
          className='grid gap-4  max-w-[400px] mx-auto bg-slate-50 rounded-lg shadow-lg shadow-slate-300 p-4 mt-4'
        >
          <div className='grid gap-2'>
            <span className='font-medium text-base'>Ciudad donde vives</span>
            <input
              className='grid gap-4 bg-slate-100 rounded-lg shadow shadow-slate-300 px-4 py-2 mt-4'
              type='text'
              required
              name='ciudad'
              value={user.ciudad}
              onChange={handleInputs}
            ></input>
            <p className='erorrp'>{errors.ciudad}</p>
          </div>
          <div className='grid gap-2'>
            <span className='font-medium text-base'>Direccion</span>
            <input
              className='grid gap-4 bg-slate-100 rounded-lg shadow shadow-slate-300 px-4 py-2 mt-4'
              type='text'
              required
              name='direccion'
              value={user.direccion}
              onChange={handleInputs}
            ></input>
            <p className='erorrp'>{errors.direccion}</p>
          </div>
          <div className='grid gap-2'>
            <span className='font-medium text-base'>Codigo Postal</span>
            <input
              className='grid gap-4 bg-slate-100 rounded-lg shadow shadow-slate-300 px-4 py-2 mt-4'
              type='number'
              required
              name='codigoPostal'
              value={user.codigoPostal}
              onChange={handleInputs}
            ></input>
            <p className='erorrp'>{errors.codigoPostal}</p>
          </div>
          <Boton text={'Agregar ubicacion'} type='submit'></Boton>
          <p id='userCreatedMessage'>{flag ? 'Ubicacion agregada' : null}</p>
        </form>
      </div>
    </>
  );
}

export default UbiForm;
