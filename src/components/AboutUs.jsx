import React from 'react';
import "../styles/about.scss"
import about1 from "../assets/about1.webp"
import about2 from "../assets/about2.jpg"
import about3 from "../assets/about3.jpg"

const AboutUs = () => {

    const images = [
        about1,
        about2,
        about3
    ]

    return (
        <div className="container">
            <div className="about-text">
                <h2>About Us!</h2>
                <h3>Who we are</h3>
                <p>I'm Ofek 👋, a mechanical keyboard enthusiast and a web developer.</p>
                <p>As a web developer, i fell in love with using mechanical keyboards, and i built up a large collection
                    of them, and after a while in the hobby i founded OG-Keyboards with the mission of providing high
                    quality options for other people in the niche</p>
                <br/>
                <h3>What we sell</h3>
                <p>We sell <a href="/keyboards" target="_blank">mechanical keyboards</a> and accessories that help you customize
                    your keyboard to look,sound, and feel exactly how you'd like them to.</p>
                <br/>
                <p>Are you in an office? Try <a href="/switches" target="_blank">silent switches</a>. A pro gamer? Try <a href="/switches"
                                                                                                                 target="_blank">Kailh
                    Speed Gaming switches</a>. Do your fingers hurt from typing all day? Try the ergonomic Penguin
                    switches. Here you'll find a switch that fits your unique needs.</p>
                <br/>
                <p>If you're new to the wonderful world of custom mechanical keyboards, i recommend you to start with
                    the <a href="https://www.smashingmagazine.com/2020/05/complete-guide-mechanical-keyboards/"
                           target="_blank">Ultimate Guide to Mechanical Keyboards</a></p>
            </div>
            <div className="about-images">
                { images.map((image,i) => {
                    return (
                        <img src={image} key={i}/>
                    )
                })}
            </div>
        </div>
    );
};

export default AboutUs;