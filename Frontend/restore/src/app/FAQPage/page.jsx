"use client";
import React from "react";
import Footer from "../components/footer/footer";
import { Navbar } from "../components/navbar/navbar";

function FAQPage() {
  const faqs = [
    {
      question: "¿Cómo puedo realizar un pedido?",
      answer:
        "Puedes realizar un pedido siguiendo estos pasos: [instrucciones detalladas].",
    },
    {
      question: "¿Cuál es el plazo de entrega?",
      answer:
        "El plazo de entrega varía según tu ubicación y el método de envío seleccionado. Normalmente, entregamos en un plazo de X a Y días hábiles.",
    },
    {
      question: "¿Cuáles son las opciones de pago disponibles?",
      answer:
        "Aceptamos tarjetas de crédito, transferencia bancaria y PayPal como formas de pago.",
    },
    {
      question: "¿Puedo realizar cambios en mi pedido después de realizarlo?",
      answer:
        "Dependiendo del estado de tu pedido, es posible realizar cambios. Ponte en contacto con nuestro equipo de atención al cliente para obtener ayuda.",
    },
    {
      question: "¿Cómo puedo realizar un seguimiento de mi pedido?",
      answer:
        "Una vez que tu pedido haya sido enviado, recibirás un correo electrónico con un enlace de seguimiento. Haz clic en el enlace para rastrear tu paquete.",
    },
    {
      question: "¿Ofrecen envío internacional?",
      answer:
        "Sí, realizamos envíos internacionales a la mayoría de los países. Ten en cuenta que pueden aplicarse tarifas de aduana y restricciones adicionales según el destino.",
    },
    {
      question: "¿Cuál es su política de devoluciones?",
      answer:
        "Aceptamos devoluciones dentro de los 30 días posteriores a la recepción del pedido. Por favor, revisa nuestra política de devoluciones para obtener más detalles.",
    },
    {
      question: "¿Tienen servicio al cliente disponible los fines de semana?",
      answer:
        "Nuestro servicio al cliente está disponible de lunes a viernes de 9 a.m. a 6 p.m. Puedes contactarnos a través de correo electrónico o por teléfono durante ese horario.",
    },
    {
      question: "¿Ofrecen descuentos para compras al por mayor?",
      answer:
        "Sí, ofrecemos descuentos especiales para compras al por mayor. Ponte en contacto con nuestro equipo de ventas para obtener más información.",
    },
    {
      question: "¿Puedo cancelar mi pedido?",
      answer:
        "Si tu pedido aún no ha sido procesado o enviado, puedes solicitar la cancelación. Ponte en contacto con nosotros lo antes posible para que podamos ayudarte.",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8">
        <div className="container mx-auto py-8">
          <h1 className="text-2xl font-bold mb-4">Preguntas frecuentes</h1>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index}>
                <h2 className="text-lg font-semibold">{faq.question}</h2>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default FAQPage;
