import React, {useRef} from "react";
import "./portfolio.css";
import projects from "./projects";

const Portfolio = () => {
  const portfolioRef = useRef(null);
  return (
    <section id="portfolio">
      <h5>My Recent Work</h5>
      <h2>Portfolio</h2>
      <div class="portfolio_scroll" ref={portfolioRef}>
        <div className="container portfolio_container">
          {
            projects.map(({id, image, title, github, demo}) => {
              return(
                <article key={id} className="portfolio_item">
                  <div className="portfolio_item-image">
                    <img src={image} alt="" />
                  </div>
                  <h3>{title}</h3>
                  <div className="portfolio_item-cta">
                    <a href={github} className="btn">Github</a>
                    <a href={demo} className="btn btn-primary" target="_blank">Live Demo</a>
                  </div>
                </article>
              )
            })
          }
          <div className="spacer"></div>
        </div>
      </div>
      
    </section>
  )
}

export default Portfolio;