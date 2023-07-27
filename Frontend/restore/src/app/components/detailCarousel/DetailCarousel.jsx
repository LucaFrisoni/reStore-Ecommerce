"use client"
import React from 'react'
import Card from '../card/card'
import Carousel from 'react-multi-carousel'
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  }}

function DetailCarousel({data}) {

    // const filteredData = data.result.map(product => product.Disabled !== true)
    // console.log(filteredData)
  return (
     <Carousel className="mt-5" responsive={responsive}>
    {data.map((props) => {
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
  )
}

export default DetailCarousel