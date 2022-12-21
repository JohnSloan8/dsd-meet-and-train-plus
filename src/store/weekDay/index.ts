import { atom, useRecoilState } from 'recoil';

const weekDayState = atom<number>({
  key: 'week-day',
  default: 0,
});

const useWeekDay = () => {
  const [weekDay, setWeekDay] = useRecoilState(weekDayState);
  return { weekDay, setWeekDay };
};

export { useWeekDay };
