import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import './css/home.css'
import { Navigation, Pagination } from "swiper/modules";

const Home = () => {
  return (
    <div>
      <Swiper
        autoHeight={true}
        spaceBetween={20}
        navigation={true}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img  
          className="slider_image"
            src="https://basket-topic-7.vercel.app/assets/img4-qKyFR-H-.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
           className="slider_image"
            src="https://basket-topic-7.vercel.app/assets/img1-Ctj_seEv.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
           className="slider_image"
            src="https://basket-topic-7.vercel.app/assets/img1-Ctj_seEv.jpg"
            alt=""
          />
        </SwiperSlide>
    
      </Swiper>
    </div>
  );
};

export default Home;
