import React from "react";
import { Link } from "react-router-dom";
import aboutImg from "../../assets/images/about.png";
import aboutCardImg from "../../assets/images/about-card.png";

const About = () => {
  return (
    <section>
      <div className="container">
        <div className="flex justify-between gap-[10px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row">
          {/*====== about img ======*/}
          <div className="relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1">
            <img src={aboutImg} alt="about image" />
            <div className="absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-30%] md:right-[-7%] lg:right-[22%]">
              
            </div>
          </div>

          {/*====== about content ======*/}
          <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2 py-3">
            <h2 className="heading">Proud to Be Your Trusted Service Provider</h2>
            <p className="text__para">
            For over a decade, we have been recognized as a leading provider of household services, dedicated to excellence in every interaction.
            </p>
            <p className="text__para">
            Our commitment to quality is unwavering; we focus not just on what we have achieved but on how we can enhance your experience tomorrow. Delivering the best for our community is our daily mission.
            </p>

            <Link to='/'>
              <button className="btn">Learn More</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
