import PeriodContainer from "./components/PeriodContainer";
import { PeriodProvider } from "./context/PeriodContext";

export default function App() {
  return (
    <main className="cont">
      <PeriodProvider>
        <PeriodContainer />
      </PeriodProvider>
    </main>
  );
}
