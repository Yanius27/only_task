import cn from "classnames";

import Circle from "src/assets/icons/circle.svg";
import { usePeriods } from "../../context/PeriodContext";
import { useEffect, useRef, useState } from "react";

export default function CircleNavigation() {
  const { periods, currentPeriod, setCurrentPeriod } = usePeriods();
  const contRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState(0);

  const changeSize = () => {
    if (contRef.current) {
      setSize(contRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    if (contRef.current) {
      changeSize();

      window.addEventListener("resize", changeSize);
    }

    return () => document.removeEventListener("resize", changeSize);
  }, []);

  const dotSize = 20;
  const strokeWidth = -18;
  const dotOffsetPercent = ((dotSize / 2 + strokeWidth / 2) / size) * 100;
  const r = 50 - dotOffsetPercent;

  return (
    <div ref={contRef} className="circle">
      <Circle />
        {size > 0  &&
          periods.map((period, index) => {
            const angle = (2 * Math.PI * index) / periods.length;
            const x = 50 + r * Math.cos(angle);
            const y = 50 + r * Math.sin(angle);

            return (
              <div
                key={period}
                className={cn("circle__dot", {
                  "active": period === currentPeriod
                })}
                style={{
                  left: `${x}%`,
                  top: `${y}%`
                }}
                onClick={() => setCurrentPeriod(period)}
              >
                <span>{period + 1}</span>
              </div>
            );
          })
        }
    </div>
  );
}
