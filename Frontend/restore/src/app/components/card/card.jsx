import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Boton from '../Button/Button';
import Image from 'next/image';

//Hacer un botton para el carrito, o una imagen que al apretar => un evento OnClick que pase a la ruta post "localhost/carrito/add" por body el id del producto
// !!IMPORTANTE agregar esto a axios para que envie la cookie { withCredentials: true }

function Card(data) {
  if (data.Disabled) return null;
  const [precioConDescuento, setPrecioConDescuento] = useState(null);

  const categoria = Object.keys(data.subcategoria)[0];
  useEffect(() => {
    const calcularPrecioConDescuento = () => {
      if (data.oferta && data.precio) {
        const descuento = parseFloat(data.oferta) / 100;
        const precio = parseFloat(data.precio);
        const precioFinal = precio - precio * descuento;
        return precioFinal.toFixed(2);
      }
      return null;
    };

    const precioFinal = calcularPrecioConDescuento();
    setPrecioConDescuento(precioFinal);
  }, [data.oferta, data.precio]);

  return (
    <div className='w-80 md:w-64 lg:w-80 aspect-[4/3] grid gap-2 bg-slate-50 rounded-md p-6 shadow-lg shadow-slate-300 hover:scale-105 transition duration-500'>
      <div className='relative w-[85%]  mx-auto aspect-[4/3]'>
        <Image
          className='object-contain rounded-md'
          src={data.image}
          alt={data.name}
          fill
          sizes='(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw'
        />
      </div>
      <h3 className='text-lg font-semibold text-ellipsis overflow-hidden whitespace-nowrap h-6'>
        {data.name}
      </h3>
      <div className='text-gray-500 text-sm'>
        <p>Estado: {data.estado}</p>
        <p>Marca: {data.marca}</p>
        <p>
          Categoria:{' '}
          {categoria === 'TV'
            ? [categoria]
            : Object.keys(data.subcategoria[categoria])[0]}
        </p>
        {data.oferta ? (
          <p className='font-medium text-base text-slate-500'>
            Precio:{' '}
            <span className='text-red-400 line-through'>
              ${`${data.precio} `}
            </span>
            <span className='text-slate-800'>${precioConDescuento}</span>
          </p>
        ) : (
          <p className='font-medium text-base text-slate-800'>
            Precio: ${data.precio}
          </p>
        )}
      </div>
      <Link className='grid' href={`/home/category/${data.id}`}>
        <Boton text='Ver más'></Boton>
      </Link>
    </div>
  );
}

export default Card;
