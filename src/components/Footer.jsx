import React from 'react';
import {HiPhone, HiLocationMarker} from "react-icons/hi"
import {IoLogoInstagram} from "react-icons/io"
import logo from '../assets/logo_short.png';
import {Link} from "react-router-dom";
import "../styles/footer.scss"
import {useCookies} from "react-cookie";


const Footer = () => {
    const [cookies] = useCookies();

    return (
        <footer>
        <div className="footer-container">
            <div className="footer-image">
                <Link to={"/"}><img src={logo} alt={logo}/></Link>
            </div>
            <div className="footer-logos">
                <label> Contact </label>
                    <div>
                        <IoLogoInstagram size={35} color="#cb9cf2ff"/>
                        <a href="https://www.instagram.com/ofekhazan121/" target="_blank">
                            OG-Keys
                        </a>
                    </div>
                    <div>
                        <HiLocationMarker size={35} color="#cb9cf2ff"/>
                        <a href="https://goo.gl/maps/yzrbTrwG5rBEAwV97" target="_blank">
                            Our Shop
                        </a>
                    </div>
                    <div>
                        <HiPhone size={35} color="#cb9cf2ff"/>
                        <a href="tel:+972528248800" target="_blank">
                            052-8248800
                        </a>
                    </div>
            </div>
            <div className="footer-links">
                <label>Links</label>
                <Link to={"/"}>Home</Link>
                { cookies.userName ? <Link to={"/userProfile"}>Profile</Link> : <Link to={"/login"}>Login</Link>}
                <Link to={"/contactSupport"}>Contact Us!</Link>
                <Link to={"/about"}>About Us!</Link>
            </div>
            <div className="footer-navi">
                <label>Navigation</label>
                <Link to={"/keyboards"}>Keyboards</Link>
                <Link to={"/keycaps"}>Keycaps</Link>
                <Link to={"/switches"}>Switches</Link>
                <Link to={"/accessories"}>Accessories</Link>
            </div>
        </div>
        </footer>
    );
};

export default Footer;