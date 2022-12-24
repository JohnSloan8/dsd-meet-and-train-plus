/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { CenteredFlexBox } from '@/components/styled';
import { getWeather } from '@/services/met';
import { getSunset } from '@/services/met';
import { updateTrainingSessionWeather } from '@/services/supabase';
// import { useWeek } from '@/store/weekDay';
import { useTrainingSessions } from '@/store/trainingSessions';
import { useWeekDay } from '@/store/weekDay';

const Weather = () => {
  const { trainingSessions } = useTrainingSessions();
  const { weekDay } = useWeekDay();
  const [symbolNumber /*, setSymbolNumber*/] = useState('01d');
  const [temperature /*, setTemperature */] = useState(0);

  const symbolURL = `https://cdn-a.metweb.ie//images/web-meteogram-small/${symbolNumber}.png?v=5001`;

  useEffect(() => {
    getWeather().then((w: any) => {
      console.log('w:', w.weatherdata.product.time);
      let code = 0;
      let temperature = 0;

      w.weatherdata.product.time.find((hourlyForecast: any) => {
        const timeDiff =
          new Date(hourlyForecast['@from']) -
          new Date(`${trainingSessions[weekDay].date}T${trainingSessions[weekDay].time}`);
        if (timeDiff >= -1800000 && timeDiff <= 1800000) {
          // console.log('hourlyForecast:', hourlyForecast);
          if (hourlyForecast['@from'] !== hourlyForecast['@to']) {
            code = hourlyForecast.location.symbol['@number'];
            // if (symbol.length === 1) {
            //   symbol = '0' + symbol;
            // }
            // symbol += 'd';
            // setSymbolNumber(symbol);
          } else {
            temperature = Math.round(hourlyForecast.location.temperature['@value']);
            // setTemperature(Math.round(hourlyForecast.location.temperature['@value']));
          }
        }
      });
      updateTrainingSessionWeather(trainingSessions[weekDay].id, {
        code: code,
        temperature: temperature,
      }).then((d: any) => {
        console.log('weather d:', d);
      });
    });

    getSunset(trainingSessions[weekDay].date).then((s: any) => {
      console.log('s:', s.results.sunset);
    });
  }, [weekDay, trainingSessions]);

  return (
    <Box>
      <CenteredFlexBox>
        <img src={symbolURL} />
        <Typography align="center" variant="body2">
          {temperature}&#8451;
        </Typography>
      </CenteredFlexBox>

      <Typography align="center" variant="body2"></Typography>
    </Box>
  );
};

export default Weather;
