'use client';

import { useState } from 'react';
import Link from 'next/link';
import Boton from '../Button/Button';

export default function Searchbar() {
  const [searchValue, setSearchValue] = useState('');
  const [disabled, setDisabled] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    const newSearchValue = e.target.value;
    setSearchValue(newSearchValue);
    newSearchValue.length > 0 ? setDisabled(false) : setDisabled(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className='bg-slate-200 text-slate-800 px-2 py-2 mr-4 rounded-md outline-slate-800'
        type='text'
        placeholder='Buscar'
        value={searchValue}
        onChange={handleChange}
      />
      <Link
        href={{
          pathname: '/search',
          query: {
            search: searchValue,
          },
        }}
      >
        <Boton disabled={disabled} text={'Buscar'} type='submit'></Boton>
      </Link>
    </form>
  );
}
