'use client';
import React from 'react';

function Footer() {
  return (
    <div className='container'>
      <footer className='py-3 my-4'>
        <ul className='flex justify-center border-b pb-3 mb-3'>
          <li className='mr-3'>
            <a href='/home' className='text-gray-500 hover:text-gray-900'>
              Pagina principal
            </a>
          </li>
          <li className='mr-3'>
            <a
              href='/SobreNosotros'
              className='text-gray-500 hover:text-gray-900'
            >
              Sobre nosotros
            </a>
          </li>
          <li className='mr-3'>
            <a
              href='/RolAmbiental'
              className='text-gray-500 hover:text-gray-900'
            >
              Rol ambiental
            </a>
          </li>
          <li className='mr-3'>
            <a href='/FAQPage' className='text-gray-500 hover:text-gray-900'>
              Preguntas frecuentes
            </a>
          </li>
          <li>
            <a href='/Contacto' className='text-gray-500 hover:text-gray-900'>
              Contacto
            </a>
          </li>
        </ul>
        <p className='text-center text-gray-500'>&copy; 2023 ReStore, Inc </p>
      </footer>
    </div>
  );
}

export default Footer;
