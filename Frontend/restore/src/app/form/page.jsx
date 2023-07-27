'use client';
import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Radio, Select, Upload } from 'antd';
import axios from 'axios';
import { Navbar } from '../components/navbar/navbar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import Boton from '../components/Button/Button';

export default function MyForm() {
  const { data: session, status } = useSession();
  const [categoria, setCategoria] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!document.cookie.includes('Admin')) {
      router.push('/login');
      return;
    }
    const fetchData = async () => {
      const response = await axios.get(
        'https://re-store.onrender.com/categories/technology/subcategorias'
      );
      setCategoria(response.data);
    };
    fetchData();
  }, []);

  const { TextArea } = Input;
  const { Option } = Select;
  const categorias = [
    { label: 'Computación', value: 'Computacion' },
    { label: 'Electrónica Audio y Video', value: 'ElectronicaAudioVideo' },
    { label: 'Consolas y Videojuegos', value: 'ConsolasyVideojuegos' },
    { label: 'Celulares', value: 'Celulares' },
    { label: 'Cámaras y Accesorios', value: 'CamarasyAccesorios' },
    { label: 'TV', value: 'TV' },
  ];

  const subcategorias = categoria
    ? categoria.reduce((result, category) => {
        result[category.name] = category.subcategoria;
        return result;
      }, {})
    : [];

  const marcas = categoria
    ? categoria.reduce((result, category) => {
        result[category.name] = category.marca;
        return result;
      }, {})
    : [];

  const [input, setInput] = useState({
    name: '',
    state: '',
    file: null,
    precio: 0,
    Description: '',
    Marca: '',
    Ubicacion: '',
    Ofertas: 0,
    subcategoria: {},
  });

  const [subcategoriaOptions, setSubcategoriaOptions] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState(null);
  const [subcategoriaKey, setSubcategoriaKey] = useState(0);
  const [selectedSubcategoria, setSelectedSubcategoria] = useState(undefined);
  const [selectedMarca, setSelectedMarca] = useState([]);

  const handleCategoriaChange = (value) => {
    setSelectedCategoria(value);
    setSelectedSubcategoria(undefined);
    setSubcategoriaKey(subcategoriaKey + 1);
    setSubcategoriaOptions(subcategorias[value]);
    setSelectedMarca(marcas[value]);
    setInput((prevState) => ({
      ...prevState,
      subcategoria: {
        [value]: {},
      },
    }));
  };

  const handleMarca = (value) => {
    setInput({ ...input, Marca: value });
  };

  const handleSubcategoriaChange = (value) => {
    setSelectedSubcategoria(value);
    setInput((prevState) => ({
      ...prevState,
      subcategoria: {
        ...prevState.subcategoria,
        [selectedCategoria]: {
          ...prevState.subcategoria.selectedCategoria,
          [value]: true,
        },
      },
    }));
  };

  // ...

  const handleSubmit = () => {
    const formData = new FormData();
    for (const key in input) {
      if (key === 'file') formData.append('image', input.file);
      else if (key === 'subcategoria') {
        formData.append(key, JSON.stringify(input[key]));
      } else {
        formData.append(key, input[key]);
      }
    }

    axios
      .post(
        'https://re-store.onrender.com/categories/technology/posteo',
        formData
      )
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Producto creado exitosamente',
        });
      })
      .catch((error) => {
        console.error('Error al publicar el producto:', error);
      });
  };

  return (
    <>
      <Navbar />
      <div className='container mx-auto px-4 mb-8'>
        <h1 className='text-2xl font-medium mt-8'>
          Ingresa la información del producto
        </h1>
        <Form
          className='max-w-[80%] mx-auto mt-8 bg-slate-50 shadow-lg shadow-slate-300 rounded-lg px-6 py-8'
          labelCol={{ span: 0 }}
          wrapperCol={{ span: 14 }}
          layout='horizontal'
          onFinish={handleSubmit}
        >
          <Form.Item
            name='Categoría'
            label='Categoría'
            className='font-medium'
            rules={[{ required: true, message: 'Escoge la categoría' }]}
          >
            <Select
              placeholder='Selecciona la categoría'
              onChange={handleCategoriaChange}
              showSearch
              optionFilterProp='children'
              mode='single'
            >
              {categorias.map((categoria) => (
                <Option key={categoria.value} value={categoria.value}>
                  {categoria.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            className='font-medium'
            name='Subcategoría'
            label='Subcategoría'
            rules={[{ required: true, message: 'Escoge la subcategoría' }]}
          >
            <Select
              key={subcategoriaKey}
              placeholder='Selecciona la subcategoría'
              showSearch
              optionFilterProp='children'
              mode='single'
              defaultValue={undefined}
              onChange={handleSubcategoriaChange}
            >
              {subcategoriaOptions.map((subcategoria) => (
                <Option key={subcategoria} value={subcategoria}>
                  {subcategoria}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            className='font-medium'
            name='producto'
            label='Nombre'
            rules={[
              { required: true, message: 'Ingresa el nombre del producto' },
            ]}
          >
            <Input
              placeholder='Escribe el nombre del producto'
              value={input.name}
              onChange={(e) => setInput({ ...input, name: e.target.value })}
            />
          </Form.Item>

          <Form.Item
            className='font-medium'
            name='Marca'
            label='Marca'
            rules={[{ required: true, message: 'Escoge la marca' }]}
          >
            <Select
              key={subcategoriaKey}
              placeholder='Selecciona la marca'
              showSearch
              optionFilterProp='children'
              mode='single'
              defaultValue={undefined}
              onChange={handleMarca}
            >
              {selectedMarca.map((marca) => (
                <Option key={marca} value={marca}>
                  {marca}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            className='font-medium'
            name='precio'
            label='Precio'
            rules={[
              {
                required: true,
                message: 'Ingresa el precio',
              },
            ]}
          >
            <Input
              type='number'
              name='precio'
              placeholder='Escribe el precio'
              value={input.precio}
              onChange={(e) => setInput({ ...input, precio: e.target.value })}
            />
          </Form.Item>

          <Form.Item className='font-medium' label='Estado'>
            <Radio.Group
              name='estado'
              value={input.state}
              onChange={(e) => setInput({ ...input, state: e.target.value })}
            >
              <Radio value='Usado'> Usado </Radio>
              <Radio value='Nuevo'> Nuevo </Radio>
              <Radio value='Casi nuevo'>Casi nuevo </Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item className='font-medium' label='Descripción'>
            <TextArea
              rows={4}
              value={input.Description}
              onChange={(e) =>
                setInput({ ...input, Description: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item
            className='font-medium'
            label='Imagen'
            valuePropName='file'
          >
            <Upload
              listType='picture-card'
              showUploadList={false}
              customRequest={({ file }) => {
                setInput({ ...input, file });
              }}
            >
              {input.file ? (
                <img src={URL.createObjectURL(input.file)} />
              ) : (
                'Upload'
              )}
            </Upload>
          </Form.Item>

          {/* <Button htmlType='submit' className=''>
            Publicar
          </Button> */}
          <Boton type='submit' text={'Publicar'}>
            Publicar
          </Boton>
        </Form>
      </div>
    </>
  );
}
