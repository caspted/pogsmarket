
const priceDifference = (currentPrice: number, previousPrice: number) => {
  let result = ((currentPrice - previousPrice) / previousPrice) * 100;
    if (result > 0) {
      return `+${result.toFixed(2) + "%"}`;
    }
  return result.toFixed(2) + "%";
}

const setUserID = 99;

const utilFunctions = { priceDifference, setUserID };

export default utilFunctions;
