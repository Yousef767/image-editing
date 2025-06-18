import { Link } from "react-router-dom";
import Aside from "../fragments/dashboard/Aside";
import { Field, Form, Formik } from "formik";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { AxiosBG } from "../../api/axios";
import { useEffect } from "react";
import { useState } from "react";

function Dashboard() {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const res = await AxiosBG.get("/assets/backgrounds.json");
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const [active, setActive] = useState(false);
  const handleActive = () => {
    setActive((prev) => !prev);
  };
  return (
    <div className={active ? "dashborad active" : "dashborad"}>
      <Aside />
      <div className="container">
        <div className="dashboardNav">
          <div className="dnBtns">
            <button className=" menu2" onClick={handleActive}>
              <Menu />
            </button>
            <Link to={"##"}>
              <Pro />
              Go pro
            </Link>
          </div>
          <Formik
            initialValues={{ search: "" }}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            <Form className="searchInput">
              <Field
                name="search"
                type="search"
                placeholder="Search for background"
              />
              <button>
                <i className="fa-regular fa-magnifying-glass"></i>
              </button>
            </Form>
          </Formik>
          <div className="avatar">
            <img src="/media/avatar.png" alt="" />
            User name
          </div>
        </div>
        {/* <div className="swiperInner">
          <div className="sp"></div>
          <Swiper
            slidesPerView={3.5}
            spaceBetween={20}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            // centeredSlides={true}
            // centerInsufficientSlides={true}
            pagination={{
              el: ".sp",
              clickable: true,
            }}
            breakpoints={{
              200: {
                slidesPerView: 1,
              },
              350: {
                slidesPerView: 1.5,
              },
              1500: {
                slidesPerView: 1.5,
              },
            }}
            modules={[Autoplay, Pagination]}
            className="mySwiper3"
          >
             {data.version &&
              Array.from({ length: data.backgrounds_new.length }).map((_, i) => (
                <SwiperSlide key={i}>
                  <img
                    src={`https://3rabapp.com/apps/assets/categories/cat${i}.png`}
                    // src={`http://3rabapp.com/apps/assets/bg-thnumbail/cat0-${i}.png`}
                    alt={`Thumbnail ${i}`}
                  />
                </SwiperSlide>
              ))} 

            <SwiperSlide>
              <img src="/media/banner.png" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/media/banner.png" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/media/banner.png" alt="" />
            </SwiperSlide>
          </Swiper>
        </div> */}
        <div className="content">
          <div className="discover">
            <h1>Discover the magic of AI tools</h1>
            <div className="discoverImages">
              <Link to={"##"}>
                <img src="/media/d1.png" alt="" />
              </Link>
              <Link to={"##"}>
                <img src="/media/d2.png" alt="" />
              </Link>
              <Link to={"##"}>
                <img src="/media/d3.png" alt="" />
              </Link>
            </div>
          </div>
          <div className="discover">
            <h1>Another way to design</h1>
            <div className="discoverLinks">
              <Link to={"##"}>Whiteboard</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

function Menu() {
  return (
    <svg
      width="52"
      height="51"
      viewBox="0 0 52 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_662_5799)">
        <g clipPath="url(#clip0_662_5799)">
          <rect x="6" y="3.5" width="40" height="40" rx="6" fill="#F3D34C" />
          <path
            d="M35 19.25H17C16.59 19.25 16.25 18.91 16.25 18.5C16.25 18.09 16.59 17.75 17 17.75H35C35.41 17.75 35.75 18.09 35.75 18.5C35.75 18.91 35.41 19.25 35 19.25Z"
            fill="#3E3C37"
          />
          <path
            d="M35 24.25H17C16.59 24.25 16.25 23.91 16.25 23.5C16.25 23.09 16.59 22.75 17 22.75H35C35.41 22.75 35.75 23.09 35.75 23.5C35.75 23.91 35.41 24.25 35 24.25Z"
            fill="#3E3C37"
          />
          <path
            d="M35 29.25H17C16.59 29.25 16.25 28.91 16.25 28.5C16.25 28.09 16.59 27.75 17 27.75H35C35.41 27.75 35.75 28.09 35.75 28.5C35.75 28.91 35.41 29.25 35 29.25Z"
            fill="#3E3C37"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_662_5799"
          x="0.5"
          y="0"
          width="51"
          height="51"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="2.75" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.25098 0 0 0 0 0.223529 0 0 0 0 0.0431373 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_662_5799"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_662_5799"
            result="shape"
          />
        </filter>
        <clipPath id="clip0_662_5799">
          <rect x="6" y="3.5" width="40" height="40" rx="6" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function Pro() {
  return (
    <svg
      width="28"
      height="29"
      viewBox="0 0 28 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.59771 25.5H22.4011M13.4737 3.81649C13.5255 3.72064 13.6016 3.64071 13.6941 3.58504C13.7865 3.52937 13.892 3.5 13.9994 3.5C14.1068 3.5 14.2123 3.52937 14.3047 3.58504C14.3972 3.64071 14.4733 3.72064 14.5251 3.81649L18.0682 10.6685C18.1527 10.8272 18.2706 10.9648 18.4135 11.0716C18.5564 11.1783 18.7208 11.2515 18.8947 11.2858C19.0687 11.3202 19.2479 11.3149 19.4196 11.2703C19.5913 11.2258 19.7512 11.143 19.8878 11.028L25.0212 6.54802C25.1198 6.46637 25.2412 6.41868 25.368 6.41181C25.4949 6.40495 25.6206 6.43926 25.7271 6.50981C25.8336 6.58036 25.9153 6.68351 25.9606 6.80441C26.0059 6.92531 26.0123 7.05773 25.979 7.18261L22.5775 19.7105C22.5081 19.9668 22.3585 20.1931 22.1514 20.3551C21.9444 20.5171 21.6911 20.6058 21.4301 20.6079H6.56991C6.30866 20.6061 6.05514 20.5174 5.84784 20.3555C5.64053 20.1935 5.49077 19.967 5.42128 19.7105L2.021 7.18383C1.98769 7.05896 1.99414 6.92654 2.03941 6.80563C2.08468 6.68473 2.16645 6.58158 2.27293 6.51103C2.37941 6.44048 2.50512 6.40617 2.63197 6.41304C2.75881 6.4199 2.88025 6.46759 2.97879 6.54924L8.11102 11.0292C8.2476 11.1442 8.40749 11.227 8.57919 11.2716C8.75089 11.3161 8.93015 11.3214 9.1041 11.2871C9.27805 11.2527 9.44237 11.1795 9.58527 11.0728C9.72816 10.9661 9.84609 10.8284 9.93058 10.6698L13.4737 3.81649Z"
        stroke="#736FD0"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
