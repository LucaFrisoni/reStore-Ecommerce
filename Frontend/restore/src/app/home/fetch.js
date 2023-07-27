export const fetchOfers = async () => {
  const response = await fetch(
    "https://re-store.onrender.com/categories/technology/Ofertas",
    {cache: 'no-store'}
  );
  return await response.json();
};

export const fetchCategory = async (category) => {
  const response = await fetch(
    `https://re-store.onrender.com/categories/technology/categoria/${category}`,{ cache: 'no-store'}
  );
  return await response.json();
};

export const fetchDetail = (productId) => {
  return fetch(
    `https://re-store.onrender.com/categories/technology/Detail/${productId}`
  ).then((res) => res.json());
};

export const fetchAllProducts = async () => {
  try {
    const response = await fetch(`https://re-store.onrender.com/categories/technology/allProducts`);
    if (!response.ok) {
      throw new Error('Error al obtener los productos');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    throw error;
  }
};

  export const fetchSearch = (search) => {
    return fetch(`https://re-store.onrender.com/categories/technology/searchname?name=${search}`,{ cache: 'no-store' }).then((res) =>
      res.json()
    );
  };

  export const fetchUsuario = (id) => {
    return fetch(`https://re-store.onrender.com/users/${id}/email`).then(res => res.json())
  }
