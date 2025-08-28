import { createContext, useContext, useEffect, useState } from "react";

import { data } from "../../lib/data";
import { IPeriodContext } from "../types/interfaces";

const PeriodContext = createContext<IPeriodContext | undefined>(undefined);

export const PeriodProvider = ({ children }: { children: React.ReactNode }) => {
  const [periods, setPeriods] = useState<number[]>([]);
  const [currentPeriod, setCurrentPeriod] = useState(0);

  useEffect(() => {
    setPeriods(() => Array.from({ length: data.length }, (_, i) => i));
  }, [data]);

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
