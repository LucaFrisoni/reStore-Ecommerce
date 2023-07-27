"use client";
import { useEffect, useState } from "react";
import React from "react";
import "./dash.css";
import { Space, Typography, Card, Statistic, Table } from "antd";
import { useRouter } from "next/navigation";
import {
  ShoppingCartOutlined,
  DollarOutlined,
  UserOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import axios from "axios";

function Dashboard() {
  const router = useRouter();

  // useEffect(() => {
  //   if (!document.cookie.includes("Admin")) {
  //     router.push("/home");
  //   }
  // }, []);

  function DashboardCard({ titulo, numero, icon }) {
    return (
      <Card>
        <Space>
          {icon}
          <Statistic title={titulo} value={numero} />
        </Space>
      </Card>
    );
  }

  const getOrdenesRecientes = async () => {
    const { data } = await axios.get(
      "https://re-store.onrender.com/users/envios/all"
    );

    return data.users;
  };
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allordenes, setAllOrdenes] = useState([]);
  useEffect(() => {
    setLoading(true);
    getOrdenesRecientes().then((res) => {
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
          };
          newPedidos.push(newPedido);
        });
      });
      setAllOrdenes(newPedidos);
      setOrdenes(newPedidos.splice(0, 5));
      setLoading(false);
    });
  }, []);
  function RecentOrders() {
    const columns = [
      {
        title: "Email",
        dataIndex: "email",
        render: (_, record) => (
          <span style={{ color: "green" }}>{record.email}</span>
        ),
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
        render: (_, record) => (
          <span style={{ color: "#00CC00" }}>{`$${record.pagado} USD`}</span>
        ),
      },
    ];

    return (
      <>
        <Typography.Text>Ordenes Recientes</Typography.Text>
        <Table
          pagination={false}
          loading={loading}
          columns={columns}
          dataSource={ordenes}
        />
      </>
    );
  }

  const [dataClientes, setDataClientes] = useState(null);
  const [clientesTot, setTotClientes] = useState(null);
  const [productosTot, setTotProductos] = useState(null);
  const [dataProductos, setDataProductos] = useState(null);
  const [totalProfit, setProfit] = useState(null);

  useEffect(() => {
    const getAllClientes = async () => {
      const { data } = await axios.get("https://re-store.onrender.com/users");
      setDataClientes(data);
    };

    getAllClientes();
  }, []);

  useEffect(() => {
    if (dataClientes) {
      const allClientes = dataClientes.length;
      setTotClientes(allClientes);
    }
  }, [dataClientes]);

  useEffect(() => {
    const getAllProductos = async () => {
      const { data } = await axios.get(
        "https://re-store.onrender.com/categories/technology/allProducts"
      );
      setDataProductos(data.result);
    };

    getAllProductos();
  }, []);

  useEffect(() => {
    if (dataProductos) {
      const allProductos = dataProductos.length;
      setTotProductos(allProductos);
    }
  }, [dataProductos]);

  useEffect(() => {
    const getTotalProfit = async () => {
      const { data } = await axios.get(
        "https://re-store.onrender.com/payments/earnings"
      );
      const earningsFormatted = data.earnings.toLocaleString("es-ES", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      setProfit(earningsFormatted);
    };

    getTotalProfit();
  }, [totalProfit]);

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Dashboard</Typography.Title>
      <Space direction="horizontal">
        <DashboardCard
          icon={
            <ShoppingCartOutlined
              style={{
                color: "green",
                backgroundColor: "rgba(0,255,0,0.15",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          titulo={"Ordenes"}
          numero={allordenes.length}
        />
        <DashboardCard
          icon={
            <ShopOutlined
              style={{
                color: "purple",
                backgroundColor: "rgba(0,255,255,0.15",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          titulo={"Inventario"}
          numero={productosTot}
        />
        <DashboardCard
          icon={
            <UserOutlined
              style={{
                color: "blue",
                backgroundColor: "rgba(0,0,255,0.15",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          titulo={"Clientes"}
          numero={clientesTot}
        />
        <DashboardCard
          icon={
            <DollarOutlined
              style={{
                color: "red",
                backgroundColor: "rgba(255,0,0,0.15",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          titulo={"Gananacias Totales"}
          numero={totalProfit}
        />
      </Space>
      <Space>
        <RecentOrders />
      </Space>
    </Space>
  );
}

export default Dashboard;
