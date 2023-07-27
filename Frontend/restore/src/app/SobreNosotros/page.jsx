'use client';
import React from 'react';
import { Navbar } from '../components/navbar/navbar';
import Footer from '../components/footer/footer';

function SobreNosotros() {
  return (
    <>
      <Navbar />
      <div className='mx-auto container px-4 mb-8'>
        <div className='container mx-auto py-8'>
          <h1 className='text-2xl font-bold mb-8 text-center'>
            Sobre nosotros
          </h1>
          <p className='mb-4'>
            En ReStore, somos un equipo de cinco jóvenes apasionados por el
            medio ambiente y la tecnología. Desde una edad temprana, nos dimos
            cuenta de que comprar electrodomésticos de segunda mano nos permitía
            obtener los productos que necesitábamos sin tener que pagar precios
            exorbitantes por ellos.
          </p>
          <p className='mb-4'>
            Uno de nuestros momentos más memorables fue cuando encontramos una
            televisión en un supermercado. Era la última unidad y había sido
            utilizada como modelo de exhibición. Nos acercamos al gerente y le
            expresamos nuestro interés en adquirirla. Sorprendentemente, el
            gerente nos ofreció un precio muy llamativo debido a que era la
            última y había sido utilizada como exposición, pero el producto
            estaba en perfectas condiciones.
          </p>
          <p className='mb-4'>
            Esa experiencia nos inspiró a explorar más a fondo el mercado de
            productos tecnológicos reutilizables. Nos dimos cuenta de que era
            posible obtener dispositivos de calidad a precios accesibles sin
            comprometer su funcionamiento. A medida que profundizamos en este
            mundo, también nos dimos cuenta del impacto positivo que estábamos
            generando al reducir el desperdicio electrónico y contribuir a la
            economía circular.
          </p>
          <p className='mb-4'>
            Desde entonces, hemos estado dedicados a proporcionar una plataforma
            confiable para la compra y venta de productos tecnológicos
            reutilizables. Nos esforzamos por garantizar que todos los productos
            listados en nuestro sitio cumplan con altos estándares de calidad y
            funcionamiento. Realizamos pruebas exhaustivas, verificamos la
            autenticidad de los productos y brindamos un servicio de atención al
            cliente excepcional.
          </p>
          <p>
            Estamos orgullosos de poder ofrecer una alternativa sostenible y
            accesible para aquellos que desean adquirir dispositivos
            tecnológicos de calidad mientras contribuyen a la protección del
            medio ambiente. Únete a nosotros en nuestro viaje hacia un futuro
            más sostenible y descubre la amplia selección de productos
            tecnológicos reutilizables que tenemos para ofrecer.
          </p>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default SobreNosotros;
