import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import Bubble from "../Bubble";
function Features() {
  return (
    <div className="bubbleInner">
      <Bubble position="top-right" />
      <div className="box center">
        <div className="header">
          <span className="label">Main Features</span>
          <h2>
            Main <span>Features</span> for your next design
          </h2>
        </div>
        <Swiper
          slidesPerView={3.5}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            200: {
              slidesPerView: 1,
            },
            350: {
              slidesPerView: 1.25,
            },
            500: {
              slidesPerView: 1.75,
            },
            800: {
              slidesPerView: 2.5,
            },
            1000: {
              slidesPerView: 3.25,
            },
            1500: {
              slidesPerView: 3.5,
            },
          }}
          modules={[FreeMode]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src="/media/features/0.png" alt="" />
            <h2 className="linearText">AI Creations</h2>
          </SwiperSlide>
          <SwiperSlide>
            <img src="/media/features/1.png" alt="" />
            <h2 className="linearText">Stickers</h2>
          </SwiperSlide>
          <SwiperSlide>
            <img src="/media/features/2.png" alt="" />
            <h2 className="linearText">Social media posts</h2>
          </SwiperSlide>
          <SwiperSlide>
            <img src="/media/features/3.png" alt="" />
            <h2 className="linearText">Posters</h2>
          </SwiperSlide>
          <SwiperSlide>
            <img src="/media/features/4.png" alt="" />
            <h2 className="linearText">Templates</h2>
          </SwiperSlide>
          <SwiperSlide>
            <img src="/media/features/5.png" alt="" />
            <h2 className="linearText">Photo editing</h2>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default Features;
