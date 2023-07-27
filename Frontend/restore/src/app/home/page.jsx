import React from 'react';
import { fetchOfers } from './fetch';
import { Navbar } from '../components/navbar/navbar';
import Carousel from '../components/carousel/Carousel';
import { Suspense } from 'react';
import HomeContainer from '../components/HomeContainer/HomeContainer';
import Link from 'next/link';
import Footer from '../components/footer/footer';
import Image from 'next/image';

async function Home() {
  const data = await fetchOfers();
  // const data = window !== undefined ? await fetchOfers() : {};
  // const ubicaciones = data.result.map(producto => producto.Ubicacion)
  // const marcas = data.result.map(producto => producto.Marca)
  // const estado = data.result.map(producto => producto.state)

  return (
    <>
      <Navbar />
      <Carousel />
      <div className='mx-auto container px-4 mb-8'>
        <div className='flex align-middle justify-center gap-16 py-8 flex-wrap gap-y-4  text-center'>
          <Link
            className=''
            title='Click para visitar consolas y videojuegos'
            href={'/home/ConsolasyVideojuegos'}
          >
            <Image
              className='mx-auto'
              width='60'
              height='60'
              src='/icons8-joystick-50.png'
              alt='joystick'
            />
            Consolas
          </Link>
          <Link title='Click para visitar TV' href={'/home/TV'}>
            <Image
              className='mx-auto'
              width='60'
              height='60'
              src='/icons8-televisión-50.png'
              alt='TV'
            />
            TV
          </Link>
          <Link title='Click para visitar celulares' href={'/home/Celulares'}>
            <Image
              className='mx-auto'
              width='60'
              height='60'
              src='/icons8-iphone-100.png'
              alt='iphone'
            />
            Celulares
          </Link>
          <Link
            title='Click para visitar audio y video'
            href={'/home/ElectronicaAudioVideo'}
          >
            <Image
              className='mx-auto'
              width='60'
              height='60'
              src='/icons8-auriculares-90.png'
              alt='Auriculares'
            />
            Audio
          </Link>
          <Link
            title='Click para visitar computación'
            href={'/home/Computacion'}
          >
            <Image
              className='mx-auto'
              width='60'
              height='60'
              src='/icons8-estación-de-trabajo-50.png'
              alt='Computadora'
            />
            Computación
          </Link>{' '}
          <Link
            title='Click para visitar camaras'
            href={'/home/CamarasyAccesorios'}
          >
            <Image
              className='mx-auto'
              width='60'
              height='60'
              src='/icons8-cámara-compacta-50.png'
              alt='Camara'
            />
            Cámaras
          </Link>
        </div>
        <h2 className='text-4xl text-center mb-4 font-medium text-blue-900'>
          {' '}
          Aprovecha nuestras ofertas
        </h2>
        <Suspense fallback={<div>Loading...</div>}>
          <HomeContainer data={data}></HomeContainer>
          {/* <ProductsContainer data={data} ubicaciones={ubicaciones} marcas={marcas} estado={estado}/> */}
        </Suspense>
        {/* <HomeContainer data={data}></HomeContainer> */}
      <Footer/>
      </div>
    </>
  );
}

export default Home;
