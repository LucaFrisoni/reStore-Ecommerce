"use client";
import React from "react";
import { Navbar } from "../components/navbar/navbar";
import Footer from "../components/footer/footer";

function Contacto() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8">
        <div className="container mx-auto py-8">
          <h1 className="text-2xl font-bold mb-8">Contacto</h1>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h2 className="text-lg font-semibold mb-4">Ayudame a comprar</h2>
              <p>
                Número de teléfono:{" "}
                <span className="font-bold">123-456-7890</span>
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-4">
                Problemas con tu pedido
              </h2>
              <p>
                Número de teléfono:{" "}
                <span className="font-bold">987-654-3210</span>
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-4">Quiero vender</h2>
              <p>
                Número de teléfono:{" "}
                <span className="font-bold">555-555-5555</span>
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-4">Rastrear mi pedido</h2>
              <p>
                Número de teléfono:{" "}
                <span className="font-bold">777-777-7777</span>
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Contacto;
