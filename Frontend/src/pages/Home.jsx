import React from "react";
import heroImg01 from "../assets/images/hero-img01.png";
import heroImg02 from "../assets/images/hero-img02.png";
import heroImg03 from "../assets/images/hero-img03.png";
import icon01 from "../assets/images/icon01.png";
import icon02 from "../assets/images/icon02.png";
import icon03 from "../assets/images/icon03.png";
import featureImg from "../assets/images/feature-img.png";
import faqImg from "../assets/images/faq-img.png"
import videoIcon from "../assets/images/video-icon.png";
import avatarIcon from "../assets/images/avatar-icon.png";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import About from "../components/About/About";
import ServiceList from "../components/Services/ServiceList";
// import DoctorList from "../components/Doctors/DoctorList";
import FaqList from "../components/Faq/FaqList";
import Testimonial from "../components/Testimonial/Testimonial";
// import TestSwiper from "../components/Testimonial/TestSwiper";

const Home = () => {
  return (
    <>
      {/* ====== hero section ====== */}
      <section className="hero__section pt-[60px] 2xl:h-[800px]">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
            {/* ====== hero content ====== */}
            <div>
              <div className="lg:w-[570px]">
                <h1 className="text-[36px] leading-[46px] text-textColor font-[800] md:text-[60px] md:leading-[70px]">
                Streamlining Your Service Experience!
                </h1>
                <p className="text__para">
                  Our intuitive platform connects you with top professionals, making scheduling a breeze. We are dedicated to enhancing your everyday life by delivering reliable, tailored services that let you focus on what truly matters. Experience the future of service with us, where convenience meets excellence!
                </p>

                <Link to="/doctors">
                <button className="btn">Request an Appointment</button>
                </Link>
              </div>
              {/* ====== hero counter ====== */}
              <div className="mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px]">
                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                    30+
                  </h2>
                  <span className="w-[100px] h-2 bg-yellowColor rounded-full block mt-[-14px]"></span>
                  <p className="text__para">Cities</p>
                </div>

                {/* <div>
                    <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">15+</h2>
                    <span className="w-[100px] h-2 bg-purpleColor rounded-full block mt-[-14px]"></span>
                      <p className="text__para">Clinic Location</p>
                  </div> */}

                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                    100%
                  </h2>
                  <span className="w-[100px] h-2 bg-irisBlueColor rounded-full block mt-[-14px]"></span>
                  <p className="text__para">Customer Satisfaction</p>
                </div>
              </div>
            </div>
            {/* ====== hero content ====== */}

            <div className="flex gap-[30px] justify-end">
              <div>
                <img className="w-full" src={heroImg01} alt="" />
              </div>
              <div className="mt-[30px]">
                <img src={heroImg02} alt="" className="w-full mb-[30px]" />
                <img src={heroImg03} alt="" className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ====== hero section end ====== */}

      {/* ====== How it works Section ====== */}
      <section>
        <div className="container">
          <div className="lg:w-[470px] mx-auto">
            <h2 className="heading text-center">
              Providing the best household services
            </h2>
            <p className="text__para text-center">
            Because your home deserves the best. Committed to making it a better place.
            </p>
          </div>

          {/* <div className="flex flex-wrap items-center justify-between flex-col md:flex-row gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]"></div> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
            {/* Find a Doctor */}
            <div className="py-[30px] px-5">
              <div className="flex items-center justify-center">
                <img src={icon01} alt="" />
              </div>
              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                  Find a Captain
                </h2>
                <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                Chart a course to success with our experienced captains. Connecting you with reliable professionals for all your needs.
                </p>

                <Link
                  to="/captains"
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex  items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>
              </div>
            </div>

            {/* Find aLocation */}
            <div className="py-[30px] px-5">
              <div className="flex items-center justify-center">
                <img src={icon02} alt="" />
              </div>
              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                  Find a Location
                </h2>
                <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                Easily locate the best services near you. Discover trusted professionals in your area.
                </p>

                <Link
                  to="/users/profile/me"
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex  items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>
              </div>
            </div>

            {/* Book a Appointment */}
            <div className="py-[30px] px-5">
              <div className="flex items-center justify-center">
                <img src={icon03} alt="" />
              </div>
              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                  Book an Appointment
                </h2>
                <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                Take the first step towards quality service. Schedule your appointment today and let us take care of the rest.
                </p>

                <Link
                  to="/calender"
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex  items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ====== How it works Section ends ====== */}

      {/* ====== About Section Starts ====== */}
      <About />
      {/* ====== About Section Ends ====== */}

      {/* ====== Service Section Starts ====== */}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">Our household services</h2>
            <p className="text__para text-center">
            Because your home deserves the best. Committed to making it a better place.
            </p>
          </div>

          <ServiceList />
        </div>
      </section>
      {/* ====== Service Section Ends ====== */}

      

      {/* ====== Our Doctor Section Starts ====== */}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">Our Great Captains</h2>
            <p className="text__para text-center">
            Passionate leaders dedicated to delivering quality and reliability in every task.
            </p>
          </div>  

          {/* <DoctorList /> */}
        </div>
      </section>
      {/* ====== Our Doctor Section Ends ====== */}

      {/* ====== faq Section Starts ====== */}
      <section>
        <div className="container">
          <div className="flex justify-between gap-[50px] lg:gap-0 md:gap-2">
            <div className="w-1/2 hidden md:block">
              <img src={faqImg} alt="faq image" />
            </div>
            
            <div className="w-full md:w-1/2">
              <h2 className="heading">Most questions by our beloved patients</h2>

              <FaqList />
            </div>
          </div>
        </div>
      </section>
      {/* ====== faq Section Ends ====== */}

      {/* ====== Testimonial Starts ====== */}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">What our customers have to say</h2>
            <p className="text__para text-center">Hear directly from those who trust us for their service needs.</p>
          </div>
          <Testimonial />
          {/* <TestSwiper /> */}
        </div>
      </section>
      {/* ====== Testimonial Ends ====== */}
    </>
  );
};

export default Home;
