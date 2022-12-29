import { atom, useRecoilState } from 'recoil';

const weekState = atom<Date[] | undefined>({
  key: 'week',
  default: undefined,
});

const useWeek = () => {
  const [week, setWeek] = useRecoilState(weekState);
  return { week, setWeek };
};

export { useWeek };
