"use client";
import React from "react";
import Card from "../card/card";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState,useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Card as AntCard,Image,Tooltip,Carousel as AntCarousel } from "antd";


const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

function HomeContainer({ data }) {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState(null);
  const [isBan, setBan] = useState(null);
  const [reviews, setReviews] = useState([]);
  const fetchEmail = async () => {
    const { data } = await axios.get(
      `https://re-store.onrender.com/users/${email}/email`
    );
    if (data.ban === true) {
      setBan(true);
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      const { data } = await axios.get(
        "https://re-store.onrender.com/categories/technology/allProducts?fav=true"
      );
      setReviews(data.result);
    };
    fetchReviews();
  }, []);

  console.log(reviews);

  useEffect(() => {
    if (session) {
      setEmail(session.user.email);
    }
  }, [session]);

  useEffect(() => {
    if (email) {
      fetchEmail();
    }
  }, [email]);

  useEffect(() => {
    if (isBan) {
      Swal.fire({
        icon: "error",
        title: "¡Estás baneado!",
        text: "Estás baneado hasta nuevo aviso. No podrás iniciar sesión.",
      });
      signOut();
    }
  }, [isBan]);


  
  const filteredData =  data.result.filter(
    (product) => product.Disabled !== true
    );


    const halfIndex = Math.floor(reviews.length / 2);
    const firstHalf = reviews.slice(0, halfIndex);
    const secondHalf = reviews.slice(halfIndex);

  return (
    <>
    <h4 className="text-2xl text-center mt-20 font-small text-blue-900">Descuentos en Smartphones</h4>
      <Carousel className="mt-5" responsive={responsive}>
        {filteredData.filter((props) => Object.keys(props.subcategoria)[0] === "Celulares").map((props) => {
          return (
            <Card
              name={props.name}
              precio={props.precio}
              estado={props.state}
              marca={props.Marca}
              oferta={props.Ofertas}
              subcategoria={props.subcategoria}
              key={props._id}
              id={props._id}
              image={props.background_image}
              discount={props.Ofertas}
              ubicacion={props.Ubicacion}
              Disabled={props.Disabled}
            />
          );
        })}
      </Carousel>

      <h4 className="text-2xl text-center mt-20 font-small text-blue-900">Descuentos en Computadoras</h4>
      <Carousel className="mt-5" responsive={responsive}>
        {filteredData.filter((props) => Object.keys(props.subcategoria)[0] === "Computacion").map((props) => {
          return (
            <Card
              name={props.name}
              precio={props.precio}
              estado={props.state}
              marca={props.Marca}
              oferta={props.Ofertas}
              subcategoria={props.subcategoria}
              key={props._id}
              id={props._id}
              image={props.background_image}
              discount={props.Ofertas}
              ubicacion={props.Ubicacion}
              Disabled={props.Disabled}
            />
          );
        })}
      </Carousel>
      <h5 className="text-1xl text-center mt-20 font-medium text-blue-900" >Reviews de nuestros clientes</h5>
      <div className="mt-5 flex justify-center m-2">
      <AntCarousel style={{width: 400}} autoplay autoplaySpeed={3000}  >
        {reviews !== []
          ? firstHalf.map((review) => {
              return (
                <AntCard
                  className="h-full flex flex-col justify-between"
                  style={{ width: 200 }}
                  cover={
                    <div style={{ display: 'flex',
                    justifyContent: 'center',}}>

                    <Image
                    src={review.background_image}
                    alt={review.name}
                    // className="aspect-square object-contain fill"
                    style={{
                      height: 'auto',
                      maxHeight: '200px',
                      width: 'auto',
                      maxWidth: '200px',
                      objectFit: 'cover'
                    }}
                    />
                    </div>
                  }
                >
                  <Tooltip title={review.name}>

                  <AntCard.Meta
                    title={<span style={{ fontSize: '14px' }}>{review.name}</span>}
                    description={review.rating.comments[0]}
                    />
                    </Tooltip>
                </AntCard>
              );
            })
          : null}
      </AntCarousel >
      <AntCarousel style={{width: 400}} autoplay autoplaySpeed={3000}  >
        {reviews !== []
          ? secondHalf.map((review) => {
              return (
                <AntCard
                  className="h-full flex flex-col justify-between"
                  style={{ width: 150}}
                  cover={
                    <div style={{ display: 'flex',
                    justifyContent: 'center',}}>

                    <Image
                    src={review.background_image}
                    alt={review.name}
                    style={{
                      height: 'auto',
                      maxHeight: '200px',
                      width: 'auto',
                      maxWidth: '200px',
                      objectFit: 'cover'
                    }}
                    />
                    </div>
                  }
                >
                  <Tooltip title={review.name}>

                  <AntCard.Meta
                    title={<span style={{ fontSize: '14px' }}>{review.name}</span>}
                    description={review.rating.comments[0]}
                    />
                    </Tooltip>
                </AntCard>
              );
            })
          : null}
          
      </AntCarousel >
      </div>
    </>
  );
}

export default HomeContainer;
