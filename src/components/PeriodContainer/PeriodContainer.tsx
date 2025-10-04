import PeriodSlider from '../PeriodSlider/PeriodSlider';
import PeriodView from '../PeriodView/PeriodView';

import { usePeriods } from '../../context/PeriodContext';

import './PeriodContainer.scss';

export default function PeriodContainer() {
  const { data, periods, currentPeriod, setCurrentPeriod } = usePeriods();

  return (
    <div className="PeriodContainer">
      <h1 className="PeriodContainer__title">Исторические даты</h1>
      <PeriodView
        data={data}
        slidesCount={periods.length}
        currentSlide={currentPeriod}
        setCurrentPeriod={setCurrentPeriod}
      >
        <PeriodSlider items={data[currentPeriod].facts} />
      </PeriodView>
    </div>
  );
}
