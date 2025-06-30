import React, { useState } from "react";
import switzerland from "../assets/Switzerland.jpg"
import tokyo from "../assets/tokyo.jpg"
import bali from "../assets/Bali.jpg"
import newYork from "../assets/newyork.jpg"


const Carousel = () => {
  const slides = [
    {
      id: 1,
      image: switzerland,
      title: "Visit Switzerland",
      description: "Breathe in the fresh mountain air and enjoy the majestic Alps.",
    },
    {
      id: 2,
      image: bali,
      title: "Discover Bali",
      description: "Embrace the tranquility of the island of gods.",
    },
    {
      id: 3,
      image: newYork,
      title: "Explore New York",
      description: "The city that never sleeps is waiting for you!",
    },
    {
      id: 4,
      image: tokyo,
      title: "Experience Tokyo",
      description: "A perfect blend of tradition and modernity.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden font-lora">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-30" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
            <h2 className="text-5xl font-bold mb-2">{slide.title}</h2>
            <p className="text-lg">{slide.description}</p>
          </div>
        </div>
      ))}

      <button
        className="absolute top-1/2 left-5 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-200 transition"
        onClick={prevSlide}
      >
        &#10094;
      </button>
      <button
        className="absolute top-1/2 right-5 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-200 transition"
        onClick={nextSlide}
      >
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;
