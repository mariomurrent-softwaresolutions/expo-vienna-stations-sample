const generateRandomNumberAboveTenThousand = (): number => {
  return Math.floor(Math.random() * 1e6) + 10000;
};

export {generateRandomNumberAboveTenThousand};
