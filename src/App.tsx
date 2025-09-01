import PeriodContainer from './components/PeriodContainer/PeriodContainer';
import { PeriodProvider } from './context/PeriodContext';

import FirstOrnament from './assets/icons/ornament-1.svg';
import SecondOrnament from './assets/icons/ornament-2.svg';
import CircleNavigation from './components/CircleNavigation/CircleNavigation';

export default function App() {
  return (
    <main className="cont">
      <PeriodProvider>
        <div className="cont__ornament">
          <FirstOrnament className="cont__ornament-first" />
          <SecondOrnament className="cont__ornament-second" />
          <CircleNavigation />
        </div>
        <PeriodContainer />
      </PeriodProvider>
    </main>
  );
}
