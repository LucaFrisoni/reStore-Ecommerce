'use client';
import React, { useEffect, useState } from 'react';
import '../dash.css';
import './inventario.css';
import {
  Button,
  Space,
  Table,
  Typography,
  Image,
  Input,
  Upload,
  Modal,
} from 'antd';
import axios from 'axios';

function Inventario() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [editingKey, setEditingKey] = useState('');
  const [editedValue, setEditedValue] = useState('');
  const [editingField, setEditingField] = useState('');
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [file, setFile] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await fetch(
        'https://re-store.onrender.com/categories/technology/allProducts'
      );
      const response = await products.json();
      setProducts(response.result);
    };
    fetchProducts();
  }, []);

  const handleDisable = (record) => {
    const disabled = !record.Disabled;
    const newProducts = products.map((product) =>
      product._id === record._id ? { ...product, Disabled: disabled } : product
    );
    axios
      .put(
        `https://re-store.onrender.com/categories/technology/${record._id}`,
        {
          Disabled: disabled,
        }
      )
      .then(() => {})
      .catch((error) => {
        console.log('ERROR EN LA SOLICITUD PUT', error);
      });
    setProducts(newProducts);
  };

  const startEditing = (record, field) => {
    setEditingKey(record._id);
    setEditedValue(record[field]);
    setEditingField(field);
    if (field === 'Description') handleOpenModal();
  };

  const handleSave = () => {
    const newProducts = products.map((product) => {
      return product._id === editingKey
        ? { ...product, [editingField]: editedValue }
        : product;
    });
    axios
      .put(
        `https://re-store.onrender.com/categories/technology/${editingKey}`,
        {
          [editingField]: editedValue,
        }
      )
      .then(() => {})
      .catch((error) => {
        console.log('ERROR EN LA SOLICITUD PUT', error);
      });
    setProducts(newProducts);
    setEditingKey('');
    setEditedValue('');
    setEditingField('');
  };

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  return (
    <div className='app'>
      <Space
        size={20}
        direction='vertical'
        style={{ width: 'auto', height: '400px' }}
      >
        <Typography.Title level={4}>Inventory</Typography.Title>
        <Input.Search
          placeholder='Buscar...'
          onSearch={(value) => setSearch(value)}
          onChange={(event) => setSearch(event.target.value)}
        />
        <Table
          columns={[
            {
              title: 'Nombre',
              dataIndex: 'name',
              filteredValue: [search],
              onFilter: (value, record) => {
                return (
                  record.name?.toLowerCase().includes(value.toLowerCase()) ||
                  record.Marca?.toLowerCase().includes(value.toLowerCase()) ||
                  (record.subcategoria &&
                    Object.keys(record.subcategoria)[0]
                      .toLowerCase()
                      .includes(value.toLowerCase()))
                );
              },
              render: (text, record) => {
                const isEditing =
                  record._id === editingKey && editingField === 'name';

                return isEditing ? (
                  <Input
                    value={editedValue}
                    onChange={(e) => setEditedValue(e.target.value)}
                  />
                ) : (
                  <span onClick={() => startEditing(record, 'name')}>
                    {text}
                  </span>
                );
              },
            },
            {
              title: 'Estado',
              dataIndex: 'state',
              filters: [
                { text: 'Nuevo', value: 'Nuevo' },
                { text: 'Casi Nuevo', value: 'Casi nuevo' },
                { text: 'Usado', value: 'Usado' },
              ],
              onFilter: (value, record) => {
                return record.state === value;
              },
              filterMultiple: false,
              filteredValue: filteredInfo.state || null,
            },
            {
              title: 'Precio $',
              dataIndex: 'precio',
              sorter: (a, b) => {
                if (a.precio > b.precio) {
                  return 1;
                } else if (a.precio < b.precio) {
                  return -1;
                } else {
                  return 0;
                }
              },
              sortOrder:
                sortedInfo.columnKey === 'precio' ? sortedInfo.order : null,
              render: (text, record) => {
                const isEditing =
                  record._id === editingKey && editingField === 'precio';

                return isEditing ? (
                  <Input
                    value={editedValue}
                    onChange={(e) => setEditedValue(e.target.value)}
                    style={{ width: '40%' }}
                  />
                ) : (
                  <span onClick={() => startEditing(record, 'precio')}>
                    {text}
                  </span>
                );
              },
              sortOrder:
                sortedInfo.field === 'precio' ? sortedInfo.order : null,
            },
            {
              title: 'Descuento %',
              dataIndex: 'Ofertas',
              render: (text, record) => {
                const isEditing =
                  record._id === editingKey && editingField === 'Ofertas';

                return isEditing ? (
                  <Input
                    value={editedValue}
                    onChange={(e) => setEditedValue(e.target.value)}
                    style={{ width: '20%' }}
                  />
                ) : (
                  <span onClick={() => startEditing(record, 'Ofertas')}>
                    {text}
                  </span>
                );
              },
            },
            {
              title: 'Stock',
              dataIndex: 'stock',
              render: (text, record) => {
                const isEditing =
                  record._id === editingKey && editingField === 'stock';

                return isEditing ? (
                  <Input
                    value={editedValue}
                    onChange={(e) => setEditedValue(e.target.value)}
                    style={{ width: '20%' }}
                  />
                ) : (
                  <span onClick={() => startEditing(record, 'stock')}>
                    {text}
                  </span>
                );
              },
            },

            {
              title: 'Marca',
              dataIndex: 'Marca',
            },
            {
              title: 'Imagen',
              dataIndex: 'background_image',
              render: (image, record) => (
                <Upload
                  showUploadList={false}
                  customRequest={({ file }) => {
                    const form = new FormData();
                    form.append('image', file);
                    axios
                      .put(
                        `https://re-store.onrender.com/categories/technology/${record._id}`,
                        form
                      )
                      .then((res) => console.log('foto enviada con exito'))
                      .then(
                        setFile((prevFile) => ({
                          ...prevFile,
                          [record._id]: file,
                        }))
                      )
                      .catch((error) => console.log(error));
                  }}
                  listType='picture-card'
                >
                  {file[record._id] ? (
                    <img
                      src={URL.createObjectURL(file[record._id])}
                      alt='Preview'
                      style={{ width: '100%' }}
                    />
                  ) : (
                    <img
                      src={record.background_image}
                      alt='Preview'
                      style={{ width: '100%' }}
                    />
                  )}{' '}
                </Upload>
                // <Image className={record?.Disabled ? 'fila-deshabilitada' : ''} src={image} height={"auto"} width={80} />
              ),
            },
            {
              title: 'Subcategoría',
              dataIndex: 'subcategoria',
              render: (text, record) =>
                record.subcategoria && Object.keys(record.subcategoria)[0],
              filters: [
                { text: 'Computacion', value: 'Computacion' },
                {
                  text: 'Consolas y Videojuegos',
                  value: 'ConsolasyVideojuegos',
                },
                { text: 'Televisores', value: 'TV' },
                { text: 'Electronica', value: 'ElectronicaAudioVideo' },
                { text: 'Celulares', value: 'Celulares' },
                { text: 'Camaras', value: 'CamarasyAccesorios' },
              ],
              onFilter: (value, record) => {
                const subcategoria =
                  record.subcategoria && Object.keys(record.subcategoria)[0];
                return subcategoria === value;
              },
              filterMultiple: false,
              filteredValue: filteredInfo.subcategoria || null,
            },
            {
              title: 'Descripcion',
              render: (value, record) => {
                const isEditing =
                  record._id === editingKey && editingField === 'Description';

                return (
                  <>
                    <Button onClick={() => startEditing(record, 'Description')}>
                      Editar descripcion
                    </Button>
                    {isEditing && (
                      <Modal
                        open={isModalVisible}
                        onCancel={() => setIsModalVisible(false)}
                        onOk={() => {
                          setIsModalVisible(false);
                        }}
                      >
                        <Input.TextArea
                          value={editedValue}
                          onChange={(e) => setEditedValue(e.target.value)}
                          closeIcon={null}
                          rows={7}
                        />
                      </Modal>
                    )}
                  </>
                );
              },
            },

            {
              title: 'Desabilitado',
              dataIndex: 'Disabled',
              render: (value, record) => (
                <Button onClick={() => handleDisable(record)}>
                  {value ? 'Sí' : 'No'}
                </Button>
              ),
              filters: [
                { text: 'Si', value: true },
                { text: 'No', value: false },
              ],
              onFilter: (value, record) => {
                return record.Disabled === value;
              },
              filterMultiple: false,
              filteredValue: filteredInfo.Disabled || ['false'],
            },
            {
              title: '',
              render: (text, record) => {
                return record._id === editingKey ? (
                  <Button onClick={() => handleSave()}>Guardar</Button>
                ) : null;
              },
            },
          ]}
          rowClassName={(record) =>
            record.Disabled ? 'fila-deshabilitada' : ''
          }
          dataSource={products}
          pagination={{
            pageSize: 10,
          }}
          onChange={handleChange}
        ></Table>
      </Space>
    </div>
  );
}

export default Inventario;
