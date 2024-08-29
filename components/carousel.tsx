"use client";
import { useState, useEffect, SetStateAction, Key, useCallback } from "react";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface CarouselItem {
  path: string;
  image: string;
}

interface CarouselProps {
  carouselData: CarouselItem[];
}

const Carousel = ({ carouselData }: CarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % carouselData.length);
  }, [carouselData.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 2000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const goToSlide = (index: SetStateAction<number>) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full overflow-x-hidden">
      <div className="carousel-container">
        <div className="carousel" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {carouselData.map((item: CarouselItem, i: Key | null | undefined) => (
            <a key={i} className="carousel-item" href={item.path}>
              <img src={item.image} alt={`carousel image ${i}`} />
            </a>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center mb-4">
        {carouselData.map((_: any, i: number) => (
          <button key={i} className={`w-2 h-2 rounded-full mx-1 ${i === currentSlide ? "bg-blue-500" : "bg-gray-300"}`} onClick={() => goToSlide(i)}></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
