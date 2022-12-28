/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { CenteredFlexBox } from '@/components/styled';
import { getWeather } from '@/services/met';
import { getSunset } from '@/services/met';
import { updateTrainingSessionSunset, updateTrainingSessionWeather } from '@/services/supabase';
// import { useWeek } from '@/store/weekDay';
import { useTrainingSessions } from '@/store/trainingSessions';
import { useWeekDay } from '@/store/weekDay';

import { convert12HrTimeTo24, getForecasts } from './utils';

const Weather = () => {
  const { trainingSessions } = useTrainingSessions();
  const { weekDay } = useWeekDay();
  const [symbolNumber, setSymbolNumber] = useState('01d');
  const [temperature, setTemperature] = useState(0);
  const [daylight, setDaylight] = useState('d');
  const [code, setCode] = useState('1');

  const symbolURL = `https://cdn-a.metweb.ie//images/web-meteogram-small/${symbolNumber}.png?v=5001`;

  useEffect(() => {
    let weatherNeedsUpdating = false;
    if (trainingSessions[weekDay].weather === null) {
      weatherNeedsUpdating = true;
    } else {
      const timeElapsedSinceUpdate =
        Date.now() - new Date(trainingSessions[weekDay].weather.updatedAt);
      console.log('timeElapsedSinceUpdate:', timeElapsedSinceUpdate);
      if (timeElapsedSinceUpdate / 36000 > 60) {
        // console.log('weather needs updating :', true);
        weatherNeedsUpdating = true;
      }
    }
    console.log('weatherNeedsUpdating:', weatherNeedsUpdating);

    if (weatherNeedsUpdating) {
      getWeather().then((w: any) => {
        let apiCode = 0;
        let apiTemperature = 0;
        const forecasts = getForecasts(w.weatherdata.product.time, trainingSessions[weekDay]);
        forecasts.map((f) => {
          if (f['@from'] !== f['@to']) {
            apiCode = f.location.symbol['@number'];
            setCode(apiCode);
          } else {
            apiTemperature = Math.round(f.location.temperature['@value']);
            setTemperature(apiTemperature);
          }
        });

        updateTrainingSessionWeather(trainingSessions[weekDay].id, {
          code: apiCode,
          temperature: apiTemperature,
          updatedAt: Date.now(),
        }).then((d: any) => {
          console.log('weather updated:', d);
        });
      });
    } else {
      setCode(trainingSessions[weekDay].weather.code);
      setTemperature(Math.round(trainingSessions[weekDay].weather.temperature));
    }

    if (trainingSessions[weekDay].sunset === null) {
      getSunset(trainingSessions[weekDay].date).then((s: any) => {
        const sunset24Hr = convert12HrTimeTo24(s.results.sunset);
        updateTrainingSessionSunset(trainingSessions[weekDay].id, sunset24Hr);
        checkDaylight(sunset24Hr);
      });
    } else {
      checkDaylight(trainingSessions[weekDay].sunset);
    }
  }, [weekDay, trainingSessions]);

  useEffect(() => {
    let displayCode = code.toString();

    if (displayCode.length === 1) {
      displayCode = '0' + code;
    }

    setSymbolNumber(displayCode + daylight);
  }, [daylight, code]);

  const checkDaylight = (sunset24Hr: string) => {
    const sunset = new Date(`${trainingSessions[weekDay].date}T${sunset24Hr}`);
    const trainingTime = new Date(
      `${trainingSessions[weekDay].date}T${trainingSessions[weekDay].time}`,
    );
    if (sunset < trainingTime) {
      setDaylight('n');
    } else {
      setDaylight('d');
    }
  };

  return (
    <Box>
      <CenteredFlexBox>
        <img src={symbolURL} />
        <Typography align="center" variant="body2">
          {temperature}&#8451;
        </Typography>
      </CenteredFlexBox>
      <Typography align="center" variant="body2">
        no warnings
      </Typography>
      <Typography align="center" variant="body2"></Typography>
    </Box>
  );
};

export default Weather;
