import { createContext, useContext, useState } from "react";

import { IPeriodContext } from "../types/interfaces";

const PeriodContext = createContext<IPeriodContext | undefined>(undefined);

export const PeriodProvider = ({ children }: { children: React.ReactNode }) => {
  const [periods, setPeriods] = useState<number[]>([]);
  const [currentPeriod, setCurrentPeriod] = useState(0);

  return (
    <PeriodContext.Provider value={{ periods, currentPeriod, setPeriods, setCurrentPeriod }}>
      {children}
    </PeriodContext.Provider>
  );
};

export const usePeriods = () => {
  const context = useContext(PeriodContext);

  if (!context) {
    throw new Error("usePeriods must be used within a PeriodProvider");
  }

  return context;
};
