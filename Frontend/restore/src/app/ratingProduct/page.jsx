"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "../components/navbar/navbar";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const Rating = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [detail, setDetail] = useState({});

  const searchParams = useSearchParams();
  const router = useRouter();

  const product = searchParams.get("product");
  const user = searchParams.get("user");

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `https://re-store.onrender.com/categories/technology/Detail/${product}`
      );
      setDetail(response.data.result[0]);
    };
    fetch();
  }, []);

  const submitRating = async () => {
    await axios.put(
      `https://re-store.onrender.com/categories/technology/rating/${product}/${user}`,
      {
        rate: rating,
        comment: comment,
        product: product,
        user: user,
      }
    );
    router.push(`/user`);
  };

  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const buttonDisable = rating === 0 || comment.trim() === "";

  const calculateDiscountedPrice = () => {
    if (detail?.Ofertas && detail.precio) {
      const descuento = parseFloat(detail.Ofertas) / 100;
      const precio = parseFloat(detail.precio);
      const precioConDescuento = precio - precio * descuento;
      return precioConDescuento.toFixed(2);
    }
    return null;
  };
  const precioConDescuento = calculateDiscountedPrice();

  return (
    <div>
      {console.log(detail)}
      <Navbar />
      <div className="flex justify-around items-center h-screen">
        <div className="flex flex-col items-start mx-4">
          <div className="rounded-lg p-8">
            {detail && (
              <div>
                <h3 className="text-blue-900 text-xl font-semibold mb-2">
                  {detail.name}
                </h3>
                <img
                  src={detail.background_image}
                  alt={detail.name}
                  className="w-40 h-auto mb-4"
                />
                {precioConDescuento ? (
                  <p className="text-blue-900 text-xl font-semibold">
                    Precio:{" "}
                    <span className="text-red-500 line-through">
                      ${detail.precio}
                    </span>{" "}
                    <span className="">${precioConDescuento}</span>
                  </p>
                ) : (
                  <p className="text-blue-900 text-xl font-semibold">
                    Precio: ${detail.precio}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col items-start ml-8">
          <div className="flex items-center mt-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                xmlns="http://www.w3.org/2000/svg"
                fill={star <= rating ? "yellow" : "none"}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer"
                onClick={() => handleRatingClick(star)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
            ))}
          </div>
          <p className="text-blue-900 text-m font-semibold">
            {rating} De 5 estrellas
          </p>
          <div className="mt-4">
            <textarea
              className="p-2 border border-gray-300 rounded resize-none"
              placeholder="Deja tu comentario"
              value={comment}
              onChange={handleCommentChange}
              style={{ width: "23rem", height: "10rem" }}
            ></textarea>
          </div>
          <button
            className={`mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${
              buttonDisable ? "bg-gray-300 cursor-not-allowed" : ""
            }`}
            onClick={submitRating}
            disabled={buttonDisable}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rating;

export const dynamic = "force-dynamic";
