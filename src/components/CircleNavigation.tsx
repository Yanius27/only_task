import Circle from "../assets/icons/circle.svg";
import { usePeriods } from "../context/PeriodContext";

export default function CircleNavigation() {
  const { periods, currentPeriod, setCurrentPeriod } = usePeriods();
  <div>
    <Circle className="cont__circle" />
  </div>
}
