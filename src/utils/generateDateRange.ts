type DateRange = {
  startDate: Date;
  endDate: Date;
};

type TwoDateRanges = {
  firstHalfStartDate: Date;
  firstHalfEndDate: Date;
  secondHalfStartDate: Date;
  secondHalfEndDate: Date;
};

export const generateDateRange = (range: string): DateRange => {
  const days = Number(range) - 1;

  const endDate = new Date();
  endDate.setHours(23, 59, 59, 999);

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  startDate.setHours(0, 0, 0, 0);

  return { endDate, startDate };
};

export const generateTwoDateRanges = (range: string): TwoDateRanges => {
  const days = Number(range) - 1;

  const firstHalfEndDate = new Date();
  firstHalfEndDate.setHours(23, 59, 59, 999);
  const firstHalfStartDate = new Date();
  firstHalfStartDate.setDate(firstHalfStartDate.getDate() - days);
  firstHalfStartDate.setHours(0, 0, 0, 0);

  const secondHalfEndDate = new Date(firstHalfStartDate);
  secondHalfEndDate.setDate(secondHalfEndDate.getDate() - 1);
  secondHalfEndDate.setHours(23, 59, 59, 999);
  const secondHalfStartDate = new Date(secondHalfEndDate);
  secondHalfStartDate.setDate(secondHalfStartDate.getDate() - days);
  secondHalfStartDate.setHours(0, 0, 0, 0);

  return {
    firstHalfStartDate,
    firstHalfEndDate,
    secondHalfStartDate,
    secondHalfEndDate,
  };
};
