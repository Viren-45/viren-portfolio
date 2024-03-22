import React from "react";
import "./footer.css";
import {FaFacebookF} from "react-icons/fa";
import {FiInstagram} from "react-icons/fi";
import {AiOutlineLinkedin} from "react-icons/ai";

const Footer = () => {
  return (
    <footer>
      <a href="#" className="footer_logo">Building tomorrow's web today</a> <br />
      <p className="footer-para">Your Ideal Web Developer</p>
      <ul className="permalinks">
        <li><a className="footer_links" href="#">Home</a></li>
        <li><a className="footer_links" href="#about">About</a></li>
        <li><a className="footer_links" href="#experience">Experience</a></li>
        <li><a className="footer_links" href="#portfolio">Portfolio</a></li>
        <li><a className="footer_links" href="#contact">Contact</a></li>
      </ul>

      <div className="footer_socials">
        <a href="https://facebook.com"><FaFacebookF /></a>
        <a href="https://instagram.com"><FiInstagram /></a>
        <a href="https://linkedin.com"><AiOutlineLinkedin /></a>
      </div>

      <div className="footer_copyright">
        <small>&copy; Virendra Purohit. All rights reserved.</small>
      </div>
    </footer>
  )
}

export default Footer;