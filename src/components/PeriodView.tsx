import gsap from "gsap";
import Swiper, { Swiper as SwiperType } from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { useEffect, useRef } from "react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";

import { data } from "../../lib/data";
import { usePeriods } from "../context/PeriodContext";
import ArrowIcon from "../assets/icons/arrow-left.svg";
import { getFormattedNumber } from "../utils/getFormattedNumber";
import { IPeriodView } from "../types/interfaces";

export default function PeriodView({ children, slidesCount, currentSlide, setCurrentPeriod }: IPeriodView) {

  const swiperRef = useRef<HTMLDivElement | null>(null);
  const swiperInstanceRef = useRef<SwiperType | null>(null);
  const currentNumberRef = useRef<HTMLDivElement | null>(null);
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!swiperRef.current || !currentNumberRef.current || !prevRef.current || !nextRef.current) return;

    swiperInstanceRef.current = new Swiper(swiperRef.current, {
      modules: [Navigation, Pagination],
      direction: "horizontal",
      slidesPerView: 1,
      spaceBetween: 50,
      navigation: {
        prevEl: prevRef.current,
        nextEl :nextRef.current
      },
      on: {
        slideChange({ isBeginning, isEnd, realIndex }) {
          setCurrentPeriod(realIndex);
          if (currentNumberRef.current) {
            const currentNumber = getFormattedNumber(realIndex);
            currentNumberRef.current.textContent = currentNumber;
          }
          if (!isBeginning && !isEnd) {
            prevRef.current?.classList.add("active");
            nextRef.current?.classList.add("active");
          }
        },
        reachBeginning() {
          prevRef.current?.classList.remove("active");
        },
        reachEnd() {
          nextRef.current?.classList.remove("active");
        }
      },
    });
  }, [prevRef.current, nextRef.current]);

  return (
    <div className="PeriodView">
      <div>{children}</div>
      <div className="PeriodView__swiper swiper" ref={swiperRef}>
        <div className="swiper-wrapper">
          {data.map((item, index) => (
            <div className="PeriodView__years swiper-slide" key={index}>
              <span>{item.period[0]}</span>
              <span>{item.period[1]}</span>
            </div>
          ))}
        </div>
        <div className="PeriodView__navigation">

          <div className="PeriodView__navigation-count">
            <div ref={currentNumberRef}>{getFormattedNumber(currentSlide)}</div>
            <div> {`/${getFormattedNumber(slidesCount, false)}`}</div>
          </div>

          <div className="PeriodView__navigation-items">

            <div ref={prevRef} className="PeriodView__navigation-prev">
              <ArrowIcon />
            </div>

            <div ref={nextRef} className="PeriodView__navigation-next active">
              <ArrowIcon />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
