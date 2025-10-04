import { Dispatch, SetStateAction } from 'react';

export interface IPeriodState {
  title: string;
  index: number;
}

export interface IPeriodContext {
  data: IPeriod[],
  currentPeriod: number;
  periods: IPeriodState[];
  setPeriods: Dispatch<SetStateAction<IPeriodState[]>>;
  setCurrentPeriod: (index: number) => void;
}

export interface IFact {
  year: number;
  content: string;
}

export interface IPeriod {
  period: number[];
  title: string;
  facts: IFact[];
}

export interface IPeriodView {
  children: React.ReactNode;
  data: IPeriod[],
  slidesCount: number;
  currentSlide: number;
  setCurrentPeriod: (index: number) => void;
}
