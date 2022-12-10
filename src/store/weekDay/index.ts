import { atom, useRecoilState } from 'recoil';

const weekDayState = atom<number | undefined>({
  key: 'week-day',
  default: undefined,
});

const useWeekDay = () => {
  const [weekDay, setWeekDay] = useRecoilState(weekDayState);
  return { weekDay, setWeekDay };
};

export { useWeekDay };
