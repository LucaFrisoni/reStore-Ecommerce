'use client';
import Card from '../card/card';
import style from './ProductsContainer.module.css';
import React, { useState, useEffect } from 'react';
import productsCounter from '@/app/utils/productsCounter';

function ProductsContainer({ data, marcas, estado }) {
  const [shownProducts, setShownProducts] = useState(data.result);
  const initialState = {
    estado: '',
    marca: '',
    precio: '',
  };
  const [nuevosFilters, setNuevosFilters] = useState(initialState);

  const handleFiltersChange = (event) => {
    const newState = {
      ...nuevosFilters,
      [event.target.name]: event.target.value,
    };
    setNuevosFilters(newState);
    applyFilters(newState);
  };

  const applyFilters = (newState = nuevosFilters) => {
    let filteredProducts = data.result;
    if (newState === 'borrar') {
      setNuevosFilters(initialState);
      return setShownProducts(filteredProducts);
    }
    const { estado, marca, precio } = newState;

    if (precio !== '') {
      filteredProducts = filteredProducts.filter((producto) => {
        return producto.precio < parseInt(precio.split('$')[1]);
      });
    }
    if (estado !== '') {
      filteredProducts = filteredProducts.filter((producto) => {
        return producto.state === estado;
      });
    }
    if (marca !== '') {
      filteredProducts = filteredProducts.filter((producto) => {
        return producto.Marca === marca;
      });
    }
    setShownProducts(filteredProducts);
  };

  const stateCounter = productsCounter(estado);
  const marcasCounter = productsCounter(marcas);
  const initialFilters = {
    estado: [...new Set(estado)],
    marcas: [...new Set(marcas)],
    oferta: ['En oferta'],
    precio: [
      'Menos de $2000',
      'Menos de $1500',
      'Menos de $1000',
      'Menos de $500',
      'Menos de $250',
    ],
    order: [
      'Menor precio',
      'Mayor precio',
      'Nombre ascendiente',
      'Nombre descendiente',
    ],
  };
  const [filters, setFilters] = useState(initialFilters);

  const updateFilters = () => {
    setFilters(initialFilters);
  };

  useEffect(() => {
    updateFilters();
  }, [estado, marcas]);
  const [currentOrder, setCurrentOrder] = useState(null);

  const handleOrderChange = (orden) => {
    setCurrentOrder(orden);
  };

  useEffect(() => {
    setNuevosFilters(initialState);
    applyFilters(nuevosFilters);
  }, [data]);

  useEffect(() => {
    const orderProducts = () => {
      if (currentOrder === 'Menor precio')
        setShownProducts((prevProducts) =>
          [...prevProducts].sort((a, b) => a.precio - b.precio)
        );
      if (currentOrder === 'Mayor precio')
        setShownProducts((prevProducts) =>
          [...prevProducts].sort((a, b) => b.precio - a.precio)
        );
      if (currentOrder === 'Nombre ascendiente')
        setShownProducts((prevProducts) =>
          [...prevProducts].sort((a, b) => a.name.localeCompare(b.name))
        );
      if (currentOrder === 'Nombre descendiente')
        setShownProducts((prevProducts) =>
          [...prevProducts].sort((a, b) => -1 * a.name.localeCompare(b.name))
        );
    };

    orderProducts();
  }, [currentOrder]);

  return (
    <div className='flex flex-col sm:flex-row gap-8 container mx-auto px-4 my-8'>
      <aside className='filters flex flex-col gap-4 text-left'>
        <button
          className={` text-blue-900 text-sm bg-slate-200 rounded-md py-1 font-medium  ${
            nuevosFilters.estado !== '' ||
            nuevosFilters.marca !== '' ||
            nuevosFilters.precio !== ''
              ? 'visible'
              : 'invisible'
          }`}
          onClick={() => applyFilters('borrar')}
          name='borrar'
        >
          Eliminar filtros
        </button>

        <div className='flex flex-col gap-1 text-sm text-gray-500 text-left items-start'>
          <h4 className=' text-blue-900  font-bold'>Estado</h4>
          {filters.estado.map((estado) => (
            <button
              className='hover:text-gray-700 text-left'
              key={estado}
              value={estado}
              name='estado'
              onClick={handleFiltersChange}
            >
              {estado} ({stateCounter[estado]})
            </button>
          ))}
        </div>
        <div className='flex flex-col gap-1 text-sm text-gray-500 text-left items-start'>
          <h4 className=' text-blue-900  font-bold'>Marcas</h4>
          {filters.marcas.map((marca) => (
            <button
              className='hover:text-gray-700 text-left'
              key={marca}
              value={marca}
              onClick={handleFiltersChange}
              name='marca'
            >
              {marca} ({marcasCounter[marca]})
            </button>
          ))}
        </div>

        <div className='flex flex-col gap-1 text-sm text-gray-500 text-left items-start'>
          <h4 className=' text-blue-900  font-bold'>Precio</h4>
          {filters.precio.map((precio) => (
            <button
              className='hover:text-gray-700 text-left'
              key={precio}
              onClick={handleFiltersChange}
              name='precio'
              value={precio}
            >
              {precio}
            </button>
          ))}
        </div>
        <div className='flex flex-col gap-1 text-sm text-gray-500 text-left items-start'>
          <h4 className=' text-blue-900  font-bold'>Ordenar por</h4>
          {filters.order.map((orde) => {
            return (
              <button
                className='hover:text-gray-700 text-left'
                key={orde}
                onClick={() => handleOrderChange(orde)}
              >
                {orde}
              </button>
            );
          })}
        </div>
      </aside>

      {shownProducts.length ? (
        <div className='grid justify-items-center mx-auto gap-4 auto-cols-max grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'>
          {shownProducts.map((props) => {
            return (
              <Card
                name={props.name}
                precio={props.precio}
                estado={props.state}
                marca={props.Marca}
                subcategoria={props.subcategoria}
                key={props._id}
                id={props._id}
                image={props.background_image}
                oferta={props.Ofertas}
                ubicacion={props.Ubicacion}
                Disabled={props.Disabled}
              />
            );
          })}
        </div>
      ) : (
        <div className='h-[80vh] w-full grid place-content-center'>
          <div className='grid gap-4 text-center'>
            <h1 className='text-3xl font-semibold text-blue-900'>
              No se encontraron productos
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductsContainer;
