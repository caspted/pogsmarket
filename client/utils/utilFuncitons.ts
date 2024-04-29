
export const priceDifference = (currentPrice: number, previousPrice: number) => {
  if (currentPrice === previousPrice) return "0.00%";
  if (previousPrice === 0) return "+100.00%";

  let result = ((currentPrice - previousPrice) / previousPrice) * 100;
    if (result > 0) {
      return `+${result.toFixed(2) + "%"}`;
    }
  return result.toFixed(2) + "%";
}

export const setUserID = 99;
