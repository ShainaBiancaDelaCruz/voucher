// utils/generateVoucherNumber.js

export const generateVoucherNumber = () => {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2); // Last 2 digits of the year
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Month in MM format
  const date = now.getDate().toString().padStart(2, '0'); // Date in DD format
  const randomNumber = Math.floor(Math.random() * 1000).toString().padStart(3, '0'); // Random 3 digits

  return `${year}${month}${date}${randomNumber}`;
};



let classExpCounter = 100;

export const generateClassExpNumber = () => {
return classExpCounter++;
};
