import { atom, useRecoilState } from 'recoil';

const weatherSymbolNumberState = atom<string | undefined>({
  key: 'weatherSymbolNumber',
  default: undefined,
});

const useWeatherSymbolNumber = () => {
  const [weatherSymbolNumber, setWeatherSymbolNumber] = useRecoilState(weatherSymbolNumberState);
  return { weatherSymbolNumber, setWeatherSymbolNumber };
};

export { useWeatherSymbolNumber };
