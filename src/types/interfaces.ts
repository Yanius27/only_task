import { Dispatch, SetStateAction } from "react";

export interface IPeriodContext {
  currentPeriod: number;
  periods: number[];
  setPeriods: Dispatch<SetStateAction<number[]>>;
  setCurrentPeriod: (index: number) => void;
}

export interface IFact {
  year: number,
  content: string
}

export interface IPeriod {
  period: number[],
  title: string,
  facts: IFact[],
}

export interface IPeriodView {
  children: React.ReactNode,
  slidesCount: number,
  currentSlide: number,
  setCurrentPeriod: (index: number) => void;
}
