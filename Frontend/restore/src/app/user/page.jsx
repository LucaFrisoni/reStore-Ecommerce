'use client';
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, DatePicker, Upload } from 'antd';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { Navbar } from '../components/navbar/navbar';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { totalPrice } from '../helpers/totalPrice';
import Image from 'next/image';
import Boton from '../components/Button/Button';

function usuario({ searchParams }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [cookieValue, setCookieValue] = useState(null);
  const [readOnly, setReadOnly] = useState(true);
  const [cookieImg, setCookieImg] = useState(null);
  const [file, setFile] = useState('');
  const [input, setInput] = useState({
    nombre: '',
    apellido: '',
    email: '',
    fechaNacimiento: '',
    genero: '',
  });
  const [newInput, setNewInput] = useState({
    nombre: '',
    apellido: '',
    email: '',
    fechaNacimiento: '',
    genero: '',
  });

  const [comprados, setComprados] = useState([]);
  const [calificado, setCalificado] = useState([]);
  // const [detalle, setDetalle]= useState(null)

  useEffect(() => {
    setCookieValue(
      document.cookie
        .split('; ')
        .find((row) => row.startsWith('User_id'))
        ?.split('=')[1]
    );
  }, []);

  useEffect(() => {
    if (
      status !== 'authenticated' &&
      status !== 'loading' &&
      !document.cookie.includes('User_id')
    ) {
      router.push('/home');
    }
  }, [status]);

  const handleSubmit = () => {
    const formData = new FormData();

    for (const key in newInput) {
      if (newInput[key] === '' || newInput[key] === 'undefined') continue;
      else formData.append(key, newInput[key]);
    }
    if (file) formData.append('profileImage', file);
    const id = session ? session.user.id : cookieValue;
    axios
      .put(`https://re-store.onrender.com/users/${id}`, formData)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Cambios guardados exitosamente',
        });
      })
      .then(() => {
        handleToggleReadOnly();
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Algo ha salido mal, intentalo nuevamente mas tarde',
        });
      });
  };

  // useEffect(() => {
  //   const fetchDetail = async (id) => {
  //     const response = await fetch(
  //       `https://re-store.onrender.com/categories/technology/Detail/${id}`
  //     );
  //     const product = await response.json();
  //     setDetalle(product);
  //   };
  //   comprados.forEach((order) => {
  //     order.orderItems.forEach((producto) => {
  //       if (!producto.calificado) {
  //         fetchDetail(producto.id);
  //       }
  //     });
  //   });
  // }, [comprados]);

  useEffect(() => {
    const fetchUsuario = async (id) => {
      const response = await fetch(`https://re-store.onrender.com/users/${id}`);
      const user = await response.json();

      setInput({
        email: user.email,
        nombre: user.nombre,
        apellido: user.apellido,
        genero: user.genero,
        fechaNacimiento: user.fechaNacimiento,
      });
      cookieValue && setCookieImg(user.imagenDePerfil);

      if (user.orders) {
        const fetchCartProductsById = async (cart, setProducts) => {
          Promise.all(
            cart.map((item) =>
              axios.get(
                `https://re-store.onrender.com/categories/technology/Detail/${item.id}`
              )
            )
          )
            .then((values) =>
              setProducts(
                values.map((value, i) => {
                  //se puede tambien sacar quantity cuando se incorpore
                  const {
                    Marca: description,
                    name,
                    background_image,
                    precio,
                    Ofertas,
                  } = value.data.result[0];
                  const finalPrice = Ofertas
                    ? Math.round(
                        Number(totalPrice([{ precio, oferta: Ofertas }])) * 100
                      )
                    : Number(precio) * 100;
                  return {
                    name,
                    description,
                    unit_amount: Number(finalPrice),
                    quantity: 1,
                    images: [background_image],
                    calificado: cart[i].calificado,
                    id: value.data.result[0]._id,
                  };
                })
              )
            )
            .catch((error) => console.log(error));
        };

        let productosComprados = user.orders.filter((order) =>
          order.orderItems.map((item) => item.calificado === false)
        );
        productosComprados = productosComprados
          .map((item) => item.orderItems)
          .flat(1);
        // setComprados(productosComprados);
        fetchCartProductsById(productosComprados, setComprados);

        const productoCalificado = user.orders.filter((order) =>
          order.orderItems.map((item) => item.calificado === true)
        );
        setCalificado(productoCalificado);
      }
    };

    if (session) {
      fetchUsuario(session.user.id);
    } else fetchUsuario(cookieValue);
  }, [cookieValue]);

  const handleToggleReadOnly = () => {
    setReadOnly(!readOnly);
  };

  const handleSelectChange = (value, clave) => {
    setNewInput((prevInput) => ({
      ...prevInput,
      [clave]: value,
    }));
  };

  // const handleButtonRating = (productId) => {
  //   router.push(`/user/${session.user.id}/ratingProduct/${productId}`);
  //   // router.push({pathname:`/user/${session.user.id}/ratingProduct/${productId}`})
  // };

  const handleCancelButton = () => {
    setNewInput(Input);
    handleToggleReadOnly();
  };
  return (
    <>
      <Navbar></Navbar>
      <div className='container mx-auto p-4'>
        <h1 className='text-2xl font-semibold text-blue-900'>Mi perfil</h1>

        <Form
          className='grid gap-4 sm:max-w-[85%] sm:mx-auto my-8 bg-slate-50 p-8 rounded-lg shadow-slate-300 shadow-md'
          onFinish={handleSubmit}
          labelCol={{ span: 0 }}
          wrapperCol={{ span: 14 }}
        >
          <div className='grid gap-2'>
            <label className='font-medium' htmlFor='imagen'>
              Imagen
            </label>
            <Form.Item valuePropName='file'>
              <Upload
                disabled={session ? true : false}
                listType='picture-card'
                showUploadList={false}
                customRequest={({ file }) => {
                  setFile(file);
                  handleToggleReadOnly();
                }}
              >
                {file ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt='Preview'
                    style={{
                      width: '100%',
                      borderRadius: '100%',
                      aspectRatio: '1',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <img
                    src={
                      (session && session.user.image) ||
                      (cookieValue && cookieImg)
                    }
                    alt='Preview'
                    style={{
                      width: '100%',
                      borderRadius: '100%',
                      aspectRatio: '1',
                      objectFit: 'cover',
                    }}
                  />
                )}
              </Upload>
            </Form.Item>
          </div>
          {Object.entries(input).map(([clave, valor]) => (
            <div className='grid gap-2'>
              <label className='font-medium' htmlFor=''>
                {clave}
              </label>
              <Form.Item key={clave}>
                {clave === 'genero' ? (
                  <Select
                    onChange={(value) => handleSelectChange(value, clave)}
                    value={newInput.genero ? newInput.genero : input.genero}
                    disabled={readOnly}
                    className='w-full'
                  >
                    <Select.Option value='masculino'>Masculino</Select.Option>
                    <Select.Option value='femenino'>Femenino</Select.Option>
                    <Select.Option value='otro'>Otro</Select.Option>
                  </Select>
                ) : clave === 'fechaNacimiento' ? (
                  <DatePicker
                    onChange={(value) => handleSelectChange(value, clave)}
                    value={newInput.fechaNacimiento}
                    disabled={readOnly}
                    className='w-full'
                  />
                ) : (
                  <Input
                    disabled={clave === 'email' ? true : false}
                    readOnly={readOnly}
                    placeholder={valor}
                    className='w-full border rounded px-3 py-2'
                    onChange={(event) =>
                      handleSelectChange(event.target.value, clave)
                    }
                  />
                )}
              </Form.Item>
            </div>
          ))}
          <div className='flex gap-4 justify-center'>
            <Button
              className={`px-4 py-2 bg-yellow-400 h-12  hover:bg-yellow-500 transition rounded-lg text-slate-800 font-medium`}
              onClick={readOnly ? handleToggleReadOnly : handleCancelButton}
            >
              {readOnly ? 'Editar perfil' : 'Cancelar'}
            </Button>
            <Link href={'/user/ubicacion'}>
              <Button
                className={`px-4 py-2 bg-yellow-400 h-12 hover:bg-yellow-500 transition rounded-lg text-slate-800 font-medium`}
              >
                Editar Ubicaciones
              </Button>
            </Link>
          </div>
          {!readOnly && (
            <div className='grid place-content-center'>
              <Button
                className={`px-4 py-2 h-12 bg-inherit border-2 border-yellow-400 hover:bg-yellow-400 hover:text-slate-800 transition rounded-lg text-inherit font-medium `}
                onClick={handleSubmit}
                htmlType='submit'
              >
                Guardar Cambios
              </Button>
            </div>
          )}
        </Form>
        <div>
          {comprados.length > 0 && (
            <div>
              <h2 className='text-2xl font-semibold mb-4'>Tus productos</h2>
              <ul>
                {comprados.map((producto) => (
                  <li
                    key={producto.id}
                    className='flex justify-between items-center border-b border-gray-300 py-4'
                  >
                    <div className='flex flex-col w-60 h-30'>
                      <span className='text-lg font-semibold overflow-hidden overflow-ellipsis whitespace-wrap'>
                        {producto.name}
                      </span>
                    </div>
                    <div className='relative aspect-square w-32 h-32 shadow-slate-200'>
                      <Image
                        className='object-contain rounded-md shadow shadow-slate-300'
                        src={producto.images[0]}
                        alt={producto.name}
                        layout='fill'
                      />
                    </div>
                    <div className='flex flex-col w-40 h-30'>
                      {producto.calificado ? (
                        <span className='text-green-500 font-semibold'>
                          Producto ya calificado
                        </span>
                      ) : (
                        <div className='flex items-center'>
                          <Link
                            href={{
                              pathname: '/ratingProduct/',
                              query: {
                                product: producto.id,
                                user: session ? session.user.id : cookieValue,
                              },
                            }}
                          >
                            {/* <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded'>
                              Calificar
                            </button> */}
                            <Boton secondary={true} text={'Calificar'}></Boton>
                          </Link>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default usuario;
