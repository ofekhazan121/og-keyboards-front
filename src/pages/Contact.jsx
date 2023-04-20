import React from 'react';
import "../styles/contact.scss"
import {IoLogoInstagram} from "react-icons/io";

const Contact = () => {
    return (
        <div className="container">
            <div>
                <div className="contact">
                    <h1>Contact Us!</h1>
                    <a href="tel:+972528248800">052-824-8800</a>
                    <div className="contact-instagram">
                        <IoLogoInstagram size={35} color="#cb9cf2ff" className="ml-2 "/>
                        <a href="https://www.instagram.com/ofekhazan121/" target="_blank">OG-keys</a>
                    </div>
                </div>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13670.31995884947!2d35.0358172736462!3d31.06579009250574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1502460fbedbcdeb%3A0xe988ec6609ec2113!2z16LXldec15kg15TXkteo15PXldedIDgsINeT15nXnteV16DXlA!5e0!3m2!1siw!2sil!4v1681643683627!5m2!1siw!2sil"
                    width="600"
                    height="450"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
        </div>
    );
};

export default Contact;