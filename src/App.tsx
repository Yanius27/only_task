import { PeriodProvider } from "./context/PeriodContext";

export default function App() {
  return (
    <main className="cont">
      <PeriodProvider>
        <h1 className="title">Исторические даты</h1>
      </PeriodProvider>
    </main>
  );
}
