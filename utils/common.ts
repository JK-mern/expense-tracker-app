export const getFormattedPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    currency: 'INR',
    style: 'currency'
  }).format(price);
};
