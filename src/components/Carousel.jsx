import React, { useState, useEffect } from "react";

const Carousel = () => {
  const slides = [
    {
      id: 1,
      image: "nike1.avif",
      title: "Nike Air Max Pulse",
      desc: "Urban energy meets Air innovation — step up your style game.",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1618354691373-d851c9b21f3a?auto=format&fit=crop&w=1600&q=80",
      title: "Nike Dunk Low Retro",
      desc: "Classic vibes redefined — streetwear essential.",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1589187155479-4759f2f3c662?auto=format&fit=crop&w=1600&q=80",
      title: "Onitsuka Tiger Mexico 66",
      desc: "Heritage style meets modern comfort — run with Japanese precision.",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1600&q=80",
      title: "ASICS Gel-Kayano 30",
      desc: "Unmatched stability and comfort — performance reinvented.",
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1679563289183-0283d3ddbd9d?auto=format&fit=crop&w=1600&q=80",
      title: "New Balance 1906R",
      desc: "Retro runner vibes meet modern cushioning — redefine your stride.",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(timer);
  }, [current]);

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  return (
    <div className="carousel">
      {slides.map((slide, index) => (
        <div
          className={`carousel-slide ${index === current ? "active" : ""}`}
          key={slide.id}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="carousel-overlay"></div>
          <div className="carousel-text">
            <h2>{slide.title}</h2>
            <p>{slide.desc}</p>
            <button className="shop-btn">Shop Now</button>
          </div>
        </div>
      ))}

      <button className="carousel-btn prev" onClick={prevSlide}>‹</button>
      <button className="carousel-btn next" onClick={nextSlide}>›</button>

      <div className="carousel-dots">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`dot ${idx === current ? "active" : ""}`}
            onClick={() => setCurrent(idx)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
