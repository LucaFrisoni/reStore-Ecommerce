import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Boton from '../Button/Button';
import axios from 'axios';
import { totalPrice } from '@/app/helpers/totalPrice';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LocationsCards from '../locationsCards/LocationsCards';
import SelectShipment from '../selectShipment/SelectShipment';
import fetchCartProductsById from '@/app/helpers/fetchCartProductsById';
import ProcessingPayment from '../processingPayment/ProcessingPayment';

export default function CheckoutContent({ session, cookieValue }) {
  const { cart } = useSelector((store) => store);

  const [products, setProducts] = useState([]);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentError, setpaymentError] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(null);

  const router = useRouter();
  const total = totalPrice(cart);

  useEffect(() => {
    if (!cart.length) {
      router.push('/home');
    } else {
      fetchCartProductsById(cart, setProducts);
    }
  }, [cart]);

  const handlePayment = async () => {
    setProcessingPayment(true);
    setpaymentError(false);
    const envio = selectedMethod === 'enviar';
    const direccion = selectedLocation?.ciudad
      ? {
          ciudad: selectedLocation.ciudad,
          codigoPostal: selectedLocation.codigoPostal,
          calle: selectedLocation.direccion,
        }
      : null;
    try {
      const userId = session?.user.id || cookieValue;
      const { data } = await axios.post(
        'https://re-store.onrender.com/payments/create-checkout-session',
        {
          userId,
          cartItems: products,
        }
      );
      setProcessingPayment(false);
      localStorage.setItem('envio', JSON.stringify(envio));
      localStorage.setItem('userId', JSON.stringify(userId));
      localStorage.setItem('direccion', JSON.stringify(direccion));

      // TODO pasar el dispatch a la pantalla de success
      router.push(data.url);
    } catch (error) {
      setProcessingPayment(false);
      setpaymentError(true);
    }
  };

  return (
    <div className='flex-col md:flex-row container mx-auto px-4 py-8 flex gap-8 justify-between relative '>
      <div className='grid gap-8 '>
        <h1 className='text-3xl font-semibold text-blue-900'>
          ¿Cómo querés recibir o retirar tu compra?
        </h1>
        <div className='grid gap-4'>
          <h2 className='text-xl font-medium'>¿Retirar o recibir compra?</h2>

          <SelectShipment
            selectedMethod={selectedMethod}
            setSelectedMethod={setSelectedMethod}
            setSelectedLocation={setSelectedLocation}
          />
        </div>
        <div className='grid gap-4'>
          <h2 className='text-xl font-medium'>Domicilio</h2>
          <LocationsCards
            userId={session?.user.id}
            cookieValue={cookieValue}
            setSelectedLocation={setSelectedLocation}
            selectedLocation={selectedLocation}
            selectedMethod={selectedMethod}
          ></LocationsCards>
        </div>
        <Boton
          disabled={
            (!selectedLocation && selectedMethod !== 'no enviar') ||
            selectedMethod === null
          }
          onClick={handlePayment}
          text={'Pagar'}
        />
        {processingPayment ? <ProcessingPayment text={'Loading...'} /> : null}
        {paymentError ? (
          <p className='font-medium text-lg text-red-600 text-center -mt-4'>
            Ocurrio un error en el pago, vuelve a intentarlo
          </p>
        ) : null}
      </div>
      <aside className='bg-slate-50 p-8 rounded-lg shadow-lg shadow-slate-300  md:w-[30%] flex flex-col gap-4 justify-start items-center'>
        {cart && cart.length > 1 ? (
          <>
            <h2 className='text-xl'>Resumen de compra</h2>
            <hr className='h-px bg-gray-400 border-0 self-stretch ' />

            <p className='text-lg text-gray-600'>{`Productos: ${cart.length}`}</p>
            <p className='text-xl font-semibold '>{`Total: $${total}`}</p>
          </>
        ) : null}
        {cart && cart.length === 1 ? (
          <>
            {products[0] ? (
              <Image
                width={120}
                height={120}
                src={products[0].images[0]}
                alt={products[0].name}
              ></Image>
            ) : (
              <div style={{ width: '120px', height: '120px' }} />
            )}

            <h2 className='text-xl  '>{products[0]?.name}</h2>
            <hr className='h-px bg-gray-400 border-0 self-stretch ' />

            <div className='text-xl font-semibold'>
              <span>Total: </span>
              <span>{`$${total}`}</span>
            </div>
          </>
        ) : null}
      </aside>
    </div>
  );
}
