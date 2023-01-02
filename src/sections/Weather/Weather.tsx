/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

import AirIcon from '@mui/icons-material/Air';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { CenteredFlexBox } from '@/components/styled';
import { getWeather } from '@/services/met';
import { getSunset } from '@/services/met';
import { updateTrainingSessionSunset, updateTrainingSessionWeather } from '@/services/supabase';
// import { useWeek } from '@/store/weekDay';
import { useDaylight, useTrainingSessions } from '@/store/trainingSessions';
import { useWeekDay } from '@/store/weekDay';

import { convert12HrTimeTo24, getForecasts } from './utils';

const Weather = () => {
  const { trainingSessions } = useTrainingSessions();
  const { weekDay } = useWeekDay();
  const [symbolNumber, setSymbolNumber] = useState('01d');
  const [temperature, setTemperature] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);
  const [windDirection, setWindDirection] = useState(0);
  const { daylight, setDaylight } = useDaylight();
  const [code, setCode] = useState(0);

  const symbolURL = `https://cdn-a.metweb.ie//images/web-meteogram-small/${symbolNumber}.png?v=5001`;

  useEffect(() => {
    let weatherNeedsUpdating = false;
    let sessionInPast = false;
    if (trainingSessions.length !== 0 && trainingSessions[weekDay] !== undefined) {
      sessionInPast =
        Date.now() -
          new Date(
            `${trainingSessions[weekDay].date}T${trainingSessions[weekDay].time}`,
          ).getTime() >
        0
          ? true
          : false;
      if (!sessionInPast) {
        if (trainingSessions[weekDay].weather === null) {
          console.log('weather is null');
          weatherNeedsUpdating = true;
        } else {
          const timeElapsedSinceUpdate =
            Date.now() - new Date(trainingSessions[weekDay].weather.updatedAt).getTime();
          console.log('timeElapsedSinceUpdate:', timeElapsedSinceUpdate);
          if (timeElapsedSinceUpdate / 3600000 > 60) {
            weatherNeedsUpdating = true;
            console.log('too much time elapsed');
          }
        }
      } else {
        console.log('no weather update - session in the past');
      }

      console.log('weatherNeedsUpdating:', weatherNeedsUpdating);

      if (weatherNeedsUpdating) {
        getWeather().then((w: any) => {
          let apiCode = 0;
          let apiTemperature = 0;
          let apiWindSpeed = 0;
          let apiWindDirection = 0;
          const forecasts = getForecasts(w.weatherdata.product.time, trainingSessions[weekDay]);
          console.log('forecasts:', forecasts);
          forecasts.map((f: any) => {
            if (f['@from'] !== f['@to']) {
              apiCode = f.location.symbol['@number'];
              setCode(apiCode);
            } else {
              apiTemperature = Math.round(f.location.temperature['@value']);
              setTemperature(apiTemperature);
              apiWindSpeed = Math.round(f.location.windSpeed['@mps'] * 3.6);
              setWindSpeed(apiWindSpeed);
              apiWindDirection = Math.round(f.location.windDirection['@deg']);
              setWindDirection(apiWindDirection);
            }
          });

          updateTrainingSessionWeather(trainingSessions[weekDay].id, {
            code: apiCode,
            temperature: apiTemperature,
            windSpeed: apiWindSpeed,
            windDirection: apiWindDirection,
            updatedAt: Date.now(),
          }).then((d: any) => {
            console.log('weather updated:', d);
          });
        });
      } else {
        if (!sessionInPast) {
          setCode(trainingSessions[weekDay].weather.code);
          setTemperature(Math.round(trainingSessions[weekDay].weather.temperature));
          setWindSpeed(trainingSessions[weekDay].weather.windSpeed);
          setWindDirection(trainingSessions[weekDay].weather.windDirection);
        } else {
          if (trainingSessions[weekDay].weather !== null) {
            setCode(trainingSessions[weekDay].weather.code);
            setTemperature(Math.round(trainingSessions[weekDay].weather.temperature));
            setWindSpeed(trainingSessions[weekDay].weather.windSpeed);
            setWindDirection(trainingSessions[weekDay].weather.windDirection);
          }
        }
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

      console.log('weather data:', trainingSessions[weekDay].weather);
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

  return trainingSessions[weekDay] !== undefined && trainingSessions[weekDay].weather !== null ? (
    <CenteredFlexBox sx={{ height: '100%', alignItems: 'center' }}>
      <Typography align="center" variant="body1">
        no forecast
      </Typography>
    </CenteredFlexBox>
  ) : (
    <Box>
      <CenteredFlexBox>
        <img src={symbolURL} />
        <Typography ml={0.5} align="center" variant="body1">
          {temperature}
        </Typography>
        <Typography variant="body2">&#8451;</Typography>
      </CenteredFlexBox>

      <CenteredFlexBox py={1}>
        <AirIcon />
        <Typography ml={0.5} variant="body1">{`${windSpeed}`}</Typography>
        <Typography ml={0.2} variant="body2">{` kph`}</Typography>
        <ArrowDownwardIcon sx={{ transform: `rotate(${windDirection}deg)` }} />
      </CenteredFlexBox>
      <Typography align="center" variant="body2">
        no warnings
      </Typography>
      <Typography align="center" variant="body2"></Typography>
    </Box>
  );
};

export default Weather;
