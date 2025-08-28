import PeriodSlider from "./PeriodSlider";
import PeriodView from "./PeriodView";

import { data } from "../../lib/data";
import { usePeriods } from "../context/PeriodContext";

export default function PeriodContainer() {
  const { periods, currentPeriod, setCurrentPeriod } = usePeriods();

  return (
    <div className="PeriodContainer">
      <h1 className="PeriodContainer__title">Исторические даты</h1>
      <PeriodView slidesCount={periods.length} currentSlide={currentPeriod} setCurrentPeriod={setCurrentPeriod}>
        <PeriodSlider items={data[currentPeriod].facts} />
      </PeriodView>
    </div>
  );
}
