import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { img } from './data.js';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // important!
import classes from './Carousel.module.css'

const CarouselEffect = () => {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
        
      
      >
        {img.map((imageItem, index) => (
          <div key={index}>
            <img src={imageItem} alt={`slide-${index}`} />
          </div>
        ))}
      </Carousel>
      <div className={classes.hero_img}>

      </div>
    </div>
  );
};

export default CarouselEffect;
