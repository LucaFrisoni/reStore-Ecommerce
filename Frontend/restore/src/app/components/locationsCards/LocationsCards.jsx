import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Boton from '../Button/Button';

export default function LocationsCards({
  userId,
  cookieValue,
  setSelectedLocation,
  selectedLocation,
  selectedMethod,
}) {
  const [locations, setLocations] = useState([]);
  const id = userId || cookieValue;
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (selectedMethod === 'no enviar') {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [selectedMethod]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios(
          `https://re-store.onrender.com/users/${id}`
        );
        setLocations(data.ubicacion);
      } catch (error) {
        //seterror
        console.log(error);
      }
    };
    fetch();
  }, []);

  const handleRadioChange = (e) => {
    //setear el selected a un find en las locations con el id que voy a recibir
    const _id = e.target.value;
    const selected = locations.find((location) => location._id === _id);
    setSelectedLocation(selected);
  };

  return (
    <>
      {!locations.length ? (
        <div className='flex justify-between items-center'>
          <p className='text-lg '>Debes agregar un domicilio primero</p>
          <Link href={'/user/ubicacion'}>
            <Boton text={'Ir a mi perfil'}></Boton>
          </Link>
        </div>
      ) : (
        <form className='grid gap-4 '>
          {locations.map((location) => (
            <div
              className='flex justify-between bg-gray-50 px-6 py-8 shadow-md shadow-slate-300 rounded-lg'
              key={location._id}
            >
              <span className='text-gray-500'>
                <h2 className='font-semibold text-lg'>{`${location.codigoPostal} - ${location.ciudad}`}</h2>
                <p>{location.direccion}</p>
              </span>
              <label htmlFor='radio' className='flex'>
                <input
                  disabled={disabled}
                  name='location'
                  value={location._id}
                  className='w-5 h-5 self-center'
                  type='radio'
                  checked={selectedLocation?._id === location._id}
                  onChange={handleRadioChange}
                />
              </label>
            </div>
          ))}
        </form>
      )}
    </>
  );
}
