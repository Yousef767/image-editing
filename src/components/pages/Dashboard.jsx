import { Link } from "react-router-dom";
import Aside from "../fragments/dashboard/Aside";
import { useDashboardNav } from "../../hooks/DashboardNavHook";
import { DashboardNav } from "../fragments/dashboard/DashboardNav";

function Dashboard() {

  const { active, handleActive, handleSearch } = useDashboardNav();

  return (
    <div className={active ? "dashborad active" : "dashborad"}>
      <Aside />
      <div className="container">
        <span className="dashboradBubble1"></span>
        <DashboardNav handleActive={handleActive} handleSearch={handleSearch} />
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
              <Link to={"##"}>
                <img src="/media/icons/w1.png" alt="" />
                Whiteboard
              </Link>
              <Link to={"##"}>
                <img src="/media/icons/w2.png" alt="" />
                Backgrounds
              </Link>
              <Link to={"##"}>
                <img src="/media/icons/w3.png" alt="" />
                Upload photo
              </Link>
            </div>
          </div>
          <div className="recent recent2">
            <h3>Recent designs</h3>
            <div className="recent-designs">
              <Link to={"##"}>
                <img src="/media/recent.png" alt="" />
              </Link>
              <Link to={"##"}>
                <img src="/media/recent.png" alt="" />
              </Link>
              <Link to={"##"}>
                <img src="/media/recent.png" alt="" />
              </Link>
              <Link to={"##"}>
                <img src="/media/recent.png" alt="" />
              </Link>
              <Link to={"##"}>
                <img src="/media/recent.png" alt="" />
              </Link>
              <Link to={"##"}>
                <img src="/media/recent.png" alt="" />
              </Link>
              <Link to={"##"}>
                <img src="/media/recent.png" alt="" />
              </Link>
              <Link to={"##"}>
                <img src="/media/recent.png" alt="" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

