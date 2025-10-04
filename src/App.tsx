import PeriodContainer from './components/PeriodContainer/PeriodContainer';
import { PeriodProvider } from './context/PeriodContext';

import { data as first_period } from '../lib/data';
import { data_addition as second_period } from '../lib/data_addition';
import FirstOrnament from './assets/icons/ornament-1.svg';
import SecondOrnament from './assets/icons/ornament-2.svg';
import CircleNavigation from './components/CircleNavigation/CircleNavigation';

// Компоненты обёрнутые в PeriodProvider являются независимыми и могут получать данные в качестве пропсов
export default function App() {
  return (
    <main>
      <div className="cont">
        <PeriodProvider data={second_period}>
          <div className="cont__ornament">
            <FirstOrnament className="cont__ornament-first" />
            <SecondOrnament className="cont__ornament-second" />
            <CircleNavigation />
          </div>
          <PeriodContainer />
        </PeriodProvider>
      </div>

      <div className="cont">
        <PeriodProvider data={first_period}>
          <div className="cont__ornament">
            <FirstOrnament className="cont__ornament-first" />
            <SecondOrnament className="cont__ornament-second" />
            <CircleNavigation />
          </div>
          <PeriodContainer />
        </PeriodProvider>
      </div>
    </main>
  );
}
