import gsap from 'gsap';
import Swiper, { Swiper as SwiperType } from 'swiper';
import { Pagination } from 'swiper/modules';
import { useEffect, useRef } from 'react';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import cn from 'classnames';

import { data } from '../../../lib/data';
import ArrowIcon from 'src/assets/icons/arrow-left.svg';
import { getFormattedNumber } from '../../utils/getFormattedNumber';
import { IPeriodView } from '../../types/interfaces';

import './PeriodView.scss';

export default function PeriodView({
  children,
  slidesCount,
  currentSlide,
  setCurrentPeriod,
}: IPeriodView) {
  const displayStartRef = useRef(data[0].period[0]);
  const displayEndRef = useRef(data[0].period[1]);

  const swiperRef = useRef<HTMLDivElement | null>(null);
  const swiperInstanceRef = useRef<SwiperType | null>(null);
  const currentNumberRef = useRef<HTMLDivElement | null>(null);

  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);

  const yearsRefs = useRef<(HTMLSpanElement | null)[][]>([]);

  const isOutCall = useRef(false);

  const setNavState = (swiper: SwiperType) => {
    const { isBeginning, isEnd } = swiper;
    prevRef.current?.classList.toggle('active', !isBeginning);
    nextRef.current?.classList.toggle('active', !isEnd);
  };

  const handlePrev = () => {
    if (swiperInstanceRef.current) {
      isOutCall.current = false;
      const index = Math.max(swiperInstanceRef.current.realIndex - 1, 0);
      swiperInstanceRef.current.slideTo(index, 0);
    }
  };

  const handleNext = () => {
    if (swiperInstanceRef.current) {
      isOutCall.current = false;
      const index = Math.min(
        swiperInstanceRef.current.realIndex + 1,
        data.length - 1,
      );
      swiperInstanceRef.current.slideTo(index, 0);
    }
  };

  useEffect(() => {
    if (
      !swiperRef.current ||
      !currentNumberRef.current ||
      !prevRef.current ||
      !nextRef.current
    )
      return;

    swiperInstanceRef.current = new Swiper(swiperRef.current, {
      modules: [Pagination],
      direction: 'horizontal',
      slidesPerView: 'auto',
      spaceBetween: 20,
      speed: 0,
      initialSlide: currentSlide,
      centeredSlides: true,
      allowTouchMove: false,
      pagination: {
        el: '.PeriodView__pagination',
        type: 'bullets',
        clickable: true,
      },
      on: {
        init: (swiper) => {
          setNavState(swiper);
          if (currentNumberRef.current) {
            currentNumberRef.current.textContent = getFormattedNumber(
              swiper.realIndex,
            );
          }
        },
        slideChange(swiper) {
          const { realIndex } = swiper;

          if (isOutCall?.current) {
            isOutCall.current = false;
          } else {
            setCurrentPeriod(realIndex);
          }

          if (currentNumberRef.current) {
            const currentNumber = getFormattedNumber(realIndex);
            currentNumberRef.current.textContent = currentNumber;
          }
          const currentRefs = yearsRefs.current[realIndex];
          if (currentRefs) {
            const [start, end] = currentRefs;

            const newStart = data[realIndex].period[0];
            const newEnd = data[realIndex].period[1];

            const tl = gsap.timeline({
              defaults: { duration: 0.8, ease: 'power2.out' },
            });

            if (start) {
              const oldStart = parseInt(start.textContent || '0', 10);

              const objStart = { val: oldStart };

              tl.to(
                objStart,
                {
                  val: newStart,
                  duration: 0.8,
                  ease: 'power2.out',
                  onUpdate: () => {
                    start.textContent = Math.round(objStart.val).toString();
                    displayStartRef.current = objStart.val;
                  },
                },
                0,
              );
            }

            if (end) {
              const oldEnd = parseInt(end.textContent || '0', 10);

              const objEnd = { val: oldEnd };

              tl.to(
                objEnd,
                {
                  val: newEnd,
                  duration: 0.8,
                  ease: 'power2.out',
                  onUpdate: () => {
                    end.textContent = Math.round(objEnd.val).toString();
                    displayEndRef.current = objEnd.val;
                  },
                },
                0,
              );
            }
          }
          setNavState(swiper);
        },
      },
    });
  }, [prevRef.current, nextRef.current]);

  useEffect(() => {
    if (swiperInstanceRef.current) {
      isOutCall.current = true;
      swiperInstanceRef.current.slideTo(currentSlide, 0);
    }
  }, [currentSlide]);

  return (
    <div className="PeriodView">
      <div className="PeriodView__slider">{children}</div>
      <div className="PeriodView__swiper swiper" ref={swiperRef}>
        <div className="swiper-wrapper">
          {data.map((_, index) => (
            <div
              className={cn('PeriodView__years swiper-slide', {
                visible: currentSlide === index,
              })}
              key={index}
            >
              <span
                ref={(el) => {
                  yearsRefs.current[index] = yearsRefs.current[index] || [];
                  yearsRefs.current[index][0] = el;
                }}
              >
                {displayStartRef.current}
              </span>

              <span
                ref={(el) => {
                  yearsRefs.current[index] = yearsRefs.current[index] || [];
                  yearsRefs.current[index][1] = el;
                }}
              >
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
            <div
              ref={prevRef}
              onClick={handlePrev}
              className="PeriodView__navigation-prev"
            >
              <ArrowIcon />
            </div>

            <div
              ref={nextRef}
              onClick={handleNext}
              className="PeriodView__navigation-next active"
            >
              <ArrowIcon />
            </div>
          </div>
        </div>

        <div className="PeriodView__footer-slider">{children}</div>

        <div className="PeriodView__pagination swiper-pagination"></div>
      </div>
    </div>
  );
}
