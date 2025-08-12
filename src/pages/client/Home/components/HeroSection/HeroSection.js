import { Button, Carousel, Input } from "antd";
import { SearchOutlined, ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./HeroSection.scss";
import { useState, useRef } from "react";
import Search from "~/layouts/client/components/Search";

const cx = classNames.bind(styles);

function HeroSection() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const carouselRef = useRef();
  
  const handleSearch = () => {
    if (keyword.trim()) {
      navigate(`/search/${keyword.trim()}`);
    }
  };
  
  // Array of slide data - you can add more images and customize each slide
    const slides = [
    {
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3",
      title: "Thư Viện Tài Liệu PTIT",
      subtitle: "Khám phá kho tàng tri thức với hàng ngàn tài liệu hữu ích",
      overlayColor: "rgba(0, 114, 255, 0.2)"
    },
    {
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3",
      title: "Học Tập & Nghiên Cứu",
      subtitle: "Tài liệu chất lượng cao cho mọi chuyên ngành",
      overlayColor: "rgba(0, 168, 136, 0.2)"
    },
    {
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3",
      title: "Chia Sẻ & Phát Triển",
      subtitle: "Tiếp cận nguồn tri thức không giới hạn",
      overlayColor: "rgba(80, 30, 180, 0.2)"
    },
    {
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3",
      title: "Học Tập Số Hóa",
      subtitle: "Truy cập tài liệu mọi lúc mọi nơi trên mọi thiết bị",
      overlayColor: "rgba(234, 88, 12, 0.2)"
    },
    {
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3",
      title: "Cộng Đồng Học Thuật",
      subtitle: "Kết nối và giao lưu với cộng đồng sinh viên, giảng viên PTIT",
      overlayColor: "rgba(190, 24, 93, 0.2)"
    }
  ];
  
  return (
    <section className={cx("hero-section")}>
      <Carousel 
        autoplay 
        effect="fade" 
        dots={true}
        ref={carouselRef}
        className={cx("hero-carousel")}
        dotPosition="bottom"
        autoplaySpeed={5000}  // How long each slide stays (in milliseconds) - 5 seconds
        speed={1500}         // Animation speed for the transition (in milliseconds) - 1.5 second
      >
        {slides.map((slide, index) => (
          <div key={index}>
            <div 
              className={cx("carousel-slide")}
              style={{ 
                backgroundImage: `url(${slide.image})` 
              }}
            >
              <div 
                className={cx("slide-overlay")}
                style={{ backgroundColor: slide.overlayColor }}
              >
                <div className={cx("hero-content")}>
                  <h1 className="wow animate__fadeInDown">{slide.title}</h1>
                  <p className="wow animate__fadeIn" data-wow-delay="0.5s">
                    {slide.subtitle}
                  </p>
                  
                  {index === 0 && (
                    <div className={cx("floating-icons")}>
                      <div className={cx("floating-icon", "icon-1")}>📚</div>
                      <div className={cx("floating-icon", "icon-2")}>📝</div>
                      <div className={cx("floating-icon", "icon-3")}>🎓</div>
                      <div className={cx("floating-icon", "icon-4")}>📊</div>
                      <div className={cx("floating-icon", "icon-5")}>📋</div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
      
      <div className={cx("carousel-arrows")}>
        <Button 
          className={cx("carousel-arrow", "prev")} 
          icon={<ArrowLeftOutlined />}
          onClick={() => carouselRef.current.prev()}
        />
        <Button 
          className={cx("carousel-arrow", "next")} 
          icon={<ArrowRightOutlined />}
          onClick={() => carouselRef.current.next()}
        />
      </div>
      
      <div className={cx("wave-container")}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,224C672,213,768,171,864,149.3C960,128,1056,128,1152,138.7C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
}

export default HeroSection;