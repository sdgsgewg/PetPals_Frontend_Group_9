'use client'
import React, { useState, useEffect } from "react";

const sliderImages = [
  "/img/Cat1.jpeg",
  "/img/cat2.jpeg",
  "/img/chihuahua1.jpeg",
  "/img/doggo1.jpeg",
];

const Slider = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentImage((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentImage((prev) =>
      prev === 0 ? sliderImages.length - 1 : prev - 1
    );
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto h-[250px] sm:h-[350px] md:h-[450px] overflow-hidden">
      {sliderImages.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Tombol Navigasi */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
      >
        ❯
      </button>

      {/* Indikator Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {sliderImages.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === currentImage ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
