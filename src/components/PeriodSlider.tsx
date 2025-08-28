import { useEffect, useRef } from "react";

import Swiper, {Swiper as SwiperType} from "swiper";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";

import { IFact } from "../types/interfaces";

export default function PeriodSlider({ items }: { items: IFact[] }) {
  const swiperRef = useRef<HTMLDivElement | null>(null);
  const swiperInstanceRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    if (!swiperRef.current) return;

    swiperInstanceRef.current = new Swiper(swiperRef.current, {
      direction: "horizontal",
      slidesPerView: 1.5,
      spaceBetween: 25,
    });
  }, []);

  return (
    <div className="PeriodSlider">
      <div ref={swiperRef} className="PeriodSlider__swiper swiper">
        <div className="swiper-wrapper">
          {items.map((fact, index) => (
            <div key={index} className="PeriodSlider__swiper-slide swiper-slide">
              <div className="PeriodSlider__swiper-slide-year">{fact.year}</div>
              <div className="PeriodSlider__swiper-content">{fact.content}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
