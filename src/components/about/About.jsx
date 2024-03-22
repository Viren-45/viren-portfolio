import React from "react";
import "./about.css";
import ME from "../../assets/me-about.jpg"
import {FaAward} from "react-icons/fa";
import {FiUsers} from "react-icons/fi";
import {VscFolderLibrary} from "react-icons/vsc";

const About = () => {
  return (
    <section id="about">
      <h5>Get to Know</h5>
      <h2>About Me</h2>

      <div className="container about_container">
        <div className="about_content">
          <div className="about_cards">
            <article className="about_card">
              <FaAward className="about_icon"/>
              <h5>Education</h5>
              <small>
                Computer Systems Technician
              </small>
            </article>

            <article className="about_card">
              <VscFolderLibrary className="about_icon"/>
              <h5>Projects</h5>
              <small>10+ Small and big projects</small>
            </article>
          </div>

          <div className="about_detail">
            <div>
              <p>
              As an aspiring developer, I'm fueled by a passion for crafting digital experiences. While my professional journey is just beginning, I've devoted substantial time to mastering HTML, CSS, JavaScript, Next.js, Express.js and React.js through self-guided learning. Through personal projects, I've honed my skills and developed an eye for detail in design. Eager to contribute and grow, I'm committed to embracing challenges and continuously expanding my knowledge in the ever-evolving world of web development.
              </p>
            </div>

            <div>
              <a href="#contact" className="btn btn-primary">Let's Talk</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About;