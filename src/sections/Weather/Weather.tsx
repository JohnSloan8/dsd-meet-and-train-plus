/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

import Typography from '@mui/material/Typography';

import { getWeather } from '@/services/met';
// import { useWeek } from '@/store/weekDay';
import { useTrainingSessions } from '@/store/trainingSessions';
import { useWeekDay } from '@/store/weekDay';

const Weather = () => {
  const { trainingSessions } = useTrainingSessions();
  const { weekDay } = useWeekDay();
  const [symbolNumber, setSymbolNumber] = useState('01d');
  const [temperature, setTemperature] = useState(0);

  const symbolURL = `https://cdn-a.metweb.ie//images/web-meteogram-small/${symbolNumber}.png?v=5001`;

  useEffect(() => {
    getWeather().then((w: any) => {
      console.log('w:', w.weatherdata.product.time);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      w.weatherdata.product.time.find((hourlyForecast: any) => {
        const timeDiff =
          new Date(hourlyForecast['@from']) -
          new Date(`${trainingSessions[weekDay].date}T${trainingSessions[weekDay].time}`);
        if (timeDiff >= -1800000 && timeDiff <= 1800000) {
          console.log('hourlyForecast:', hourlyForecast);
          if (hourlyForecast['@from'] !== hourlyForecast['@to']) {
            let symbol = hourlyForecast.location.symbol['@number'].toString();
            if (symbol.length === 1) {
              symbol = '0' + symbol;
            }
            symbol += 'd';
            setSymbolNumber(symbol);
          } else {
            setTemperature(hourlyForecast.location.dewpointTemperature['@value']);
          }
        }
      });
    });
  }, [weekDay, trainingSessions]);

  return (
    <>
      <img src={symbolURL} />
      <Typography align="center" variant="body2">
        {temperature}&#8451;
      </Typography>
    </>
  );
};

export default Weather;
