const numberWithCommas = x => {
  const selectedNumber = Number(x);
  const num =
    selectedNumber % 1 === 0 ? selectedNumber : selectedNumber.toFixed(2);
  const parts = num.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

export default numberWithCommas;
