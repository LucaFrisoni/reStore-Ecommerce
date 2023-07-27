'use client';
import React, { useEffect, useState } from 'react';
import Boton from '../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../cartItem/CartItem';
import { useRouter } from 'next/navigation';
import { addFromDatabase } from '@/redux/actions';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { totalPrice } from '@/app/helpers/totalPrice';

export default function CartContent() {
  const { cart } = useSelector((store) => store);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [cookieValue, setCookieValue] = useState(null);
  useEffect(() => {
    setCookieValue(
      document.cookie
        .split('; ')
        .find((row) => row.startsWith('User_id'))
        ?.split('=')[1]
    );
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    //chequear si esta logeado el user, si lo esta poblar el carrito con sus prods
    //se puede hacer una action que reciba muchos prod en el payload y que haga ...state, cart: [...state.cart, ...action.payload]
    if (session || cookieValue) {
      dispatch(addFromDatabase(cart, session?.user.id, cookieValue));
    }
  }, [session, cookieValue]);

  return (
    <div className='container px-4 m-auto my-8'>
      <h1 className='text-3xl  mb-4 font-semibold text-blue-900'>Carrito</h1>
      {cart && cart.length ? (
        //va a haber que fetchear la info de cada producto segun su id, ya sea aca o en cartItem
        cart.map((item) => (
          <CartItem
            key={item.productId}
            item={item}
            {...item}
            userId={session?.user?.id}
            userId2={cookieValue}
          />
        ))
      ) : (
        <div className='relative min-h-[50vh] grid place-content-center'>
          <div className=' top-1/2 left-1/2 grid gap-4 justify-items-center'>
            <h2
              className=' text-3xl font-medium text-center'
              style={{
                textWrap: 'balance',
              }}
            >
              No hay nada para ver aqui
            </h2>
            <span>
              <Boton
                onClick={() => router.push('/home')}
                text={'Volver a inicio'}
              />
            </span>
          </div>
        </div>
      )}
      {cart && cart.length ? (
        <div>
          <hr className='h-px bg-gray-300 border-0 mb-4' />

          <p className='text-lg font-medium mb-4'>Total: ${totalPrice(cart)}</p>
          {!session && !cookieValue ? (
            <div className='flex gap-4 items-center'>
              <Link className='link' href={'/login'}>
                <Boton text={'Iniciar sesion'}></Boton>
              </Link>
              <h2 className='text-xl  font-semibold text-slate-800'>
                Debes iniciar sesion para comprar
              </h2>
            </div>
          ) : (
            <Link href={'/cart/checkout'}>
              <Boton text={'Comprar'}></Boton>
            </Link>
          )}
        </div>
      ) : null}
    </div>
  );
}
