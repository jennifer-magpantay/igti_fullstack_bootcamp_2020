function calculateInterest(initialCapital, monthlyInterest, term) {
  // 1) get the base inputs
  const baseCapital = initialCapital;
  const basePercent = monthlyInterest;
  const baseTerm = term;
  // 2) from these, calculate:
  const percent = basePercent / 100;
  const baseAcc = baseCapital * Math.pow(1 + percent, baseTerm);
  const incomeAcc = baseAcc - baseCapital;
  const percentAcc = (incomeAcc * 100) / baseCapital;

  return {
    baseCapital,
    basePercent,
    baseTerm,
    percent,
    incomeAcc,
    baseAcc,
    percentAcc,
  };
}
export { calculateInterest };
