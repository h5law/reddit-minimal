const normaliseNumber = (number) => {
  if (number > 1000) {
    const rounded = Number.parseFloat(number/1000).toFixed(1);
    if (String(rounded).endsWith('0')) {
      return String(rounded).split('.') + "k";
    }
    return rounded + "k";
  }
  return number;
};

export default normaliseNumber;
