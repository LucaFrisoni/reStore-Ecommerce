"use client";
import React from "react";
import "../dash.css";
import {
  Space,
  Typography,
  Card,
  Statistic,
  Table,
  Avatar,
  Tag,
  Button,
  Input,
} from "antd";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";

function Pedidos() {
  // const router = useRouter();
  // useEffect(() => {
  //   if (!document.cookie.includes("Admin")) {
  //     router.push("/home");
  //   }
  // }, []);

  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const getPedidos = async () => {
    const { data } = await axios.get(
      "https://re-store.onrender.com/users/envios/all"
    );
    return data.users;
  };

  useEffect(() => {
    setLoading(true);
    getPedidos().then((res) => {
      // Crear una nueva lista de pedidos con las órdenes desglosadas
      const newPedidos = [];
      res.forEach((user) => {
        user.orders.forEach((orden) => {
          // Crear un nuevo objeto de pedido con las propiedades relevantes
          const newPedido = {
            email: user.email,
            nombre: user.nombre,
            apellido: user.apellido,
            ubicacion: user.ubicacion,
            pagado: orden.paymentInfo.amountPaid,
            articulos: orden.orderItems,
            estado: orden.orderStatus,
            estadoPago: orden.paymentInfo.status,
          };
          newPedidos.push(newPedido);
        });
      });
      setPedidos(newPedidos);
      setLoading(false);
    });
  }, []);

  function TablePedidos() {
    const filteredPedidos = searchText
      ? pedidos.filter((pedidos) =>
          pedidos.email.toLowerCase().includes(searchText.toLowerCase())
        )
      : pedidos;

    const columns = [
      {
        title: "Email",
        dataIndex: "email",
        filteredValue: [searchText],
        onFilter: (value, record) => {
          return record.email?.toLowerCase().includes(value.toLowerCase());
        },
        render: (_, record) => (
          <span style={{ color: "green" }}>{record.email}</span>
        ),
      },
      {
        title: "Nombre",
        dataIndex: "nombre",
      },
      {
        title: "Apellido",
        dataIndex: "apellido",
      },
      {
        title: "Ciudad",
        dataIndex: "ciudad",
        render: (_, record) => {
          const direccion = record?.ubicacion?.[0]?.direccion;
          const codigoPostal = record?.ubicacion?.[0]?.codigoPostal;
          const ciudad = record?.ubicacion?.[0]?.ciudad;
          return `${ciudad}, ${direccion}, ${codigoPostal}`;
        },
      },
      {
        title: "Pagado",
        dataIndex: "pagado",
        render: (_, record) => <span>{`$${record.pagado} USD`}</span>,
      },
      {
        title: "Artículos",
        dataIndex: "articulos",
        render: (articulos) => (
          <div>
            {articulos.map((articulo) => (
              <div
                key={articulo.id}
                style={{
                  backgroundColor: "lightblue",
                  padding: "5px",
                  marginBottom: "5px",
                }}
              >
                <span>ID: {articulo.id}</span>
                <span> Cantidad: {articulo.quantity}</span>

                {/* Agrega aquí más detalles de los artículos que deseas mostrar */}
              </div>
            ))}
          </div>
        ),
      },
      {
        title: "Estado del envio",
        dataIndex: "estado",
        render: (_, record) => (
          <Tag
            style={{
              fontWeight: 620,
              color: "white",
              backgroundColor: "black",
              fontSize: "15px",
            }}
          >
            {record.estado}
          </Tag>
        ),
      },
      {
        title: "Estado del pago",
        dataIndex: "estadoPago",
        render: (_, record) => (
          <Tag
            style={{
              fontWeight: 620,
              color: "white",
              backgroundColor: "green",
              fontSize: "15px",
            }}
          >
            {record.estadoPago === "paid" && "Pagado"}
          </Tag>
        ),
      },
    ];

    return <Table loading={loading} columns={columns} dataSource={pedidos} />;
  }

  return (
    <div className="app">
      <Space direction="vertical">
        <Typography.Title level={4}>Pedidos</Typography.Title>
        <Input.Search
          placeholder="Buscar por email"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <TablePedidos />
      </Space>
    </div>
  );
}

export default Pedidos;
