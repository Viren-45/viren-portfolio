import React from "react";
import "./header.css";
import CTA from "./CTA"
import ME from "../../assets/me-img.png"
import HeaderSocials from "./HeaderSocials";

const Header = () => {
  return (
    <header>
      <div className="container header_container">
        <h5>Hi There. I'm</h5>
        <h1>Virendra Purohit</h1>
        <h5 className="text-light">Aspiring Developer</h5>
        <CTA />
        <HeaderSocials />

        <div className="me">
          <img className="me-img" src={ME} alt="me" />
        </div>

        <a href="#contact" className="scroll_down">Scroll Down</a>

      </div>
    </header>
  )
}

export default Header;