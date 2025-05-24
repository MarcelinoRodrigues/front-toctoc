export const formatTaxNumber = (taxNumber: string) => {
  return taxNumber.replace(/\D/g, '');
};