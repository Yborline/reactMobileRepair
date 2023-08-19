export const normalDate = finishTime => {
  if (finishTime === null) {
    return null;
  }
  const { $y: year, $M: month, $D: day, $H: hour, $m: minutes } = finishTime;
  const newMounth = month.toString().length === 1 ? `0${month + 1}` : month;
  const d = day.toString().length === 1 ? `0${day}` : day;
  const h = hour.toString().length === 1 ? `0${hour}` : hour;
  const m = minutes.toString().length === 1 ? `0${minutes}` : minutes;
  return `${year}-${newMounth}-${d}T${h}:${m}`;
};
