import { Dispatch, SetStateAction } from "react";

export interface IPeriodContext {
  currentPeriod: number;
  periods: number[];
  setPeriods: Dispatch<SetStateAction<number[]>>;
  setCurrentPeriod: (index: number) => void;
}
