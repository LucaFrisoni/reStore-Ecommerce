"use client";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./change.css";
import Link from "next/link";

function ChangePassword() {
  const URL = "https://re-store.onrender.com/users";

  const [flag, setFlag] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });

  // ----------------------------------------------------------------Validates------------------------------------------------------------------------------
  async function validate(user) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/;
    const error = {};

    if (!emailRegex.test(user.email)) {
      error.email = "Debes ingresar un email";
    }
    if (user.password) {
      if (!passwordRegex.test(user.password)) {
        error.password =
          "Debes crear una contraseña con una mayuscula, un numero y un caracter especial";
      }
    }
    if (user.password !== user.confirm_password) {
      error.confirm_password = "Las contraseñas no son las mismas";
    }
    return error;
  }

  // ----------------------------------------------------------------Handlers------------------------------------------------------------------------------
  const handleInputs = (event) => {
    const input_name = event.target.name;
    const input_value = event.target.value;
    setUser({
      ...user,
      [input_name]: input_value,
    });
    if (flag === true) {
      setFlag(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = await validate(user);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      if (flag) {
        setFlag(false); // Cambia flag a false si ya se creó un usuario anteriormente
      } else {
        axios
          .put("https://re-store.onrender.com/users/changePassword", {
            email: user.email,
            newPassword: user.password,
          })
          .then(() => {
            setFlag(true);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  // ----------------------------------------------------------------Style-effect------------------------------------------------------------------------------
  useEffect(() => {
    // Guardar los estilos originales del body
    const originalStyles = {
      display: document.body.style.display,
      justifyContent: document.body.style.justifyContent,
      minHeight: document.body.style.minHeight,
      background: document.body.style.background,
      alignItems: document.body.style.alignItems,
    };

    // Aplicar los nuevos estilos al body
    document.body.style.display = "flex";
    document.body.style.justifyContent = "center";
    document.body.style.minHeight = "100vh";
    document.body.style.background = "#0f172a";
    document.body.style.alignItems = "center";

    // Restaurar los estilos originales al desmontar el componente
    return () => {
      document.body.style.display = originalStyles.display;
      document.body.style.justifyContent = originalStyles.justifyContent;
      document.body.style.minHeight = originalStyles.minHeight;
      document.body.style.background = originalStyles.background;
      document.body.style.alignItems = originalStyles.alignItems;
    };
  }, []);

  return (
    <div>
      <div className="sign-body">
        <div className="container_sign">
          <form onSubmit={handleSubmit} className="form">
            <h2>Contraseña Perdida?</h2>
            <div className="inputBox">
              <input
                type="email"
                required
                name="email"
                value={user.email}
                onChange={handleInputs}
              ></input>

              <span className="sign-span">Email</span>
              <p className="erorrp">{errors.email}</p>
            </div>
            <div className="inputBox">
              <input
                type="password"
                required
                name="password"
                value={user.password}
                onChange={handleInputs}
              ></input>

              <span className="sign-span">Nueva contraseña</span>
              <p className="erorrp">{errors.password}</p>
            </div>
            <div className="inputBox">
              <input
                type="password"
                required
                name="confirm_password"
                value={user.confirm_password}
                onChange={handleInputs}
              ></input>

              <span className="sign-span">Confirmar Contraseña</span>
              <p className="erorrp">{errors.confirm_password}</p>
            </div>
            <div className="inputBox">
              <input type="submit" value="Cambiar contraseña"></input>
            </div>
            <p id="userCreatedMessage">{flag ? "Contraseña modificada" : null}</p>
            <p>
              Ya sos miembro?{" "}
              <Link href={"/login"}>
                <p id="asd" className="login">
                  Log in
                </p>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
