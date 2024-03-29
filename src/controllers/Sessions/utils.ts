/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs, { Dayjs } from 'dayjs';

const findCurrentSessionIndex = (date: Dayjs, sessions: any[]) => {
  let index = 0;

  if (dayjs(date) >= dayjs(sessions[sessions.length - 1].date)) {
    index = sessions.length - 1;
  } else if (dayjs(date) > dayjs(sessions[0].date)) {
    console.log('in else');
    index = searchForIndexInMiddle(date, sessions);
  }
  return index;
};

const searchForIndexInMiddle = (d: any, Ss: any) => {
  let dayMinus = 0;
  let index = -1;

  while (dayMinus <= 7) {
    index = Ss.findIndex((s: any) => {
      const calcDate = d.add(dayMinus, 'days').format('YYYY-MM-DD');
      return s.date === calcDate;
    });
    if (index !== -1) {
      break;
    } else {
      dayMinus += 1;
    }
  }
  return index;
};

export { findCurrentSessionIndex };
