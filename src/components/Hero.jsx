import React from "react";
import {Navigation, Pagination} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import '../styles/hero.scss';
import hero1 from '../assets/hero1.png';
import hero2 from '../assets/hero2.png';
import hero3 from '../assets/hero3.png';
import hero4 from '../assets/hero4.png';
import hero5 from '../assets/hero5.png';
import Typed from "react-typed";

export const Hero = () => {

    const gallery = [
        hero1,
        hero2,
        hero3,
        hero4,
        hero5
    ]

    return (
        <div className="swiper-container">
            <Swiper
                slidesPerView={1}
                spaceBetween={150}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="hero-swiper"
            >
                {gallery.map((image) => <SwiperSlide className="swiper-image" key={image}><img src={image} title={image}
                                                                                               alt="image"/></SwiperSlide>)}
            </Swiper>
            <Typed className="hero-typed"
                   strings={["Custom Keyboards", "Keyboard Parts", "Accessories", "Keyboard Assembly"]} typeSpeed={100}
                   backSpeed={80} loop/>
            <p></p>
        </div>
    );
};
