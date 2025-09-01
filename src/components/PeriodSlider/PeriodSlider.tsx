import { useEffect, useRef } from 'react';
import Swiper, { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

import ArrowIcon from 'src/assets/icons/arrow-right.svg';
import { usePeriods } from 'src/context/PeriodContext';
import { IFact } from '../../types/interfaces';

import './PeriodSlider.scss';

export default function PeriodSlider({ items }: { items: IFact[] }) {
  const { currentPeriod } = usePeriods();
  const swiperRef = useRef<HTMLDivElement | null>(null);
  const swiperInstanceRef = useRef<SwiperType | null>(null);

  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!swiperRef.current) return;

    swiperInstanceRef.current = new Swiper(swiperRef.current, {
      direction: 'horizontal',
      slidesPerView: 'auto',
      slidesOffsetAfter: 320,
      spaceBetween: 25,
      modules: [Navigation],
      breakpoints: {
        428: {
          slidesOffsetAfter: 220,
        },
        500: {
          slidesOffsetAfter: 150,
        },
        640: {
          slidesOffsetAfter: 60,
        },
        1024: {
          slidesOffsetAfter: 0,
          slidesPerView: 3,
        },
      },
      navigation: {
        prevEl: '.PeriodSlider__navigation-prev',
        nextEl: '.PeriodSlider__navigation-next',
      },
      on: {
        slideChange: () => {
          const swiper = swiperInstanceRef.current;
          if (!swiper) return;

          if (prevRef.current) {
            if (swiper.isBeginning) prevRef.current.classList.remove('visible');
            else prevRef.current.classList.add('visible');
          }

          if (nextRef.current) {
            if (swiper.isEnd) nextRef.current.classList.remove('visible');
            else nextRef.current.classList.add('visible');
          }
        },
      },
    });
  }, []);

  useEffect(() => {
    swiperInstanceRef.current?.slideTo(0);
  }, [currentPeriod]);

  return (
    <div className="PeriodSlider">
      <div ref={swiperRef} className="PeriodSlider__swiper swiper">
        <div className="swiper-wrapper">
          {items.map((fact, index) => (
            <div
              key={index}
              className="PeriodSlider__swiper-slide swiper-slide"
            >
              <div className="PeriodSlider__swiper-slide-year">{fact.year}</div>
              <div className="PeriodSlider__swiper-slide-content">
                {fact.content}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="PeriodSlider__navigation">
        <div ref={prevRef} className="PeriodSlider__navigation-prev">
          <ArrowIcon />
        </div>
        <div ref={nextRef} className="PeriodSlider__navigation-next visible">
          <ArrowIcon />
        </div>
      </div>
    </div>
  );
}
