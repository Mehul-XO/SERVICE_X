import React from "react";
// import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const TestSwiper = () => {
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Swiper slidesPerView={1}>
        <SwiperSlide>
          <div>Testimonial 1</div>
        </SwiperSlide>
        <SwiperSlide>
          <div>Testimonial 2</div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default TestSwiper;
