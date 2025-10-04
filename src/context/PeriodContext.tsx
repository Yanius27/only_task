import { createContext, useContext, useEffect, useState } from 'react';

import { IPeriod, IPeriodContext, IPeriodState } from '../types/interfaces';

const PeriodContext = createContext<IPeriodContext | undefined>(undefined);

export const PeriodProvider = ({ data, children }: { data: IPeriod[], children: React.ReactNode }) => {
  const [periods, setPeriods] = useState<IPeriodState[]>([]);
  const [currentPeriod, setCurrentPeriod] = useState(0);

  useEffect(() => {
    setPeriods(() =>
      Array.from({ length: data.length }, (_, i) => ({
        title: data[i].title,
        index: i,
      })),
    );
  }, [data]);

  return (
    <PeriodContext.Provider
      value={{ data, periods, currentPeriod, setPeriods, setCurrentPeriod }}
    >
      {children}
    </PeriodContext.Provider>
  );
};

export const usePeriods = () => {
  const context = useContext(PeriodContext);

  if (!context) {
    throw new Error('usePeriods must be used within a PeriodProvider');
  }

  return context;
};
