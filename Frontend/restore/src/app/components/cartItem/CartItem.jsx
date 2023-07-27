import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Boton from '../Button/Button';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '@/redux/actions';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function CartItem({ productId, item, userId, userId2 }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [product, setProduct] = useState({});
  const [precio, setPrecio] = useState(0);
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `https://re-store.onrender.com/categories/technology/Detail/${productId}`
      );
      setProduct(response.data.result[0]);

      if (response.data.result[0].Ofertas && response.data.result[0].precio) {
        const descuento = parseFloat(response.data.result[0].Ofertas) / 100;
        const precio = parseFloat(response.data.result[0].precio);
        const precioFinal = precio - precio * descuento;
        setPrecio(precioFinal.toFixed(2));
      } else {
        setPrecio(response.data.result[0].precio);
      }
    };
    fetch();
  }, []);
  //mostrar la cantidad
  //dos botones que despachen las actions de subir y bajar con id de user y de product
  return (
    <>
      <hr className='h-px bg-gray-300 border-0 ' />
      <div className='grid grid-cols-2 justify-between  my-4'>
        <div className='grid gap-4 text-slate-800 content-center items-center'>
          <h2
            className='cursor-pointer underline'
            onClick={() => router.push(`/home/category/${productId}`)}
          >
            {product?.name}
          </h2>
          <p className='text-gray-500 text-sm'>{product?.Marca}</p>
          <p className='text-slate-800 font-semibold text-lg'>${precio}</p>
          <div>
            <Boton
              onClick={() =>
                dispatch(removeFromCart(productId, userId, userId2))
              }
              secondary={true}
              text={'Eliminar'}
            />
          </div>
        </div>
        <div className='relative aspect-square justify-self-end shadow-slate-200 min-h-[160px]'>
          {product.background_image ? (
            <Image
              className='object-contain rounded-md '
              src={product?.background_image}
              alt={product?.name}
              fill
              sizes='160px'
            />
          ) : null}
        </div>
      </div>
    </>
  );
}
