import React, { Fragment } from 'react';
import img1 from '../../assets/olx.jpg';
import img2 from '../../assets/olx2.jpg'
import img3 from '../../assets/olx3.jpg'
import {Carousel} from 'react-bootstrap';
import classes from './carousel.module.css'

function CarouselDisplay() {
  return (
    <Fragment>
        <Carousel>
            <Carousel.Item >
                <img className={classes.Img}
                src={img1}
                alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img className={classes.Img}
                src={img2}
                alt="Third slide"
                />
            </Carousel.Item>
            <Carousel.Item >
                <img className={classes.Img}
                src={img3}
                alt="Third slide"
                />
            </Carousel.Item>
        </Carousel>
    </Fragment>
  );
}

export default CarouselDisplay;