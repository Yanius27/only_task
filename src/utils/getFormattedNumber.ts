export const getFormattedNumber = (number: number, isIndex = true) => {
  const currentNumber = isIndex ? number + 1 : number;
  return currentNumber.toString().padStart(2, "0");
};

