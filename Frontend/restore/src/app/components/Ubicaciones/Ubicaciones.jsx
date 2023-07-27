'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Navbar } from '../navbar/navbar';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import './Ubicaciones.css';
import Link from 'next/link';
import BackButton from '@/app/components/backButton/BackButton';
import Boton from '../Button/Button';

function Ubicaciones() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [userData, setData] = useState(null);
  const [user, setUser] = useState({
    direccion: '',
    ciudad: '',
    codigoPostal: '',
  });
  const [flag, setFlag] = useState(false);
  const [form, setForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  useEffect(() => {
    if (!session && !document.cookie.includes('User_id')) {
      router.push('/login');
      return;
    }
  }, []);

  const handleSearch = async (idUser) => {
    const response = await axios.get(
      `https://re-store.onrender.com/users/${idUser}`
    );
    const { data } = response;
    setData(data.ubicacion);
    return data.ubicacion;
  };
  useEffect(() => {
    if (session) {
      let idUser = session.user.id;
      handleSearch(idUser);
    } else {
      if (document.cookie.includes('User_id')) {
        const cookieValue = document.cookie
          .split('; ')
          .find((row) => row.startsWith('User_id='))
          .split('=')[1];
        handleSearch(cookieValue);
      }
    }
  }, [session]);

  const handleDelete = async (id) => {
    try {
      await axios.put('https://re-store.onrender.com/users/ubication/delete', {
        id: id,
      });

      // Actualizar el estado local eliminando la ubicación eliminada
      setData((prevData) => prevData.filter((item) => item._id !== id));
    } catch (error) {
      console.log('Error al eliminar la ubicación:', error);
    }
  };

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

  const handleSubmit = async () => {
    if (flag) {
      setFlag(false);
    } else {
      await axios.put('https://re-store.onrender.com/users/ubication/modify', {
        id: editingId,
        ciudad: user.ciudad,
        direccion: user.direccion,
        codigoPostal: user.codigoPostal,
      });

      setFlag(true);
      setForm(false);

      // Actualizar los datos de ubicación después de la modificación
      let updatedData;
      if (session) {
        updatedData = await handleSearch(session.user.id);
      } else {
        if (document.cookie.includes('User_id')) {
          const cookieValue = document.cookie
            .split('; ')
            .find((row) => row.startsWith('User_id='))
            .split('=')[1];
          updatedData = await handleSearch(cookieValue);
        }
      }
      setData(updatedData);
    }
  };

  const handleEdit = async (id) => {
    setEditingId(id);
    setForm(true);
  };

  return (
    <>
      <Navbar></Navbar>
      <div className='container mx-auto px-4 my-4'>
        <BackButton />
        <div className='grid justify-center mt-4'>
          {userData &&
            userData.map((e) => (
              <div
                className='bg-slate-50 w-[300px] mb-4 p-4 shadow-lg shadow-slate-300 rounded-lg grid place-content-center gap-2'
                key={e.direccion}
              >
                <h1 className='font-medium'>
                  {`Direccion: `}{' '}
                  <span className='font-normal'>{e.direccion}</span>
                </h1>
                <h3 className='font-medium'>
                  Ciudad: <span className='font-normal'>{e.ciudad}</span>
                </h3>
                <h3 className='font-medium'>
                  Codigo postal:{' '}
                  <span className='font-normal'>{e.codigoPostal}</span>
                </h3>
                <div className='flex gap-4 justify-center'>
                  <p
                    className='underline decoration-inherit decoration-1 hover:cursor-pointer text-slate-600'
                    onClick={() => handleEdit(e._id)}
                  >
                    Editar
                  </p>
                  <p
                    className='underline decoration-inherit decoration-1 hover:cursor-pointer text-slate-600'
                    onClick={() => handleDelete(e._id)}
                  >
                    Eliminar
                  </p>
                </div>
              </div>
            ))}
        </div>
        <div className='grid justify-center mt-8'>
          <Link className='flex justify-center' href={'/user/ubicacion/form'}>
            <Boton text={'Agregar Ubicacion'}></Boton>
          </Link>
          {form ? (
            <form
              onSubmit={(e) => e.preventDefault()}
              className='grid gap-6 bg-slate-50 rounded-lg shadow-lg shadow-slate-300 p-4 mt-4'
            >
              <div className='grid gap-2 w-[400px]'>
                <label className='font-medium text-base'>
                  Ciudad donde vives:
                </label>
                <input
                  className='text-sm py-2 px-4 bg-slate-100 rounded-lg shadow shadow-slate-300'
                  type='text'
                  name='ciudad'
                  value={user.ciudad}
                  onChange={handleInputs}
                ></input>
              </div>
              <div className='grid gap-2'>
                <span className='font-medium'>Direccion:</span>

                <input
                  className='text-sm py-2 px-4 bg-slate-100 rounded-lg shadow shadow-slate-300'
                  type='text'
                  name='direccion'
                  value={user.direccion}
                  onChange={handleInputs}
                ></input>
              </div>
              <div className='grid gap-2'>
                <span className='font-medium'>Codigo Postal:</span>
                <input
                  className='text-sm py-2 px-4 bg-slate-100 rounded-lg shadow shadow-slate-300'
                  type='number'
                  name='codigoPostal'
                  value={user.codigoPostal}
                  onChange={handleInputs}
                ></input>
              </div>
              <Boton
                text={'Modificar ubicacion'}
                onClick={() => handleSubmit()}
                type='submit'
              ></Boton>
            </form>
          ) : null}
          <p
            className='text-green-700 font-medium text-lg mt-2'
            id='userCreatedMessage'
          >
            {flag ? 'Ubicacion modificada' : null}
          </p>
        </div>
      </div>
    </>
  );
}

export default Ubicaciones;
