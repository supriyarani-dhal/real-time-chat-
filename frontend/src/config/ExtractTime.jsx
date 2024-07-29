export const extractTime = (dateString) => {
  const padZero = (number) => {
    return number.toString().padStart(2, "0");
  };

  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());

  return `${hours}:${minutes} ${day}/${month}/${year}`;
};
