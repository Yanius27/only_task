import cn from 'classnames';
import { usePeriods } from '../../context/PeriodContext';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

import Circle from 'src/assets/icons/circle.svg';

import './CircleNavigation.scss';

export default function CircleNavigation() {
  const { periods, currentPeriod, setCurrentPeriod } = usePeriods();
  const contRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState(0);

  const dotSize = 6;
  const activeDotSizeVW = 2.82;
  const strokeWidth = -5;

  const changeSize = () => {
    if (contRef.current) setSize(contRef.current.offsetWidth);
  };

  useEffect(() => {
    changeSize();
    window.addEventListener('resize', changeSize);
    return () => window.removeEventListener('resize', changeSize);
  }, []);

  const r = size ? 50 - ((dotSize / 2 + strokeWidth / 2) / size) * 100 : 0;
  const startAngle = Math.PI / 4;

  const handleEnter = (dot: HTMLDivElement) => {
    if (dot.classList.contains('active')) return;
    const label = dot.querySelector<HTMLDivElement>(
      '.CircleNavigation__dot-label',
    );
    const name = dot.querySelector<HTMLSpanElement>(
      '.CircleNavigation__dot-name',
    );
    if (!label || !name) return;

    gsap.to(label, {
      width: `${activeDotSizeVW}vw`,
      height: `${activeDotSizeVW}vw`,
      backgroundColor: '#fff',
      border: '1px solid #ccc',
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    });

    gsap.to(name, {
      opacity: 1,
      duration: 0.25,
      ease: 'power2.out',
    });
  };

  const handleLeave = (dot: HTMLDivElement) => {
    if (dot.classList.contains('active')) return;
    const label = dot.querySelector<HTMLDivElement>(
      '.CircleNavigation__dot-label',
    );
    const name = dot.querySelector<HTMLSpanElement>(
      '.CircleNavigation__dot-name',
    );
    if (!label || !name) return;

    gsap.to(label, {
      width: `${dotSize}px`,
      height: `${dotSize}px`,
      backgroundColor: '#000',
      border: '0px solid transparent',
      opacity: 0,
      duration: 0.3,
      ease: 'power2.inOut',
    });

    gsap.to(name, {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.inOut',
    });
  };

  useEffect(() => {
    if (!size) return;

    const dots = contRef.current?.querySelectorAll<HTMLDivElement>(
      '.CircleNavigation__dot',
    );
    if (!dots) return;

    const total = periods.length;

    dots.forEach((dot) => {
      const label = dot.querySelector<HTMLDivElement>(
        '.CircleNavigation__dot-label',
      );
      const name = dot.querySelector<HTMLSpanElement>(
        '.CircleNavigation__dot-name',
      );
      const isActive = dot.classList.contains('active');

      if (label)
        gsap.set(label, {
          width: isActive ? `${activeDotSizeVW}vw` : `${dotSize}px`,
          height: isActive ? `${activeDotSizeVW}vw` : `${dotSize}px`,
          backgroundColor: isActive ? '#fff' : '#000',
          border: isActive ? '1px solid #ccc' : '0px solid transparent',
          opacity: isActive ? 1 : 0,
        });
      if (name) gsap.set(name, { opacity: isActive ? 1 : 0 });
    });

    dots.forEach((dot, index) => {
      const relativeIndex = (index - currentPeriod + total) % total;
      const endAngle = startAngle + (2 * Math.PI * relativeIndex) / total;

      const style = dot.style;
      const leftPercent = parseFloat(style.left);
      const topPercent = parseFloat(style.top);
      const centerX = 50;
      const centerY = 50;
      const startAngleCurrent = Math.atan2(
        centerY - topPercent,
        leftPercent - centerX,
      );

      gsap.to(
        { angle: startAngleCurrent },
        {
          angle: endAngle,
          duration: 1,
          ease: 'linear',
          onUpdate: function () {
            const x = 50 + r * Math.cos(this.targets()[0].angle);
            const y = 50 - r * Math.sin(this.targets()[0].angle);
            dot.style.left = `${x}%`;
            dot.style.top = `${y}%`;
          },
        },
      );
    });
  }, [currentPeriod, size, periods.length]);

  return (
    <div ref={contRef} className="CircleNavigation">
      <Circle />
      {size > 0 &&
        periods.map((period, index) => (
          <div
            key={period.index}
            className={cn('CircleNavigation__dot', {
              active: period.index === currentPeriod,
            })}
            onClick={() => setCurrentPeriod(period.index)}
            onMouseEnter={(e) => handleEnter(e.currentTarget)}
            onMouseLeave={(e) => handleLeave(e.currentTarget)}
            style={{ left: '50%', top: '50%' }}
          >
            <div className="CircleNavigation__dot-label">
              <span>{period.index + 1}</span>
            </div>
            <span className="CircleNavigation__dot-name">{period.title}</span>
          </div>
        ))}
    </div>
  );
}
