'use client';
import React from 'react';
import { Navbar } from '../components/navbar/navbar';
import Footer from '../components/footer/footer';

function RolAmbiental() {
  return (
    <>
      <Navbar />
      <div className='container mx-auto py-8'>
        <div className='container mx-auto py-8'>
          <h1 className='text-4xl font-bold text-center mb-8'>Rol Ambiental</h1>
          <p className='text-lg mb-4'>
            En ReStore, nos comprometemos a promover un rol ambiental positivo
            en la industria de la tecnología. Nuestro enfoque principal es
            fomentar la compra y venta de productos tecnológicos reutilizables,
            brindándoles una segunda vida y reduciendo el desperdicio
            electrónico que afecta al medio ambiente.
          </p>
          <p className='text-lg mb-4'>
            Al elegir comprar productos de segunda mano, estás contribuyendo
            activamente a la reducción de la demanda de nuevos dispositivos, lo
            que a su vez disminuye la necesidad de la extracción de recursos
            naturales y la energía requerida para la fabricación de nuevos
            productos.
          </p>
          <p className='text-lg mb-4'>
            Además, al vender tus dispositivos electrónicos usados a través de
            nuestra plataforma, estás participando en la economía circular y
            ayudando a prolongar la vida útil de los productos, evitando que
            terminen en vertederos y liberando sus componentes tóxicos al medio
            ambiente.
          </p>
          <p className='text-lg mb-4'>
            Nuestro equipo se esfuerza por garantizar que todos los productos
            listados en nuestro sitio web cumplan con altos estándares de
            calidad y funcionamiento. Realizamos pruebas exhaustivas,
            verificamos la autenticidad de los productos y ofrecemos garantías
            para brindarte una experiencia confiable y satisfactoria.
          </p>
          <p className='text-lg'>
            ¡Únete a nosotros en nuestro compromiso con el rol ambiental!
            Explora nuestra amplia selección de productos tecnológicos
            reutilizables y comienza a hacer una diferencia positiva para el
            medio ambiente mientras disfrutas de dispositivos de calidad a
            precios accesibles.
          </p>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default RolAmbiental;
