import gsap from "gsap";

import { data } from "../../lib/data";
import { usePeriods } from "../context/PeriodContext";

export default function PeriodView() {
  const { periods, currentPeriod, setCurrentPeriod } = usePeriods();

  return (
    <div className="PeriodView">
      <div></div>
      <div className="PeriodView__years">{data[currentPeriod].period.map((year, index) => (
        <span key={index}>{year}</span>
      ))}</div>
    </div>
  );
}
