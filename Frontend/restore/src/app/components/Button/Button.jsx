'use client';
import React from 'react';

function Boton({ text, secondary, type = 'button', disabled, onClick }) {
  return (
    <>
      {disabled ? (
        <button
          onClick={onClick}
          disabled={disabled}
          type={type}
          className={`px-4 py-2 bg-gray-500 rounded-lg text-slate-100 font-medium cursor-not-allowed`}
        >
          {' '}
          {text}
        </button>
      ) : !secondary ? (
        <button
          onClick={onClick}
          disabled={disabled}
          type={type}
          className={`px-4 py-2 bg-yellow-400  hover:bg-yellow-500 transition rounded-lg text-slate-800 font-medium`}
        >
          {text}
        </button>
      ) : (
        <button
          onClick={onClick}
          disabled={disabled}
          className={`px-4 py-2 bg-inherit border-2 border-yellow-400 hover:bg-yellow-400 hover:text-slate-800 transition rounded-lg text-inherit font-medium ${
            disabled && 'bg-gray-500 hover:bg-gray-500'
          }`}
        >
          {text}
        </button>
      )}
    </>
  );
}

export default Boton;
