import PeriodContainer from "./components/PeriodContainer";
import { PeriodProvider } from "./context/PeriodContext";

import FirstOrnament from "./assets/icons/ornament-1.svg";
import SecondOrnament from "./assets/icons/ornament-2.svg";
import Circle from "./assets/icons/circle.svg";

export default function App() {
  return (
    <main className="cont">
      <div className="cont__ornament">
        <FirstOrnament className="cont__ornament-first" />
        <SecondOrnament className="cont__ornament-second" />
        <Circle className="cont__circle" />
      </div>
      <PeriodProvider>
        <PeriodContainer />
      </PeriodProvider>
    </main>
  );
}
