import { atom, useRecoilState } from 'recoil';

const weekDaysState = atom<number | undefined>({
  key: 'week-days',
  default: undefined,
});

const useWeekDays = () => {
  const [weekDays, setWeekDays] = useRecoilState(weekDaysState);
  return { weekDays, setWeekDays };
};

export { useWeekDays };
