import gsap from "gsap";
import Swiper, { Swiper as SwiperType } from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { useEffect, useRef } from "react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import cn from "classnames";

import { data } from "../../lib/data";
import ArrowIcon from "src/assets/icons/arrow-left.svg";
import { getFormattedNumber } from "../utils/getFormattedNumber";
import { IPeriodView } from "../types/interfaces";

export default function PeriodView({ children, slidesCount, currentSlide, setCurrentPeriod }: IPeriodView) {
  const displayStartRef = useRef(data[0].period[0]);
  const displayEndRef = useRef(data[0].period[1]);

  const swiperRef = useRef<HTMLDivElement | null>(null);
  const swiperInstanceRef = useRef<SwiperType | null>(null);
  const currentNumberRef = useRef<HTMLDivElement | null>(null);
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);

  const yearsRefs = useRef<(HTMLSpanElement | null)[][]>([]);

  useEffect(() => {
    if (!swiperRef.current || !currentNumberRef.current || !prevRef.current || !nextRef.current) return;

    swiperInstanceRef.current = new Swiper(swiperRef.current, {
      modules: [Navigation, Pagination],
      direction: "horizontal",
      slidesPerView: "auto",
      spaceBetween: 20,
      centeredSlides: true,
      allowTouchMove: false,
      speed: 0,
      navigation: {
        prevEl: prevRef.current,
        nextEl: nextRef.current
      },
      pagination: {
        el: ".PeriodView__pagination",
        type: "bullets",
        clickable: true
      },
      on: {
        slideChange({ isBeginning, isEnd, realIndex }) {
          setCurrentPeriod(realIndex);
          if (currentNumberRef.current) {
            const currentNumber = getFormattedNumber(realIndex);
            currentNumberRef.current.textContent = currentNumber;
          }
          const currentRefs = yearsRefs.current[realIndex];
          if (currentRefs) {
            const [start, end] = currentRefs;

            const newStart = data[realIndex].period[0];
            const newEnd = data[realIndex].period[1];

            const tl = gsap.timeline({ defaults: { duration: 0.8, ease: "power2.out"}});

            if (start) {
              const oldStart = parseInt(start.textContent || "0", 10);

              const objStart = { val: oldStart };

              tl.to(objStart, {
                val: newStart,
                duration: 0.8,
                ease: "power2.out",
                onUpdate: () => {
                  start.textContent = Math.round(objStart.val).toString();
                  displayStartRef.current = objStart.val;
                }
              }, 0);
            }

            if (end) {
              const oldEnd = parseInt(end.textContent || "0", 10);

              const objEnd = { val: oldEnd };

              tl.to(objEnd, {
                val: newEnd,
                duration: 0.8,
                ease: "power2.out",
                onUpdate: () => {
                  end.textContent = Math.round(objEnd.val).toString();
                  displayEndRef.current = objEnd.val;
                }
              }, 0);
            }
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

  useEffect(() => {
    swiperInstanceRef.current?.slideTo(currentSlide, 0);
  }, [currentSlide]);

  return (
    <div className="PeriodView">
      <div className="PeriodView__slider">
        {children}
      </div>   
      <div className="PeriodView__swiper swiper" ref={swiperRef}>
        <div className="swiper-wrapper">
          {data.map((_, index) => (
            <div className={cn("PeriodView__years swiper-slide", {
              "visible": currentSlide === index
            })} key={index}>
              <span ref={(el) => {
                yearsRefs.current[index] = yearsRefs.current[index] || [];
                yearsRefs.current[index][0] = el;
              }}>
                {displayStartRef.current}
              </span>

              <span ref={(el) => {
                yearsRefs.current[index] = yearsRefs.current[index] || [];
                yearsRefs.current[index][1] = el;
              }}>
                {displayEndRef.current}
              </span>
            </div>
          ))}
        </div>


      </div>
      <div className="PeriodView__footer">
          
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

        <div className="PeriodView__footer-slider">
            {children}
        </div>   

        <div className="PeriodView__pagination swiper-pagination"></div>

        </div>
    </div>
  );
}
