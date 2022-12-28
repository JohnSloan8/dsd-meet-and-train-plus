/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
const convert12HrTimeTo24 = (timeStr) => {
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes, seconds] = time.split(':');
  if (hours === '12') {
    hours = '00';
  }
  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }
  return `${hours}:${minutes}:${seconds}`;
};

const getForecasts = (forecastObj, thisSession) => {
  let timeRange = 1800000;
  let forecasts = [];
  while (timeRange <= 5400000) {
    forecasts = forecastObj.filter((hourlyForecast: any) => {
      const timeDiff =
        new Date(hourlyForecast['@from']) - new Date(`${thisSession.date}T${thisSession.time}`);
      return timeDiff >= -timeRange && timeDiff <= timeRange;
    });
    if (forecasts.length === 0) {
      timeRange += 900000;
    } else {
      break;
    }
  }
  return forecasts;
};

export { convert12HrTimeTo24, getForecasts };
