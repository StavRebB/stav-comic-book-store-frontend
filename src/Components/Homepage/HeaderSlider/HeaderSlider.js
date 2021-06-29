import React, { Component } from 'react';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.min.css';
import './HeaderSlider.css';
import { Link } from "react-router-dom";

class HeaderSlider extends Component {
  constructor() {
    super();
    this.swiper = React.createRef();
  }

  componentDidMount = () => {
    this.swiper = new Swiper(".swiper-container", {
      grabCursor: true, // little hand cursor over slides
      loop: true, // allows the slides to loop from the last slide back to the first 
      // in that direction
      centeredSlides: true, // helps to center the slides
      slidesPerView: 1, // allows the slide you're looking at to be the centered slide 
      // with the slide before and the slide after to be hanging just off the page 
      // from the left and right of it
      parallax: true, // Helps focus the users attention to the slide in front/center
      effect: "coverflow",
      coverflowEffect: {
        rotate: 50, // Slide rotate in degrees
        stretch: 0, // Stretch space between slides (in px)
        depth: 100, // Depth offset in px (slides translate in Z axis)
        modifier: 1, // Effect multipler
        slideShadows: true, // Enables slides shadows
      },
      pagination: {
        el: ".swiper-pagination", // little dots under the slides for navigation
        clickable: true, // allows you to click on the little dots
      },
      navigation: {
        nextEl: ".swiper-button-next", // arrows on the side of the slides
        prevEl: ".swiper-button-prev", // arrows on the side of the slides
      },
    });
   }

    render () {
        return(    
          <div className="yes pb-12">
            <div className="swiper-container">
              <div className="swiper-wrapper">
                <div className="swiper-slide slider1">
                  <h1 className="text-8xl z-10 absolute text-white font-bold left-1/3 top-20">New Books Every Week!</h1>
                  <Link exact="true" to="/catalogue">
                    <button className="text-5xl z-10 absolute text-white font-bold left-1/3 top-1/2 bg-black px-10 py-5">Shop now!</button>
                  </Link>
                  <img src='/images/captain-america-banner.jpg' alt=""/>
                </div>
                <div className="swiper-slide">
                  <h1 className="text-8xl z-10 absolute text-white font-bold left-1/3 top-20 text-right">Keep up to Date!</h1>
                  <Link to="/blog">
                    <button className="text-5xl z-10 absolute text-white font-bold right-1/3 top-1/2 bg-black px-10 py-5 float-right">Visit our blog!</button>
                  </Link>
                  <img src='/images/deadpool-banner.jpg' alt=""/>
                </div>
                <div className="swiper-slide">
                  <h1 className="text-8xl z-10 absolute text-white font-bold left-1/3 top-20">Join Our Members!</h1>
                  <Link to="/login">
                    <button className="text-5xl z-10 absolute text-white font-bold left-1/3 top-1/2 bg-black px-10 py-5">Sign Up!</button>
                  </Link>
                  <img src='/images/iron-man-banner.jpg' alt=""/>
                </div>
              </div>
              <div className="swiper-pagination" />
              <div className="swiper-button-prev text-yellow-600" />
              <div className="swiper-button-next text-yellow-600" />
            </div>

          </div>
        )
    }
}

export default HeaderSlider;