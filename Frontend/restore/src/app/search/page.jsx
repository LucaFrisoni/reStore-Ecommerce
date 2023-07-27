import React from 'react';
import { fetchSearch } from '../home/fetch';
import ProductsContainer from '../components/ProductsContainer/ProductsContainer';
import { Navbar } from '../components/navbar/navbar';
import NotFound from '../home/[category]/[productId]/notFound';

async function Search({ searchParams }) {
  const data = await fetchSearch(searchParams.search);
  const filteredData = data.result.filter(
    (product) => product.Disabled !== true
  );
  data.result = filteredData;

  const marcas = data.result
    .filter((producto) => !producto.Disabled)
    .map((producto) => producto.Marca);
  const estado = data.result
    .filter((producto) => !producto.Disabled)
    .map((producto) => producto.state);

  if (data.length === 0) return <NotFound></NotFound>;
  return (
    <div>
      <Navbar></Navbar>

      <ProductsContainer data={data} marcas={marcas} estado={estado} />
    </div>
  );
}

export default Search;
