import moment from "moment";

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const getInitials = (name) => {
  if (!name) {
    return "";
  }

  const words = name.split(" ");
  let initial = "";
  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initial += words[i][0];
  }
  return initial.toUpperCase();
};

// export const addThousandsSeparator = (num) => {
//   if (num == null || isNaN(num)) return "";

//   const [integerPart, fractionalPart] = num.toString().split(".");
//   const formattedInteger = integerPart.replace(
//     /\B(?=(\d{2})+(?!\d)(?<=\d{3}))/g,
//     ","
//   );

//   return fractionalPart
//     ? `${formattedInteger}.${fractionalPart}`
//     : formattedInteger;
// };

export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return "";

  const [integerPart, fractionalPart] = num.toString().split(".");

  let formattedInteger;
  if (integerPart.length > 3) {
    const lastThree = integerPart.slice(-3);
    const otherNumbers = integerPart.slice(0, -3);
    formattedInteger =
      otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
  } else {
    formattedInteger = integerPart;
  }

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};

export const prepareExpenseBarchartData = (data = []) => {
  const chartData = data.map((item) => ({
    category: item?.category,
    amount: item?.amount,
  }));

  return chartData;
};

export const prepareIncomebarChart = (data = []) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format("Do MMM"),
    amount: item?.amount,
    source: item?.source,
  }));

  return chartData;
};
