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
import Swal from "sweetalert2";

function Clientes() {
  const router = useRouter();
  // useEffect(() => {
  //   if (!document.cookie.includes("Admin")) {
  //     router.push("/home");
  //   }
  // }, []);

  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  const [searchText, setSearchText] = useState("");
  const getClientes = async () => {
    const { data } = await axios.get("https://re-store.onrender.com/users");
    return data;
  };

  const fetchData = async () => {
    const clientes = await getClientes();
    const filteredClients = clientes.filter((client) => client._id !== "649a1713b5f91733f2cbf8ed");
    setClientes(filteredClients);
  };

  useEffect(() => {
    fetchData()
  },[])

  const handleBan = async (clienteId) => {
    try {
      setLoading(true)
      const response = await axios.put(
        "https://re-store.onrender.com/users/ban/user",
        {
          userId: clienteId,
        }
      );
      console.log("Usuario baneado:", response.data);
    } catch (error) {
      console.error("Error al banear al usuario:", error);
    }finally {
      setLoading(false)
      fetchData()
    }
  };

  function TableClients() {
    const filteredClients = searchText
      ? clientes.filter((cliente) =>
          cliente.email.toLowerCase().includes(searchText.toLowerCase())
        )
      : clientes;

    const columns = [
      {
        title: "Foto",
        dataIndex: "imagenDePerfil",
        render: (link) => {
          return <Avatar src={link} />;
        },
      },
      {
        title: "Email",
        dataIndex: "email",
        filteredValue: [searchText],
        onFilter: (text,record) => {
          return (
            record.email?.toLowerCase().includes(text.toLowerCase())
          )
        }
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
        title: "Género",
        dataIndex: "genero",
        render: (genero) => {
          let color, backgroundColor;
          if (genero) {
            switch (genero.toLowerCase()) {
              case "masculino":
                color = "grey";
                backgroundColor = "blue";
                break;
              case "femenino":
                color = "grey";
                backgroundColor = "pink";
                break;
              default:
                color = "white";
                backgroundColor = "black";
                break;
            }
          }
          return (
            <Tag color={backgroundColor} style={{ color }}>
              {genero}
            </Tag>
          );
        },
      },
      {
        title: "ID",
        dataIndex: "_id",
      },
      {
        title: "Acciones",
        render: (text, cliente) => (
          <Space>
            <Button onClick={() => handleBan(cliente._id)}>
              {!cliente.ban ? "Banear" : "Desbanear"}{" "}
            </Button>
          </Space>
        ),
      },
      {
        title: "Ban",
        dataIndex: "ban",
        render: (ban) => (
          <span style={{ color: ban ? "red" : "green", fontWeight: "bold" }}>
            {ban ? "true" : "false"}
          </span>
        ),
      },
    ];
    return (
      <Table loading={loading} columns={columns} dataSource={clientes} />
    );
  }
  return (
    <div className="app">
      <Space direction="vertical">
        <Typography.Title level={4}>Clientes</Typography.Title>
        <Input.Search
          placeholder="Buscar por email"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <TableClients />
      </Space>
    </div>
  );
}

export default Clientes;
