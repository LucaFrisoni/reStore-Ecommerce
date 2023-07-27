import React from 'react';

export default function SelectShipment({
  selectedMethod,
  setSelectedMethod,
  setSelectedLocation,
}) {
  const handleRadioChange = (e) => {
    //setear el selected a un find en las locations con el id que voy a recibir
    const { value } = e.target;
    if (value === 'no enviar') setSelectedLocation(null);
    setSelectedMethod(value);
  };
  return (
    <form className='grid gap-4 text-gray-500'>
      <div className='flex justify-between bg-gray-50 px-6 py-8 shadow-md shadow-slate-300 rounded-lg'>
        <label htmlFor='recibir' className='flex'>
          Recibir a domicilio
        </label>
        <input
          name='location'
          value={'enviar'}
          className='w-5 h-5 self-center'
          type='radio'
          checked={selectedMethod === 'enviar'}
          onChange={handleRadioChange}
        />
      </div>
      <div className='flex justify-between bg-gray-50 px-6 py-8 shadow-md shadow-slate-300 rounded-lg'>
        <label htmlFor='retirar' className='flex'>
          Retirar por sucursal -{' '}
          <span className=''>Avenida Siempre Viva 742</span>
        </label>
        <input
          name='location'
          value={'no enviar'}
          className='w-5 h-5 self-center'
          type='radio'
          checked={selectedMethod === 'no enviar'}
          onChange={handleRadioChange}
        />
      </div>
    </form>
  );
}
