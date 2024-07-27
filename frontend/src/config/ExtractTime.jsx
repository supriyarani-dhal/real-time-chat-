export const extractTime = (dateString) => {
  const padZero = (number) => {
    return number.toString().padStart(2, "0");
  };

  const date = new Date(dateString);
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());

  return `${hours}:${minutes}`;
};
