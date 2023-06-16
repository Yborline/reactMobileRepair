const finalDay = (nextDay, today) => {
  const parse = Date.parse(today);
  // const parseNext = Date.parse(nextDay + 'T23:59');
  const sumMiliseconds = Date.parse(nextDay) - parse;

  if (sumMiliseconds <= 0) {
    return false;
  }
  function msecToString(val) {
    let mins = Math.round(val / 60000);
    let hours = Math.floor(mins / 60);
    const day = Math.floor(hours / 24);
    mins %= 60;
    hours %= 24;
    if (mins < 10) mins = "0" + mins;

    return day + " day " + hours + ":" + mins;
  }

  return msecToString(sumMiliseconds);
};

export default finalDay;
